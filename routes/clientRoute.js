import { Router } from 'express';
import {
  createClient,
  deleteClient,
  getClient,
  updateClient,
} from '../controllers/clientController.js';
import { isAuthenticatedUser } from '../middleware/auth.js';
import { restrictTo } from '../middleware/restrictTo.js';
import { clientRegisterValidator } from '../middleware/validators/clientValidator.js';
import { validate } from '../middleware/validators/validateResult.js';

const router = Router();

// Create client account
router.post(
  '/',
  clientRegisterValidator(),
  validate,
  isAuthenticatedUser,
  restrictTo('admin'),
  createClient
);

// Get Client Account details
router.get('/', isAuthenticatedUser, restrictTo('admin'), getClient);

// Update Client Account
router.put('/', isAuthenticatedUser, restrictTo('admin'), updateClient);

// Delete Client Account
router.delete('/', isAuthenticatedUser, restrictTo('admin'), deleteClient);

export const clientRoute = router;
