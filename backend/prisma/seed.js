const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
async function main() {
  const hashedPassword = await bcrypt.hash("securepassword", 10);
  await prisma.user.upsert({
    where: { email: "gabriel1234@gmail.com" },
    update: {},
    create: {
      name: "gabriel",
      email: "gabriel1234@gmail.com",
      password: hashedPassword,
      role: "admin",
    },
    
  });


  await prisma.user.upsert({
    where: { email: "user@gmail.com" },
    update: {},
    create: {
      name: "user",
      email: "user@gmail.com",
      password: hashedPassword,
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
