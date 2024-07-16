const jwt = require('jsonwebtoken');

const generateAccessToken = async (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"})
}

// refreshTokens
let refreshTokens = []
const generateRefreshToken = async (user) => {
  const refreshToken = await jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "20m"});
  refreshTokens.push(refreshToken);
  return refreshToken
}

const removeToken = async (token) => {
  refreshTokens = refreshTokens.filter( (c) => c != token);
  return refreshTokens;
}

const validateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];

  if (token == null) {
    res.status(400).json({ message: "Token not present" })
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      res.status(403).json({ message: "Token invalid" });
    } else {
      req.user = user;
      next();
    }
  })
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  removeToken,
  refreshTokens,
  validateToken
}
