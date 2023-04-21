const { text } = require("express");
const jwt = require("jsonwebtoken");

const authorization = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token)
      return res
        .status(400)
        .send({ status: false, msg: "token must be present" });

    jwt.verify(token, "secret123", (err, decodedToken) => {
      if (err) {
        let message =
          err.message === "jwt expired"
            ? "token is expired"
            : "token is invalid";
        return res.status(401).send({ status: false, message: message });
      }
      console.log(decodedToken)
      req.headers.decodedToken = decodedToken;
      
      next();
    });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

module.exports = { authorization };
