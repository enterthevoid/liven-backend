const jwt = require("jsonwebtoken");

module.exports = (request, res, next) => {
  try {
    const token = request.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    request.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Auth failed",
    });
  }
};
