import { json } from 'body-parser'
import express from 'express'

import { updateInternalCamperList, updatePublicCamperList } from './functions/updateCamperList'
import { updateInterviewCandidates } from './functions/updateInterviewCandidates'
import { authenticateMiddleware } from './middlewares'

const app = express()

app.use(authenticateMiddleware)
app.use(json())

app.post('/updateInterviewCandidates', async (req, res) => {
  try {
    const data = req.body
    await updateInterviewCandidates(data.data)
    res.status(200).send('OK')
  } catch (e) {
    console.log(e)
    res.status(500).send('Internal Server Error')
  }
})

app.post('/updateCamperList', async (req, res) => {
  try {
    const data = req.body
    await updatePublicCamperList(data.data)
    await updateInternalCamperList(data.data)
    res.status(200).send('OK')
  } catch (e) {
    console.log(e)
    res.status(500).send('Internal Server Error')
  }
})

export { app }
