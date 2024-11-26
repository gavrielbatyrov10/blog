const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
async function main() {
  await prisma.user.upsert({
    where: { email: "gabriel@example.com" },
    update: {},
    create: {
      name: "gabriel",
      email: "gabriel@example.com",
      password: "securepassword",
      role: "admin",
    },
    
  });

  await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: {},
    create: {
      name: "user",
      email: "user@example.com",
      password: "password",
      role: "user",
    },
    
  });

  console.log("Seeding complete!");
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
