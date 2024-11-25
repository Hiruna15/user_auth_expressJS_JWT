import crypto from "node:crypto";
import fs from "fs";

const generateKeyPair = (private_file, public_file) => {
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

  fs.writeFileSync(private_file, privateKey);
  fs.writeFileSync(public_file, publicKey);
};

const accessTokenPriv = "accessToken_privateKey.pem";
const accessTokenPub = "accessToken_publicKey.pem";
const refreshTokenPub = "refreshToken_publicKey.pem";
const refreshTokenPriv = "refreshToken_privateKey.pem";

generateKeyPair(accessTokenPriv, accessTokenPub);
generateKeyPair(refreshTokenPriv, refreshTokenPub);
