const prisma = require("./prisma");
const router = require("express").Router();
const authenticate = require("./authenticate");
module.exports = router;
const JWT_SECRET = process.env.JWT_SECRET;

const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

// only authenticate users can post
router.get("/posts", authenticate, async (req, res) => {
  const posts = await prisma.post.findMany();
  res.json(posts);
});

router.post("/posts", authenticate, async (req, res, next) => {
  try {
    const { title, description } = req.body;
    if (!title || typeof title !== "string" || title.trim() === "") {
      const error = new Error(
        "Title is required and must be a non-empty string."
      );
      error.status = 400;
      throw error;
    }
    if (
      !description ||
      typeof description !== "string" ||
      description.trim() === ""
    ) {
      const error = new Error(
        "Description is required and must be a non-empty string."
      );
      error.status = 400;
      throw error;
    }
    const createdById = req.user.id;
    const post = await prisma.post.create({
      data: {
        title: title.trim(),
        description: description.trim(),
        createdById,
      },
    });
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
});

router.put("/posts/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const post = await prisma.post.update({
    where: { id: id },
    data: { title: title, description: description },
  });
  res.status(200).json(post);
});

router.get("/posts/:id", authenticate, async (req, res, next) => {
  try {
    const id = req.params.id;
    const post = await prisma.post.findUnique({ where: { id: parseInt(id) } });
    if (!post) {
        const error = new Error("Post not found.");
        error.status = 404;
        throw error;
      }
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
});

// delete

router.delete("/posts/:id", authenticate, async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await prisma.post.findUnique({ where: { id: parseInt(id) } });
    if (!post) {
      const error = new Error("Post not found.");
      error.status = 404;
      throw error;
    }
    if (post.createdById !== req.user.id) {
      const error = new Error("You are not authorized to delete this post.");
      error.status = 403;
      throw error;
    }
    await prisma.post.delete({ where: { id: parseInt(id) } });
    res.json({"message":"Post has been deleted"});
  } catch (error) {
    next(error);
  }
});
