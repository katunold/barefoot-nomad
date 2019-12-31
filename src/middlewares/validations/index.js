export const errorDisplay = (req, res, errors) => {
  const errorArr = [];

  errors.array().forEach((error) => {
    const errData = {
      status: 422,
      message: error.msg,
      field: error.param,
    };
    errorArr.push(errData);
  });
  return res.status(422).send({ error: errorArr });
};
