const jwt = require("./jwt");
const prisma = require("./prisma");
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      const error = new Error("Authorization header is missing.");
      error.status = 401;
      throw error;
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      const error = new Error("Token is missing.");
      error.status = 401;
      throw error;
    }
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      const error = new Error("User not found.");
      error.status = 401;
      throw error;
    }
    req.user = user;
    next();
  } catch (error) {
    if (!error.status) {
      error.status = 500;
    }
    next(error);
  }
};
module.exports = authenticate;