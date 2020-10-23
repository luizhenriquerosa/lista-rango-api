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
import PhotoController from "./app/controllers/PhotoController";
import FilterController from "./app/controllers/FilterController";

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
router.get(
  "/restaurants/:_id/products",
  CheckIsValidObjectId,
  RestaurantController.products
);
router.post(
  "/restaurants",
  uploadPhotoRestaurant.single("photo"),
  RestaurantCreate,
  RestaurantController.store
);
router.get(
  "/restaurants/:_id/photo",
  CheckIsValidObjectId,
  PhotoController.getPhotoRestaurant
);
router.put(
  "/restaurants/:_id",
  CheckIsValidObjectId,
  uploadPhotoRestaurant.single("photo"),
  RestaurantUpdate,
  RestaurantController.update
);
router.put(
  "/restaurants/:_id/photo",
  CheckIsValidObjectId,
  uploadPhotoRestaurant.single("photo"),
  RestaurantUpdate,
  PhotoController.updatePhotoRestaurant
);
router.delete(
  "/restaurants/:_id/photo",
  CheckIsValidObjectId,
  PhotoController.deletePhotoRestaurant
);
router.delete(
  "/restaurants/:_id",
  CheckIsValidObjectId,
  RestaurantController.delete
);

// Products
router.get("/products", ProductController.index);
router.get("/products/:_id", CheckIsValidObjectId, ProductController.show);
router.post(
  "/products",
  uploadPhotoProduct.single("photo"),
  CheckIsValidObjectId,
  ProductCreate,
  ProductController.store
);
router.put(
  "/products/:_id",
  CheckIsValidObjectId,
  uploadPhotoProduct.single("photo"),
  ProductUpdate,
  ProductController.update
);
router.get(
  "/products/:_id/photo",
  CheckIsValidObjectId,
  PhotoController.getPhotoProduct
);
router.put(
  "/products/:_id/photo",
  CheckIsValidObjectId,
  uploadPhotoRestaurant.single("photo"),
  RestaurantUpdate,
  PhotoController.updatePhotoProduct
);
router.delete(
  "/products/:_id/photo",
  CheckIsValidObjectId,
  PhotoController.deletePhotoProduct
);
router.delete("/products/:_id", CheckIsValidObjectId, ProductController.delete);

// Filters
router.get("/promotions", FilterController.getAllActivePromotions);
router.get(
  "/restaurants/:_id/promotions",
  CheckIsValidObjectId,
  FilterController.getAllActivePromotions
);
router.get("/categories", FilterController.getAllCategories);
router.get(
  "/restaurants/:_id/categories",
  CheckIsValidObjectId,
  FilterController.getAllCategories
);

export { router };
