import {logger} from '../../logger';
const {readJson} = require ('../../services/json')
const turf = require('@turf/turf');
const path = require('path');

export const getAllLocations = () => {
  const vehiclesData = getVehiclesDataFromJson();
  const vehiclesLocations = vehiclesData.map(vehicle => ({ 
    location: vehicle.location
  }));
  logger.info(`vehicle locations: ${JSON.stringify(vehiclesLocations)}`);
  return vehiclesLocations;
};

export const getVehiclesInPolygon = async ({ coordinates}) => {
    const vehiclesData = getVehiclesDataFromJson();
    const filteredByArea = filterVehiclesByArea(
        { vehiclesData, coordinates},
    );
    logger.info (`${filteredByArea.length } vehicles were found inside the polygon`)
        return filteredByArea;
  };
 
 const getVehiclesDataFromJson = () => {
    logger.info('getting vehicles from file');
    const filePath = path.join(__dirname, '../../data/vehicles-location.json');
    return readJson(filePath);
  };

  const filterVehiclesByArea = ({ vehiclesData, coordinates}) => (vehiclesData ? vehiclesData.filter(
    (vehicle) => {
      if (!vehicle.location) {
        logger.error(`vehicle ${vehicle.id} does not have a defined location. it will be excluded.`);
        return false;
      }
      const turfCoordinates = Object.values(coordinates).map((point: any) => [point.lng, point.lat]);
      turfCoordinates.push(turfCoordinates[0]); // Repeat the first coordinate to close the polygon
      const polygon = turf.polygon([turfCoordinates]);
      let vehicleLocation = vehicle.location;
      delete vehicleLocation.bearing;
      const vehiclePoint = turf.point([vehicleLocation.lat, vehicleLocation.lng]);
      const isInsidePolygon = turf.booleanPointInPolygon(vehiclePoint, polygon);
      return isInsidePolygon;
    },
  ) : []);



