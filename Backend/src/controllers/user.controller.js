const mongoose = require("mongoose");
const { Types } = require("mongoose");
const { User } = require("../models/user.model");
const { uploadFile } = require("../utils/cloudinary");
const jwt = require("jsonwebtoken");

// * GENERATE ACCESS TOKEN AND REFRESH TOKEN
const generateAccessTokenAndRefreshToken = async (_id) => {
  const user = await User.findById(_id);
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

// * REGISTER USER
const registerUser = async (req, res) => {
  const { firstName, username, email, password } = req.body;

  if (!firstName || !username || !email || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  if (!req.files || !req.files.avatar || req.files.avatar.length === 0) {
    return res.status(400).json({ message: "Avatar is required" });
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;

  if (!avatarLocalPath) {
    return res.status(400).json({ message: "Avatar is required" });
  }

  let coverImageLocalPath;
  if (req.files.coverImage && req.files.coverImage.length > 0) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  const avatar = await uploadFile(avatarLocalPath, "image");
  let coverImage = await uploadFile(coverImageLocalPath, "image");

  const user = User.create({
    firstName,
    username,
    email,
    password,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
  });

  if (!user) {
    return res
      .status(400)
      .json({ message: "Something went wrong while registering user" });
  }

  return res.status(201).json({ message: "User created successfully" });
};

// * LOGIN USER
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isMatch = await user.isPasswordMatch(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const { accessToken, refreshToken } =
      await generateAccessTokenAndRefreshToken(user._id);

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({ message: "User logged in successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// * LOGOUT USER
const logoutUser = async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { refreshToken: "" });

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({ message: "User logged out successfully" });
};

// * REFRESH TOKEN
const refreshToken = async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  console.log("incomingRefreshToken", incomingRefreshToken);

  if (!incomingRefreshToken) {
    return res.status(400).json({ message: "Refresh token is required" });
  }

  try {
    const decodedToken = await jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken._id);

    console.log("user=======", user);

    if (!user) {
      return res.status(400).json({ message: "Invalid refresh token" });
    }

    const { accessToken, refreshToken } =
      await generateAccessTokenAndRefreshToken(user._id);

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({ message: "Token refreshed successfully" });
  } catch (error) {
    return res.status(400).json({ message: "Invalid refresh token" });
  }
};

// * CHANGE CURRENT PASSWORD
const changeCurrentPassword = async (req, res) => {
  console.log("req.body", req.body);
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  const user = await User.findById(req.user._id);
  const isPasswordCorrect = await user.isPasswordMatch(currentPassword);

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Current password is incorrect" });
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res.status(200).json({ message: "Password changed successfully" });
};

// * GET CURRENT USER
const getCurrentUser = async (req, res) => {
  try {
    return res.status(200).json({ user: req.user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// * GET USER PROFILE
const getUserProfile = async (req, res) => {
  try {
    const { userID } = req.params;

    console.log("req.params", req.params);

    if (!userID) {
      return res.status(400).json({ message: "User ID is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(userID)) {
      return res.status(400).json({ message: "Invalid User ID" });
    }

    const user = await User.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(userID),
        },
      },
      {
        $lookup: {
          localField: "_id",
          from: "subscriptions",
          foreignField: "channel",
          as: "subscribers",
        },
      },
      {
        $lookup: {
          localField: "_id",
          from: "subscriptions",
          foreignField: "subscriber",
          as: "subscribedTo",
        },
      },
      {
        $addFields: {
          subscriberCount: { $size: "$subscribers" },
          subscribedToCount: { $size: "$subscribedTo" },
        },
      },
      {
        $project: {
          password: 0,
          refreshToken: 0,
        },
      },
    ]);

    if (!user || user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  refreshToken,
  changeCurrentPassword,
  getCurrentUser,
  getUserProfile,
};
