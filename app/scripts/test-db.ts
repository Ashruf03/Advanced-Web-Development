
import { prisma } from "../lib/prisma";

async function main() {
  // 1. CREATE or UPDATE a test user
  const user = await prisma.user.upsert({
    where: {
      email: "prisma-test@example.com",
    },
    update: {
      name: "Prisma Test User",
    },
    create: {
      email: "prisma-test@example.com",
      name: "Prisma Test User",
    },
  });

  console.log("User:", user);

  // 2. READ the user from PostgreSQL
  const foundUser = await prisma.user.findUnique({
    where: {
      email: "prisma-test@example.com",
    },
  });

  console.log("Retrieved user:", foundUser);

  // 3. CREATE a newsletter
  const newsletter = await prisma.newsletter.create({
    data: {
      title: "My First Newsletter",
      content: "This is a test newsletter.",
      image: "https://example.com/image.jpg",
      status: "Draft",
      authorId: user.id,
    },
  });

  console.log("Created newsletter:", newsletter);

  // 4. READ newsletters belonging to this user
  const newsletters = await prisma.newsletter.findMany({
    where: {
      authorId: user.id,
    },
  });

  console.log("User newsletters:", newsletters);
}

main()
  .catch((error) => {
    console.error("Database test failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
