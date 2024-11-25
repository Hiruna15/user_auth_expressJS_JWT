import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import fs from "fs";

const hashPassword = (password) => {
  const salt = crypto.randomBytes(32).toString("hex");
  const genHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "RSA-SHA1")
    .toString("hex");

  return {
    salt,
    hash: genHash,
  };
};

const checkPassword = (password, salt, hash) => {
  const validateHashed = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "RSA-SHA1")
    .toString("hex");

  return validateHashed === hash;
};

const issueJWTs = (userId, username) => {
  const payload = {
    id: userId,
    username,
  };

  const REFRESH_TOKEN_PRIV_KEY = fs.readFileSync("refreshToken_privateKey.pem");
  const ACCESS_TOKEN_PRIV_KEY = fs.readFileSync("accessToken_privateKey.pem");

  const access_token = jwt.sign(payload, ACCESS_TOKEN_PRIV_KEY, {
    algorithm: "RS256",
    expiresIn: "15m",
  });

  const refresh_token = jwt.sign(payload, REFRESH_TOKEN_PRIV_KEY, {
    algorithm: "RS256",
    expiresIn: "7d",
  });

  const token = `Bearer ${access_token}`;

  return { access_token: token, refresh_token };
};

export { hashPassword, checkPassword, issueJWTs };
