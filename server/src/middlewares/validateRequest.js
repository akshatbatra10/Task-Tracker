import { validationResult } from "express-validator";

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = errors.array().map((e) => ({
      field: e.param,
      message: e.msg,
    }));

    return res.status(422).json({ errors: err });
  }

  next();
};

export default validateRequest;
