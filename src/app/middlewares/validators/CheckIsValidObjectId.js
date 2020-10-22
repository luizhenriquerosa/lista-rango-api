import mongoose from "mongoose";

export default (req, res, next) => {
  try {
    if (req.params._id && !mongoose.isValidObjectId(req.params._id)) {
      throw new Error("Identificador inválido");
    }

    if (
      req.body._idRestaurant &&
      !mongoose.isValidObjectId(req.body._idRestaurant)
    ) {
      throw new Error("Identificador inválido");
    }

    return next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
