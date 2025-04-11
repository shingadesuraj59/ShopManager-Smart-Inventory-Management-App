import Joi from "joi"; // Correctly capitalized 'Joi'

// Server-side validation for signup
const signupValidation = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).required(),
    phoneNumber:Joi.string().min(10).max(10).required()
  });

  const { error } = schema.validate(req.body); // Destructuring 'error' from validation result

  if (error) {
    return res.status(400).json({
      message: "Bad request",
      error :error.details[0]// Sending specific validation error details
    });
  }
  next(); // Proceed to the next middleware if no errors
};

// Server-side validation for login
const loginValidation = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).required(),
  });

  const { error } = schema.validate(req.body); // Destructuring 'error' from validation result
  console.log(error);
  
  if (error) {
    return res.status(400).json({
      message: "Bad request",
      error:error.details[0] // Sending specific validation error details
    });
  }
  next(); // Proceed to the next middleware if no errors
};

export default { signupValidation, loginValidation };