import fs from 'fs';
import {logger} from '../../logger'

export const readJson = (jsonPath) => {
    try {
        const fileData = fs.readFileSync(jsonPath, 'utf8');
        const jsonData = JSON.parse(fileData);
        const jsonData2 = JSON.parse(fileData);
        return jsonData;
      } catch (error) {
        logger.error('Error reading or parsing the JSON file:', error);
        return; 
      }
}