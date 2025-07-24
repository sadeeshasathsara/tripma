import express, { Router } from 'express'
import HandleLocation from '../controllers/location.controller.js'
import GetTrips from '../controllers/trips.controller.js'
import GetTags from '../controllers/tags.controller.js'
import GetPlaces from '../controllers/places.controller.js'
import GetFilteredTrips from '../controllers/filter.controller.js'
import { verifyToken } from '../middlewares/jwt.middleware.js'
import { getFullUserData, initialUserData } from '../controllers/user.controller.js'

const router = express.Router()

router.post('/location', HandleLocation)
router.get('/trips', GetTrips)
router.post('/filter', GetFilteredTrips)
router.get('/tags', GetTags)
router.get('/places', GetPlaces)
router.post('/user/initial', verifyToken, initialUserData)
router.get('/user/details', verifyToken, getFullUserData);



export default router