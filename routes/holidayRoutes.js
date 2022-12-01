import { Router } from 'express';
import { getHolidays, createHoliday, updateHoliday, deleteHoliday } from '../controllers/HolidayController.js';


const router = Router();

// routes
router.get('/', getHolidays);
router.post('/', createHoliday);
router.put('/:id', updateHoliday);
router.delete('/:id', deleteHoliday);

export const HolidayRoutes = router;