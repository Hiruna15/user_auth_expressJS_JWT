import UserModel from "../model/user.js";
import { issueJWT, checkPassword } from "../lib/utils.js";
import { BadRequestError } from "../errors/index.js";

const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const newUser = await UserModel.create({
      username,
      email,
      hash: password,
    });

    const { token } = issueJWT(newUser._id, newUser.username);

    res.cookie("accessToken", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      secure: true,
    });

    res.status(200).json({ user: newUser });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new BadRequestError("username and password must be provided");
  }

  const user = await UserModel.findOne({ username });

  if (!user) {
    throw new BadRequestError("user not found");
  }

  if (!checkPassword(password, user.salt, user.hash)) {
    throw new BadRequestError("Invalid password");
  }

  const { token } = issueJWT(user._id, user.username);

  res.cookie("accessToken", token, {
    httpOnly: true,
    maxAge: 15 * 60 * 1000,
    secure: true,
  });

  res.status(200).json({ user });
};

export { register, login };
