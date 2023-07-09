import Router from 'express';
import {
  getAllLocations,
} from '../../models/vehicle';

import {logger} from '../../logger';
const {getVehiclesInPolygon} = require ('../../models/vehicle')

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

router.get('/in-polygon', async (req, res) => {
    try {
      const {
        coordinates = [], 
      } = req.query;
      if (!coordinates) {
        return res.status(400).json({ msg: 'must provide coordinates' });
      }
      //@ts-ignore
      const coordinatesJsonArray = JSON.parse(coordinates)
      if (coordinatesJsonArray.length < 3) {
        return res.status(400).json({ msg: 'number of vertices must be greater or equal to 3' });
      }
      logger.info('trying to get vehicles inside the polygon of ', { coordinatesJsonArray });
      const vehiclesInPolygon = await getVehiclesInPolygon(
        { coordinates: coordinatesJsonArray },
      );
      const noVehiclesInPolygon = !vehiclesInPolygon || (vehiclesInPolygon && vehiclesInPolygon.length === 0);
      if (noVehiclesInPolygon) {
        return res.status(200).json([]);
      }
  
      return res.json(vehiclesInPolygon);
    } catch (e) {
      logger.error('got an error by vehicles in area', e);
      return res.status(500).json({ error: e.message });
    }
  });

export default router;
