const errorHandlereMiddleware = (err, req, res, next) => {
  const customError = {
    status_code: err.status_code || 500,
    msg: err.message || "There is an error with the server. please try again",
  };

  console.log(err.message);

  res.status(customError.status_code).json({ msg: customError.msg });
};

export default errorHandlereMiddleware;
