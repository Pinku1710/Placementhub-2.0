import { prisma } from "../utils/prisma.js";

export async function dashboard(req, res) {
  const userId = req.user.id;

  const [total, applied, screening, interviews, offers, rejected, upcomingInterviews] =
    await prisma.$transaction([
      prisma.application.count({ where: { userId } }),
      prisma.application.count({ where: { userId, status: "APPLIED" } }),
      prisma.application.count({ where: { userId, status: "SCREENING" } }),
      prisma.application.count({ where: { userId, status: "INTERVIEW" } }),
      prisma.application.count({ where: { userId, status: "OFFER" } }),
      prisma.application.count({ where: { userId, status: "REJECTED" } }),
      prisma.interview.findMany({
        where: {
          userId,
          scheduledAt: { gte: new Date() }
        },
        orderBy: { scheduledAt: "asc" },
        take: 5,
        include: { application: true }
      })
    ]);

  res.json({
    totals: { total, applied, screening, interviews, offers, rejected },
    upcomingInterviews
  });
}
