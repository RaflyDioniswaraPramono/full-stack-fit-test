const response = ({ res, statusCode, statusText, success, message, data: data = null, endPoint }) => {
  return res.status(statusCode).json({
    success,
    statusCode,
    statusText,
    message,
    payload: {
      data: data,
    },
    endPoint,
  });
};

module.exports = {
  response,
};
