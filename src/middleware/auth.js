const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    // get the cookie from the req.body
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Invalid token");
    }
    //validate the token
    const decodedObj = await jwt.verify(token, "Devtinde@123"); // isValidToken

    const { _id } = decodedObj;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found in DB");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
};



module.exports = { userAuth, };
