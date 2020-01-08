import { Router } from 'express'
import { getOwnProfile, updateOwnProfile } from './profile.controller'

const router = Router()

router.get('/', getOwnProfile)
router.put('/', updateOwnProfile)

export default router
