import { goodStatus, badStatus } from './constants'

const readOne = model => async (req, res) => {
  try {
    const document = await model
      .findOne({ createdBy: req.profile._id, _id: req.params.id })
      .lean()
      .exec()

    if (!document) return res.status(badStatus).end()

    res.status(goodStatus).json({ data: document })
  } catch (err) {
    console.error(err)
    res.status(badStatus).end()
  }
}

const readMany = model => async (req, res) => {
  try {
    const documents = await model
      .find({ createdBy: req.profile._id })
      .lean()
      .exec()

    res.status(goodStatus).json({ data: documents })
  } catch (err) {
    console.error(err)
    res.status(badStatus).end()
  }
}

const createOne = model => async (req, res) => {
  const createdBy = req.profile._id

  try {
    const documentToCreate = await model.create({ ...req.body, createdBy })

    res.status(201).json({ data: documentToCreate })
  } catch (err) {
    console.error(err)
    res.status(badStatus).end()
  }
}

const updateOne = model => async (req, res) => {
  try {
    const updatedDocument = await model.findOneAndUpdate(
      {
        createdBy: req.profile._id,
        _id: req.params.id,
      },
      req.body,
      { new: true }
    )

    if (!updatedDocument) return res.status(badStatus).end()

    res.status(goodStatus).json({ data: updatedDocument })
  } catch (err) {
    console.error(err)
    res.status(badStatus).end()
  }
}

const deleteOne = model => async (req, res) => {
  try {
    const removedDocument = await model.findOneAndRemove({
      createdBy: req.profile._id,
      _id: req.params.id,
    })

    if (!removedDocument) return res.status(badStatus).end()

    res.status(goodStatus).json({ data: removedDocument })
  } catch (err) {
    console.error(err)
    res.status(badStatus).end()
  }
}

const crudUtils = model => {
  return {
    deleteOne: deleteOne(model),
    updateOne: updateOne(model),
    readOne: readOne(model),
    readMany: readMany(model),
    createOne: createOne(model),
  }
}

export default crudUtils
