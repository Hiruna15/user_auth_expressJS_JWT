import crypto from "node:crypto";
import fs from "fs";

const generateKeyPair = () => {
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: "spki",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem",
    },
  });

  fs.writeFileSync("private_key.pem", privateKey);
  fs.writeFileSync("public_key.pem", publicKey);
};

generateKeyPair();
