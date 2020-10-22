import { Router } from "express";
import RestaurantController from "./app/controllers/RestaurantController";
import ProductController from "./app/controllers/ProductController";
import CheckIsValidObjectId from "./app/middlewares/validators/CheckIsValidObjectId";
import multer from "multer";
import { configStorage } from "./config/Multer";
import RestaurantCreate from "./app/middlewares/validators/RestaurantCreate";
import RestaurantUpdate from "./app/middlewares/validators/RestaurantUpdate";
import ProductCreate from "./app/middlewares/validators/ProductCreate";
import ProductUpdate from "./app/middlewares/validators/ProductUpdate";

const router = Router();
const uploadPhotoRestaurant = multer(configStorage.restaurant);
const uploadPhotoProduct = multer(configStorage.product);

// Restaurants
router.get("/restaurants", RestaurantController.index);
router.get(
  "/restaurants/:_id",
  CheckIsValidObjectId,
  RestaurantController.show
);
router.post(
  "/restaurants",
  uploadPhotoRestaurant.single("photo"),
  RestaurantCreate,
  RestaurantController.store
);
router.put(
  "/restaurants/:_id",
  CheckIsValidObjectId,
  uploadPhotoRestaurant.single("photo"),
  RestaurantUpdate,
  RestaurantController.update
);
router.delete(
  "/restaurants/:_id",
  CheckIsValidObjectId,
  RestaurantController.delete
);

export { router };
