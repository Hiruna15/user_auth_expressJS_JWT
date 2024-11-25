import UserModel from "../model/user.js";
import { issueJWTs, checkPassword } from "../lib/utils.js";
import { BadRequestError } from "../errors/index.js";

const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const newUser = await UserModel.create({
      username,
      email,
      hash: password,
    });

    const { access_token, refresh_token } = issueJWTs(
      newUser._id,
      newUser.username
    );

    res.cookie("accessToken", access_token, {
      httpOnly: true,
      maxAge: 900000,
      sameSite: "Strict",
      secure: true,
    });

    res.cookie("refreshToken", refresh_token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "Strict",
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

  const { access_token, refresh_token } = issueJWTs(user._id, user.username);

  res.cookie("accessToken", access_token, {
    httpOnly: true,
    maxAge: 900000,
    sameSite: "Strict",
    secure: true,
  });

  res.cookie("refreshToken", refresh_token, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: "Strict",
    secure: true,
  });

  res.status(200).json({ user });
};

const logout = (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    sameSite: "Strict",
    secure: true,
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "Strict",
    secure: true,
  });
};

export { register, login, logout };
