import Joi from 'joi';

export default Joi.object({
  expense: Joi.string().required(),
  expenseAmount: Joi.number().required(),
  expenseCategory: Joi.string().required(),
  expenseDate: Joi.string().required(),
});
