import { Router } from 'express'
import crudUtils from './post.controller'

const router = Router()

router
  .route('/')
  .get(crudUtils.readMany)
  .post(crudUtils.createOne)

router
  .route('/:id')
  .get(crudUtils.readOne)
  .put(crudUtils.updateOne)
  .delete(crudUtils.deleteOne)

export default router
