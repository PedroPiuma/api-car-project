import * as carsController from "../controllers/carsController.js";
import multer from "fastify-multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, reply, callback) => {
    callback(null, "public/images");
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    cb(null, file.originalname + "-" + Date.now() + extension);
  },
});

const upload = multer({ storage });

const routes = [
  {
    method: "GET",
    url: "/cars",
    handler: carsController.getAllCars,
  },
  {
    method: "POST",
    url: "/cars",
    preHandler: upload.single("image_url"),
    handler: carsController.createCar,
  },
  {
    method: "DELETE",
    url: "/cars/:id",
    handler: carsController.deleteCar,
  },
  {
    method: "PATCH",
    url: "/cars/:id",
    preHandler: upload.single("image_url"),
    handler: carsController.patchCar,
  },
  {
    method: "PUT",
    url: "/cars/:id",
    preHandler: upload.single("image_url"),
    handler: carsController.putCar,
  },
];

export default (fastify, _, next) => {
  for (let route of routes) {
    fastify.route(route);
  }
  next();
};
