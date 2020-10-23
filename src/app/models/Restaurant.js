import Mongoose, { Schema } from "mongoose";

const Restaurant = new Schema(
  {
    name: { type: String, required: true, unique: true },
    adressStreet: { type: String, required: true },
    adressNumber: { type: String, required: true },
    adressDistrict: { type: String, required: true },
    adressCity: { type: String, required: true },
    adressState: { type: String, required: true },
    adressCountry: { type: String, required: true },
    adressZipCode: { type: String, required: true },
    adressObs: { type: String },
    openingHours: {
      _id: false,
      type: [],
      required: true,
    },
    dirPhoto: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: false,
  }
);

Restaurant.virtual("urlPhoto").get(function () {
  const path = this.dirPhoto.slice(
    this.dirPhoto.indexOf("storage"),
    this.dirPhoto.length
  );
  return `${process.env.API_EXTERNAL_URI}/${path}`;
});

Restaurant.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform(doc, ret) {
    delete ret.dirPhoto;
    delete ret.id;
  },
});

export default Mongoose.model("Restaurant", Restaurant);
