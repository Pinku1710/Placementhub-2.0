import { z } from "zod";

export const applicationSchema = z.object({
  company: z.string().min(2).max(120),
  role: z.string().min(2).max(120),
  location: z.string().max(120).optional().nullable(),
  jobUrl: z.string().url().optional().or(z.literal("")).nullable(),
  status: z.enum([
    "APPLIED",
    "SCREENING",
    "INTERVIEW",
    "OFFER",
    "REJECTED",
    "WITHDRAWN"
  ]).optional(),
  deadline: z.string().datetime().optional().nullable(),
  notes: z.string().max(2000).optional().nullable()
});

export const interviewSchema = z.object({
  round: z.string().min(2).max(100),
  scheduledAt: z.string().datetime(),
  mode: z.string().max(50).optional().nullable(),
  meetingUrl: z.string().url().optional().or(z.literal("")).nullable(),
  notes: z.string().max(2000).optional().nullable()
});
