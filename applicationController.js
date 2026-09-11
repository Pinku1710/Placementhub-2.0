import { prisma } from "../utils/prisma.js";
import { applicationSchema } from "../utils/validation.js";

export async function listApplications(req, res) {
  const {
    search = "",
    status,
    page = "1",
    limit = "10",
    sort = "newest"
  } = req.query;

  const pageNumber = Math.max(Number(page) || 1, 1);
  const pageSize = Math.min(Math.max(Number(limit) || 10, 1), 50);

  const where = {
    userId: req.user.id,
    ...(status ? { status } : {}),
    ...(search
      ? {
          OR: [
            { company: { contains: search } },
            { role: { contains: search } },
            { location: { contains: search } }
          ]
        }
      : {})
  };

  const orderBy =
    sort === "company"
      ? { company: "asc" }
      : sort === "oldest"
        ? { appliedDate: "asc" }
        : { appliedDate: "desc" };

  const [items, total] = await prisma.$transaction([
    prisma.application.findMany({
      where,
      orderBy,
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      include: { interviews: true }
    }),
    prisma.application.count({ where })
  ]);

  res.json({
    items,
    pagination: {
      page: pageNumber,
      limit: pageSize,
      total,
      pages: Math.ceil(total / pageSize)
    }
  });
}

export async function getApplication(req, res) {
  const item = await prisma.application.findFirst({
    where: { id: req.params.id, userId: req.user.id },
    include: { interviews: true }
  });

  if (!item) return res.status(404).json({ message: "Application not found" });

  res.json(item);
}

export async function createApplication(req, res) {
  const data = applicationSchema.parse(req.body);

  const item = await prisma.application.create({
    data: {
      ...data,
      deadline: data.deadline ? new Date(data.deadline) : null,
      userId: req.user.id
    }
  });

  res.status(201).json(item);
}

export async function updateApplication(req, res) {
  const data = applicationSchema.partial().parse(req.body);

  const existing = await prisma.application.findFirst({
    where: { id: req.params.id, userId: req.user.id }
  });

  if (!existing) return res.status(404).json({ message: "Application not found" });

  const item = await prisma.application.update({
    where: { id: existing.id },
    data: {
      ...data,
      deadline:
        data.deadline === undefined
          ? undefined
          : data.deadline
            ? new Date(data.deadline)
            : null
    }
  });

  res.json(item);
}

export async function deleteApplication(req, res) {
  const existing = await prisma.application.findFirst({
    where: { id: req.params.id, userId: req.user.id }
  });

  if (!existing) return res.status(404).json({ message: "Application not found" });

  await prisma.application.delete({ where: { id: existing.id } });
  res.status(204).send();
}
