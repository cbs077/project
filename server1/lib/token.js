const jwt = require('jsonwebtoken');

// JWT 토큰 생성
exports.createToken = payload => {
  const jwtOption = { expiresIn: '7d' };

  console.log( " create ");
  return new Promise((resolve, reject) => {
    jwt.sign(payload, "aadsfasdfs", jwtOption, (error, token) => {
      if (error) reject(error);
      resolve(token);
    });
  });
};

// JWT 토큰 검증
exports.verifyToken = token => {
  console.log("verify:", token);
  return new Promise((resolve, reject) => {
    jwt.verify(token, "aadsfasdfs", (error, decoded) => {
      if (error) reject(error);
      resolve(decoded);
    });
  });
};