import Product from "../models/Product";
import Product from "../models/Product";
import fs from "fs";

class ProductController {
  async index(req, res) {
    const products = await Product.find();
    return res.json({ products });
  }

  async show(req, res) {
    const { _id } = req.params;
    const product = await Product.findById(_id);

    if (!product) {
      return res.status(400).json({ erro: "Produto não encontrado" });
    }

    return res.json(product);
  }

  async store(req, res) {
    const {
      _idRestaurant,
      name,
      price,
      categories,
      sales,
      dirPhoto,
    } = req.body;

    const productAlreadyCreated = await Product.find({
      _idRestaurant,
      name,
    });

    if (productAlreadyCreated.length > 0) {
      return res.status(400).json({ erro: "Produto já cadastrado" });
    }

    const product = new Product({
      _idRestaurant,
      name,
      price,
      categories,
      sales,
      dirPhoto,
    });

    await product.save();

    return res.json(product.toJSON());
  }

  async update(req, res) {
    const { _id } = req.params;
    const { name, price, categories, sales, dirPhoto } = req.body;

    const product = await Product.findById(_id);

    if (!product) {
      return res.status(400).json({ erro: "Produto não encontrado" });
    }

    if (name && name !== product.name) {
      const productAlreadyCreated = await Product.find({
        _idRestaurant: product._idRestaurant,
        name,
      });

      if (productAlreadyCreated.length > 0) {
        return res.status(400).json({ erro: "Produto já cadastrado" });
      }
    }

    if (dirPhoto) {
      if (fs.existsSync(product.dirPhoto)) {
        fs.unlinkSync(product.dirPhoto);
      }
    }

    await product.update({
      name,
      price,
      categories,
      sales,
      dirPhoto,
    });

    return res.status(204).send();
  }

  async delete(req, res) {
    const { _id } = req.params;

    const product = await Product.findById(_id);

    if (!product) {
      return res.status(400).json({ erro: "Produto não encontrado" });
    }

    if (fs.existsSync(product.dirPhoto)) {
      fs.unlinkSync(product.dirPhoto);
    }
    await Product.remove({ _id });

    return res.status(204).send();
  }
}

export default new ProductController();
