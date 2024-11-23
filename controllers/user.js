import UserModel from "../model/user.js";
import { issueJWT, checkPassword } from "../lib/utils.js";

const register = async (req, res) => {
  const { username, email, password } = req.body;

  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

  if (!password || password.length < 8 || !passwordRegex.test(password)) {
    return res
      .status(500)
      .json({ success: false, msg: "password doesn't meet the requirements" });
  }

  const newUser = await UserModel.create({
    username,
    email,
    hash: password,
  });

  const { token, expiresIn } = issueJWT(newUser._id, newUser.username);

  res.status(200).json({ user: newUser, token, expiresIn });
};

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(500).json({ success: false, msg: "Invalid Credentials" });
  }

  const user = await UserModel.findOne({ username });

  if (!user) {
    return res.status(500).json({ success: false, msg: "Invalid Credentials" });
  }

  if (!checkPassword(password, user.salt, user.hash)) {
    return res.status(500).json({ success: false, msg: "Invalid Credentials" });
  }

  const { token } = issueJWT(user._id, user.username);

  res.status(200).json({ user, token });
};

export { register, login };
