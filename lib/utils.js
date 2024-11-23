import crypto from "node:crypto";

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

export { hashPassword, checkPassword };
