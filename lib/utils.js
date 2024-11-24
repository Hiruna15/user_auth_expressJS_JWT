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

const issueJWT = (userId, username) => {
  const payload = {
    id: userId,
    username,
  };

  const PRIV_KEY = fs.readFileSync("private_key.pem");

  let token = jwt.sign(payload, PRIV_KEY, {
    algorithm: "RS256",
    expiresIn: "7d",
  });

  token = `Bearer ${token}`;

  return { token };
};

export { hashPassword, checkPassword, issueJWT };
