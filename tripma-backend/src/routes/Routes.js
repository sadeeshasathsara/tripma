import express from 'express'
import HandleLocation from '../controllers/handleLocation.js'
import GetTrips from '../controllers/getTrips.js'

const router = express.Router()

router.post('/location', HandleLocation)
router.get('/trips', GetTrips)

export default router