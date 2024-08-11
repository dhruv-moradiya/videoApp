const express = require("express");
const { upload } = require("../middlewares/multer.middleware");
const {
  registerUser,
  loginUser,
  logoutUser,
  changeCurrentPassword,
  refreshToken,
  getCurrentUser,
  getUserProfile,
} = require("../controllers/user.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

const router = express.Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/login").post(loginUser);

router.route("/logout").post(verifyToken, logoutUser);

router.route("/refresh-token").post(refreshToken);

router.route("/change-password").post(verifyToken, changeCurrentPassword);

router.route("/current-user").get(verifyToken, getCurrentUser);

router.route("/user-profile/:userID").get(verifyToken, getUserProfile);

module.exports = router;
