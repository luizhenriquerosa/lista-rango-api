import Product from "../models/Product";
import moment from "moment";

class FilterController {
  async getAllActivePromotions(req, res) {
    const { _id } = req.params;

    const products = _id
      ? await Product.find({
          _idRestaurant: _id,
          $and: [
            { $where: "this.sales.length > 0" },
            { $where: `this.sales.weekday = "${moment().format("dddd")}"` },
          ],
        })
      : await Product.find({
          $and: [
            { $where: "this.sales.length > 0" },
            { $where: `this.sales.weekday = "${moment().format("dddd")}"` },
          ],
        });

    const promotions = products.filter((p) => {
      const hasPromotion = p.sales.filter((s) => {
        const weekday = moment().format("dddd");
        if (s.weekday !== weekday) {
          return false;
        }

        const start = moment(s.schedule.start, "HH:mm");
        const end = moment(s.schedule.end, "HH:mm");
        const now = moment();

        if (!now.isBetween(start, end)) {
          return false;
        }

        return true;
      });

      return hasPromotion.length > 0 ? true : false;
    });

    return res.json({ promotions });
  }

  async getAllCategories(req, res) {
    const { _id } = req.params;

    const products = _id
      ? await Product.find({ _idRestaurant: _id }).distinct("categories")
      : await Product.find().distinct("categories");

    const categories = products;

    return res.json({ categories });
  }
}

export default new FilterController();
