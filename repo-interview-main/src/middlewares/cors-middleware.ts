import { Request, Response, NextFunction } from 'express';

export function corsMiddleware(req: Request, res: Response, next?: NextFunction): any {
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (next) {
        next(); 
    }
  }