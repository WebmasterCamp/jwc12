import { json } from 'body-parser'
import express from 'express'
import * as admin from 'firebase-admin'

import { authenticateMiddleware } from './middlewares'

admin.initializeApp()
const db = admin.firestore()

const app = express()

app.use(authenticateMiddleware)
app.use(json())

app.post('/updateInterviewCandidates', async (req, res) => {
  try {
    const data = req.body
    const candidatesDoc = db.doc('stats/interviewCandidates')
    await candidatesDoc.update(data)
    res.status(200).send('OK')
  } catch (e) {
    console.log(e)
    res.status(500).send('Internal Server Error')
  }
})

export { app }
