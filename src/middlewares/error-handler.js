import { StatusCodes } from "http-status-codes";

const errorHandler = (err, _req, res, _next) => {
  console.error(err);

  const customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg:
      err.message || "Une erreur s'est produite, veuillez réessayez plus tard",
  };

  res.status(customError.statusCode).json({ msg: customError.msg });
};

export default errorHandler;
