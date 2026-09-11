import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("Password123!", 12);

  const user = await prisma.user.upsert({
    where: { email: "student@example.com" },
    update: { passwordHash },
    create: {
      name: "Demo Student",
      email: "student@example.com",
      passwordHash
    }
  });

  const existing = await prisma.application.count({ where: { userId: user.id } });

  if (existing === 0) {
    await prisma.application.createMany({
      data: [
        {
          company: "Microsoft",
          role: "Software Engineer Intern",
          location: "Bengaluru",
          status: "APPLIED",
          jobUrl: "https://careers.microsoft.com/",
          notes: "Practice DSA and prepare behavioral answers.",
          userId: user.id
        },
        {
          company: "Google",
          role: "Software Engineering Intern",
          location: "Hyderabad",
          status: "SCREENING",
          jobUrl: "https://careers.google.com/",
          userId: user.id
        },
        {
          company: "Amazon",
          role: "SDE Intern",
          location: "Bengaluru",
          status: "INTERVIEW",
          userId: user.id
        }
      ]
    });
  }

  console.log("Seed complete. Login: student@example.com / Password123!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
