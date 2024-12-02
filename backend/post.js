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
