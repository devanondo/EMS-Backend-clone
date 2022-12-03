import { body } from 'express-validator';

export const leaveValidateRules = () => {
  return [
    body('leaveType').isString().notEmpty(),
    body('from').isString().notEmpty(),
    body('to').isString().notEmpty(),
    body('numberOfDays').isString().notEmpty(),
    body('remainingLeaves').isString().notEmpty(),
    body('totalLeaves').isString().notEmpty(),
    body('leaveReason').isString().notEmpty(),
    body('leaveStatus').isString().notEmpty(),
  ];
};
