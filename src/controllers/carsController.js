import { prisma } from "../helpers/utils.js";

export const getAllCars = async (request, reply) => {
  try {
    const posts = await prisma.car.findMany();
    return posts;
  } catch (error) {
    console.log(error);
    reply.status(500).send("Não foi possível criar o car");
  }
};

export const createCar = async (req, reply) => {
  try {
    const { name, year, brand_id } = req.body;
    const car = await prisma.car.create({
      data: {
        name,
        year,
        brand: {
          connect: { id: Number(brand_id) },
        },
        image_url: req.file.path
      },
    });
    reply.send(car);
  } catch (error) {
    console.log(error);
    reply.status(500).send("Não foi possível criar o car");
  }
};

export const deleteCar = async (req, reply) => {
  try {
    const id = Number(req.params.id)
    console.log(id)
    const post = await prisma.car.delete({ where: { id } });
    reply.send(post);
  } catch (error) {
    console.log(error);
    reply.status(500).send("Não foi possível deletar a marca");
  }
};


export const patchCar = async (req, reply) => {
  try {
    const id = Number(req.params.id)
    const img = req.file?.path ? req.file.path : ''
    const { name, year, brand_id } = req.body;
    let result = {}
    name ? result.name = name : ''
    year ? result.year = year : ''
    brand_id ? result.brand_id = brand_id : ''
    img ? result.image_url = img : ''
    const car = await prisma.car.update({
      where: {
        id: id
      },
      data: result
    })
    reply.send(car);
  } catch (error) {
    console.log(error);
    reply.status(500).send("Não foi possível atualizar o car");
  }
};

export const putCar = async (req, reply) => {
  try {
    const id = Number(req.params.id)
    const { name, year, brand_id } = req.body;
    const car = await prisma.car.update({
      where: {
        id: id
      },
      data: {
        name,
        year,
        brand_id: +brand_id,
        image_url: req.file.path
      }
    })
    reply.send(car);
  } catch (error) {
    console.log(error);
    reply.status(500).send("Não foi possível atualizar o car");
  }
};
