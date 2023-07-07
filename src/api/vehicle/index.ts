import Router from 'express';
import {
  getAllLocations,
} from '../../models/vehicle';

import {logger} from '../../logger';

const router = Router();

router.get('/', (req, res) => {
  logger.info('getting all vehicles');
  const vehicles = getAllLocations();
  if (vehicles.length === 0) {
    logger.warn('no vehicles found');
    return res.status(204).json({ msg: 'Vehicles were not found.' });
  }
//   const sortedItems = items.sort((a, b) => a.itemName.localeCompare(b.itemName));
  return res.json(vehicles);
});

export default router;
