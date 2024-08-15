import Joi from 'joi';

const userSchema = Joi.object({
  email: Joi.string().min(1).max(99).required(),
});


const validationResult = userSchema.validate({ email:"jelleleus@hotmail.com" });

if (validationResult.error) {
  console.error(validationResult.error.message);
} else {
  console.log(validationResult.value);
}

export default {userSchema};