import Product from "../models/Product";
import Product from "../models/Product";
import fs from "fs";

class ProductController {
  async index(req, res) {
    const page = Number(req.query.page || 0);
    const limit = Number(req.query.limit || 0);
    const skip = (page - 1) * limit;

    const products = await Product.find().limit(limit).skip(skip).exec();

    const count = Number(await Product.countDocuments());
    const totalPages = Math.ceil(count / limit);
    const nextPage = page === totalPages ? page : page + 1;

    return res.json(
      page
        ? {
            totalPages: totalPages,
            currentPage: page,
            nextPage: nextPage,
            totalResults: count,
            products,
          }
        : {
            products,
          }
    );
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
