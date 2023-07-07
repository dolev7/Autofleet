import {logger} from '../../logger';
const {readJson} = require ('../../services/json')
const path = require('path');

const modelName = 'vehicles';

export const getAllLocations = () => {
  logger.info(`getting ${modelName} from file`);
  const filePath = path.join(__dirname, '../../data/vehicles-location.json');
  const vehiclesData = readJson(filePath);
  logger.info(`vehicle data: ${vehiclesData}`);
  const vehiclesLocations = vehiclesData.map(vehicle => ({ 
    location: vehicle.location,
    distance: vehicle.distance
  }));
  logger.info(`vehicle locations: ${vehiclesLocations}`);
  return vehiclesLocations;
};

// export const findByName = async (itemName) => {
//   const itemModel = await getModel(modelName);
//   logger.info(`try find item ${itemName}`);
//   const relevantItem = Object.values(itemModel)
//     .find((item : any) => item.itemName === itemName);

//   if (!relevantItem) {
//     logger.warn(`item ${itemName} was not found`);
//     return null;
//   }
//   logger.info(`item ${itemName} was  found `);

//   return relevantItem;
// };

// export const findById = async (id) => {
//   logger.info(`getting ${id} from model ${modelName} from db`);
//   const relevantItem = await getFromModelById(modelName,id);

//   if (!relevantItem) {
//     logger.warn('item was not found');
//     return null;
//   }
//   return relevantItem;
// };


