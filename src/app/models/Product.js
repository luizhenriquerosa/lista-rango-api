import Mongoose, { Schema } from "mongoose";

const Product = new Schema(
  {
    _idRestaurant: { type: Schema.ObjectId, ref: "Restaurant", index: true },
    name: { type: String, required: true, unique: false },
    price: { type: Number, required: true },
    dirPhoto: {
      type: String,
      required: true,
    },
    categories: {
      type: [String],
      required: true,
    },
    sales: {
      _id: false,
      type: [],
      required: false,
    },
  },
  {
    timestamps: false,
    toJSON: { virtuals: true },
  }
);

Product.virtual("urlPhoto").get(function () {
  const path = this.dirPhoto.slice(
    this.dirPhoto.indexOf("storage"),
    this.dirPhoto.length
  );
  return `${process.env.API_EXTERNAL_URI}/${path}`;
});

Product.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform(doc, ret) {
    delete ret.dirPhoto;
    delete ret.id;
  },
});

export default Mongoose.model("Product", Product);
