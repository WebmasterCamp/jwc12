import { NextFunction, Request, Response } from 'express'
import * as functions from 'firebase-functions'

const apiKey = functions.config().auth.api_key

export function authenticateMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.headers.authorization === apiKey) {
    next()
  } else {
    res.status(401).send('Unauthorized')
  }
}
