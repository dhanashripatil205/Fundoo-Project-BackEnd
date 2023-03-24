import { createClient } from 'redis';
import logger from './logger';

const clientRequest = createClient();

export const redisConn = async ()=>{
    try{
        await clientRequest.connect();
        logger.info('Connected to redis.');
    } catch(e){
        logger.info('Failed to connected redis.');
    }  
}
export default clientRequest;