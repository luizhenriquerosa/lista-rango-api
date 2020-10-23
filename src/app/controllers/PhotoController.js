import Restaurant from "../models/Restaurant";
import Product from "../models/Product";
import fs from "fs";

class PhotoController {
  async getPhotoRestaurant(req, res) {
    const { _id } = req.params;
    const restaurant = await Restaurant.findById(_id);

    if (!restaurant) {
      return res.status(400).json({ erro: "Restaurante não encontrado" });
    }

    if (!restaurant.dirPhoto) {
      return res.status(404).send();
    }

    return res.send(`<img src="${restaurant.urlPhoto}"></>`);
  }

  async updatePhotoRestaurant(req, res) {
    const { _id } = req.params;
    const restaurant = await Restaurant.findById(_id);

    if (!restaurant) {
      return res.status(400).json({ erro: "Restaurante não encontrado" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Envie uma foto" });
    }

    if (restaurant.dirPhoto) {
      if (fs.existsSync(restaurant.dirPhoto)) {
        fs.unlinkSync(restaurant.dirPhoto);
      }
    }

    await restaurant.update({
      dirPhoto: req.file.path,
    });

    return res.status(204).send();
  }

  async deletePhotoRestaurant(req, res) {
    const { _id } = req.params;
    const restaurant = await Restaurant.findById(_id);

    if (!restaurant) {
      return res.status(400).json({ erro: "Restaurante não encontrado" });
    }

    if (!restaurant.dirPhoto) {
      return res.status(400).json({ erro: "Foto não encontrada" });
    }

    if (fs.existsSync(restaurant.dirPhoto)) {
      fs.unlinkSync(restaurant.dirPhoto);
    }

    await restaurant.update({
      dirPhoto: "",
    });

    return res.status(204).send();
  }

  async getPhotoProduct(req, res) {
    const { _id } = req.params;
    const product = await Product.findById(_id);

    if (!product) {
      return res.status(400).json({ erro: "Produto não encontrado" });
    }

    if (!product.dirPhoto) {
      return res.status(404).send();
    }

    return res.send(`<img src="${product.urlPhoto}"></>`);
  }

  async updatePhotoProduct(req, res) {
    const { _id } = req.params;
    const product = await Product.findById(_id);

    if (!product) {
      return res.status(400).json({ erro: "Produto não encontrado" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Envie uma foto" });
    }

    if (product.dirPhoto) {
      if (fs.existsSync(product.dirPhoto)) {
        fs.unlinkSync(product.dirPhoto);
      }
    }

    await product.update({
      dirPhoto: req.file.path,
    });

    return res.status(204).send();
  }

  async deletePhotoProduct(req, res) {
    const { _id } = req.params;
    const product = await Product.findById(_id);

    if (!product) {
      return res.status(400).json({ erro: "Produto não encontrado" });
    }

    if (!product.dirPhoto) {
      return res.status(400).json({ erro: "Foto não encontrada" });
    }

    if (fs.existsSync(product.dirPhoto)) {
      fs.unlinkSync(product.dirPhoto);
    }

    await product.update({
      dirPhoto: "",
    });

    return res.status(204).send();
  }
}
export default new PhotoController();
