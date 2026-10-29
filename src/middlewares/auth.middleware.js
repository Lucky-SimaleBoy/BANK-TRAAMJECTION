const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

async function authMiddleware(req, res, next) {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(402).json({
      message: "Unauthorized acces, token is missing",
    });
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decode.userId);

    req.user = user;
    return next();
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized access ,token is invalid",
    });
  }
}

module.exports={
    authMiddleware
}