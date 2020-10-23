import Restaurant from "../models/Restaurant";
import Product from "../models/Product";
import fs from "fs";

class PhotoController {
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
}
export default new PhotoController();
