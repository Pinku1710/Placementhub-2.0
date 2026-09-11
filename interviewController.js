import { prisma } from "../utils/prisma.js";
import { interviewSchema } from "../utils/validation.js";

export async function createInterview(req, res) {
  const data = interviewSchema.parse(req.body);

  const application = await prisma.application.findFirst({
    where: { id: req.params.applicationId, userId: req.user.id }
  });

  if (!application) return res.status(404).json({ message: "Application not found" });

  const interview = await prisma.$transaction(async (tx) => {
    const created = await tx.interview.create({
      data: {
        ...data,
        scheduledAt: new Date(data.scheduledAt),
        applicationId: application.id,
        userId: req.user.id
      }
    });

    await tx.application.update({
      where: { id: application.id },
      data: { status: "INTERVIEW" }
    });

    return created;
  });

  res.status(201).json(interview);
}

export async function deleteInterview(req, res) {
  const interview = await prisma.interview.findFirst({
    where: { id: req.params.id, userId: req.user.id }
  });

  if (!interview) return res.status(404).json({ message: "Interview not found" });

  await prisma.interview.delete({ where: { id: interview.id } });
  res.status(204).send();
}
