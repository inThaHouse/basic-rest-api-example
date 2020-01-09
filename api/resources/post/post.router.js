import { Router } from 'express'
import crudUtils from './post.controller'

const router = Router()

router
  .route('/')
  .get(crudUtils.readMany) // see own posts
  .post(crudUtils.createOne) // create a post

router
  .route('/:id')
  .get(crudUtils.readOne) // check post by param id
  .put(crudUtils.updateOne) // update post by param id
  .delete(crudUtils.deleteOne)

export default router
