import * as brandController from "../controllers/brandController.js";

const routes = [
  {
    method: "GET",
    url: "/brand",
    handler: brandController.getAllBrand,
  },
  {
    method: "POST",
    url: "/brand",
    handler: brandController.createBrand,
  },
  {
    method: "DELETE",
    url: "/brand/:id",
    handler: brandController.deleteBrand,
  },
  {
    method: "PUT",
    url: "/brand/:id",
    handler: brandController.putBrand,
  },
];

export default (fastify, _, next) => {
  for (let route of routes) {
    fastify.route(route);
  }
  next();
};
