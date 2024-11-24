import { CustomApiError } from "../errors/index.js";

const errorHandlereMiddleware = (err, req, res, next) => {
  if (err instanceof CustomApiError) {
    return res.status(err.status_code).json({ msg: err.message });
  }

  res.status(500).json({ msg: "Something went wrong try aging later" });
};

export default errorHandlereMiddleware;
