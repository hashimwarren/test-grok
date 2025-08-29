// Simple JS seed to avoid ESM/ts-node issues
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const count = await prisma.employee.count();
  if (count > 0) return;
  await prisma.employee.createMany({
    data: [
      {
        firstName: "Ada",
        lastName: "Lovelace",
        email: "ada@example.com",
        title: "Software Engineer",
        department: "Engineering",
        location: "London",
      },
      {
        firstName: "Grace",
        lastName: "Hopper",
        email: "grace@example.com",
        title: "Computer Scientist",
        department: "Research",
        location: "New York",
      },
      {
        firstName: "Alan",
        lastName: "Turing",
        email: "alan@example.com",
        title: "Mathematician",
        department: "Research",
        location: "Manchester",
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
