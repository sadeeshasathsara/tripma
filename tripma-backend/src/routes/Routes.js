import express from 'express'
import HandleLocation from '../controllers/handleLocation.js'

const router = express.Router()

router.post('/location', HandleLocation)
router.get('/trips', getT)

export default router