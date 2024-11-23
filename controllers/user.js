import UserModel from "../model/user.js";

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
};

export { register };
