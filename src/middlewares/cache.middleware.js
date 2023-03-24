import HttpStatus from 'http-status-codes';
import clientRequest from "../config/cache"

export const getNotesFromRedis = async (req, res ,next)=> {
    const data = await clientRequest.get(req.body.userId);
    if(data){
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,        //201
            data:JSON.parse(data),
            message: 'Notes Fetched successfully from redis'
        });
    } else next(); 
}