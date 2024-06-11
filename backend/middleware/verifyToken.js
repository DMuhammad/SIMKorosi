const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    next();
  } catch (error) {
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = verifyToken;
