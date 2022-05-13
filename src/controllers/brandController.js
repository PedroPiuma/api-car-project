import { prisma } from "../helpers/utils.js";

export const getAllBrand = async (request, reply) => {
  try {
    const posts = await prisma.brand.findMany();
    return posts;
  } catch (error) {
    console.log(error);
    reply.status(500).send("Não foi possível criar a marca");
  }
};

export const createBrand = async (req, reply) => {
  try {
    const { name } = req.body;
    const post = await prisma.brand.create({ data: { name } });
    reply.send(post);
  } catch (error) {
    console.log(error);
    reply.status(500).send("Não foi possível criar a marca");
  }
};

export const deleteBrand = async (req, reply) => {
  try {
    const id = Number(req.params.id)
    const post = await prisma.brand.delete({ where: { id } });
    reply.send(post);
  } catch (error) {
    console.log(error);
    reply.status(500).send("Não foi possível deletar a marca");
  }
};

export const putBrand = async (req, reply) => {
  try {
    const id = Number(req.params.id)
    console.log('Parametro aqui: !!!!!!!!1 : ' + req.params)
    const { name } = req.body;
    const brand = await prisma.brand.update({
      where: { id: id },
      data: { name }
    })
    reply.send(brand);
  } catch (error) {
    console.log(error);
    reply.status(500).send("Não foi possível atualizar a brand");
  }
};

