import UserModel from "../model/user.js";
import { issueJWT } from "../lib/utils.js";

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

  res.status(200).json({ username: newUser.username, token, expiresIn });
};

export { register };
