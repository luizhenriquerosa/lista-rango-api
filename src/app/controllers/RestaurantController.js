import Product from "../models/Product";
import Restaurant from "../models/Restaurant";
import fs from "fs";

class RestaurantController {
  async index(req, res) {
    const { orderBy = null, orderDirection = null } = req.query;
    const page = Number(req.query.page || 0);
    const limit = Number(req.query.limit || 0);
    const skip = (page - 1) * limit;

    const restaurants = await Restaurant.find().limit(limit).skip(skip).exec();

    const count = Number(await Restaurant.countDocuments());
    const totalPages = Math.ceil(count / limit);
    const nextPage = page === totalPages ? page : page + 1;

    return res.json(
      page
        ? {
            totalPages: totalPages,
            currentPage: page,
            nextPage: nextPage,
            totalResults: count,
            restaurants,
          }
        : {
            restaurants,
          }
    );
  }

  async show(req, res) {
    const { _id } = req.params;
    const restaurant = await Restaurant.findById(_id);

    if (!restaurant) {
      return res.status(400).json({ erro: "Restaurante não encontrado" });
    }

    return res.json(restaurant);
  }

  async store(req, res) {
    const {
      name,
      adressStreet,
      adressNumber,
      adressDistrict,
      adressCity,
      adressState,
      adressCountry,
      adressZipCode,
      adressObs,
      openingHours,
      dirPhoto,
    } = req.body;

    const restaurantAlreadyCreated = await Restaurant.find({
      name,
    });

    if (restaurantAlreadyCreated.length > 0) {
      return res.status(400).json({ erro: "Restaurante já cadastrado" });
    }

    const restaurant = new Restaurant({
      name,
      adressStreet,
      adressNumber,
      adressDistrict,
      adressCity,
      adressState,
      adressCountry,
      adressZipCode,
      adressObs,
      openingHours,
      dirPhoto,
    });

    await restaurant.save();

    return res.json(restaurant.toJSON());
  }

  async update(req, res) {
    const { _id } = req.params;
    const {
      name,
      adressStreet,
      adressNumber,
      adressDistrict,
      adressCity,
      adressState,
      adressCountry,
      adressZipCode,
      adressObs,
      openingHours,
      dirPhoto,
    } = req.body;

    const restaurant = await Restaurant.findById(_id);

    if (!restaurant) {
      return res.status(400).json({ erro: "Restaurante não encontrado" });
    }

    if (name && name !== restaurant.name) {
      const restaurantAlreadyCreated = await Restaurant.find({
        name,
      });

      if (restaurantAlreadyCreated.length > 0) {
        return res.status(400).json({ erro: "Restaurante já cadastrado" });
      }
    }

    if (dirPhoto) {
      if (fs.existsSync(restaurant.dirPhoto)) {
        fs.unlinkSync(restaurant.dirPhoto);
      }
    }

    await restaurant.update({
      name,
      adressStreet,
      adressNumber,
      adressDistrict,
      adressCity,
      adressState,
      adressCountry,
      adressZipCode,
      adressObs,
      openingHours,
      dirPhoto,
    });

    return res.status(204).send();
  }

  async delete(req, res) {
    const { _id } = req.params;

    const restaurant = await Restaurant.findById(_id);

    if (!restaurant) {
      return res.status(400).json({ erro: "Restaurante não encontrado" });
    }

    if (fs.existsSync(restaurant.dirPhoto)) {
      fs.unlinkSync(restaurant.dirPhoto);
    }
    await Restaurant.remove({ _id });

    const products = await Product.find({ _idRestaurant: _id });
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      if (fs.existsSync(product.dirPhoto)) {
        fs.unlinkSync(product.dirPhoto);
      }
      await Product.remove({ _id: product._id });
    }

    return res.status(204).send();
  }
}

export default new RestaurantController();
