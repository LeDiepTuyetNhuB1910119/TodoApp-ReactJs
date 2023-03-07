const jwt = require("jsonwebtoken");

// Authorization: Bearer asddnslkfdsl

const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1]; // lay phan sau chu Bearer

  if (!token) {
    return res.status(401).json({
      message: "Không tìm thấy token",
      success: false,
    });
  }
  try {
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // jwt.verify return Object {_id: user._id} -> gan cho bien decode

    req.userId = decode.userId;
    next();
  } catch (error) {
    console.log(error);
    res.status(403).json({
      message: "Token không hợp lệ",
      success: false,
    });
  }
};

module.exports = verifyToken;
