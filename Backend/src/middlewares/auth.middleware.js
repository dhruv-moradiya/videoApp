const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model");

const verifyToken = async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "You need to login" });
  }

  const decodedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  const user = await User.findById(decodedToken._id).select(
    "-password -refreshToken"
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid Access Token" });
  }

  req.user = user;
  next();
};

module.exports = {
  verifyToken,
};
