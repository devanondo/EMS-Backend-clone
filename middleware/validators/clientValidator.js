import { body } from 'express-validator';

export const clientRegisterValidator = () => {
  return [
    body('name')
      .isLength({ min: 4, max: 16 })
      .withMessage('Name must be between 4 to 16 characters '),
    body('email').isEmail().notEmpty(),
    body('designation').isString().notEmpty(),
    body('companyName').isString().notEmpty(),
    body('phone').isString().notEmpty(),
  ];
};
