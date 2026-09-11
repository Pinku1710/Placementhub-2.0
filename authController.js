import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../utils/prisma.js";
import { z } from "zod";

const authSchema = z.object({
  name: z.string().min(2).max(80).optional(),
  email: z.string().email(),
  password: z.string().min(8).max(100)
});

function signToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

export async function register(req, res) {
  const data = authSchema.parse(req.body);
  const exists = await prisma.user.findUnique({ where: { email: data.email } });

  if (exists) return res.status(409).json({ message: "Email already registered" });

  const passwordHash = await bcrypt.hash(data.password, 12);
  const user = await prisma.user.create({
    data: {
      name: data.name || "Student",
      email: data.email,
      passwordHash
    }
  });

  res.status(201).json({
    token: signToken(user),
    user: { id: user.id, name: user.name, email: user.email, role: user.role }
  });
}

export async function login(req, res) {
  const data = authSchema.pick({ email: true, password: true }).parse(req.body);
  const user = await prisma.user.findUnique({ where: { email: data.email } });

  if (!user || !(await bcrypt.compare(data.password, user.passwordHash))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  res.json({
    token: signToken(user),
    user: { id: user.id, name: user.name, email: user.email, role: user.role }
  });
}

export async function me(req, res) {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: { id: true, name: true, email: true, role: true }
  });

  res.json(user);
}
