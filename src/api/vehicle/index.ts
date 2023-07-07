import Router from 'express';
import {
  getAllLocations,
} from '../../models/vehicle';

import {logger} from '../../logger';
const {getVehiclesInArea} = require ('../../models/vehicle')

const router = Router();

router.get('/', (req, res) => {
  logger.info('getting all vehicles');
  const vehicles = getAllLocations();
  if (vehicles.length === 0) {
    logger.warn('no vehicles found');
    return res.status(204).json({ msg: 'Vehicles were not found.' });
  }
  return res.json(vehicles);
});

router.get('/in-area', async (req, res) => {
    try {
      const {
        coordinates = [], 
      } = req.query;
      if (!coordinates) {
        return res.status(400).json({ msg: 'must provide coordinates' });
      }
      logger.info (coordinates);
      const coordinatesJsonArray = JSON.parse(coordinates)
      if (coordinatesJsonArray.length < 3) {
        logger.info (coordinatesJsonArray.length);
        return res.status(404).json({ msg: 'number of vertices must be greater or equal to 3' });
      }
      logger.info('trying to get vehicles in area of ', { coordinatesJsonArray });
      const vehiclesInArea = await getVehiclesInArea(
        { coordinates: coordinatesJsonArray },
      );
      const noVehiclesInArea = !vehiclesInArea || (vehiclesInArea && vehiclesInArea.length === 0);
      if (noVehiclesInArea) {
        return res.status(200).json([]);
      }
  
      return res.json(vehiclesInArea);
    } catch (e) {
      logger.error('got an error by vehicles in area', e);
      return res.status(500).json({ error: e.message });
    }
  });

export default router;
