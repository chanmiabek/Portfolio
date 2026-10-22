import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { z } from "zod";

const prisma = new PrismaClient();
const schema = z.object({ email: z.string().email().transform((v) => v.toLowerCase()), name: z.string().min(2), password: z.string().min(12).max(200) });

async function main() {
  const parsed = schema.safeParse({ email: process.env.ADMIN_EMAIL, name: process.env.ADMIN_NAME, password: process.env.ADMIN_PASSWORD });
  if (!parsed.success) {
    console.error("Set ADMIN_EMAIL, ADMIN_NAME, and ADMIN_PASSWORD (at least 12 characters) before running npm run admin:create.");
    process.exitCode = 1; 
    return;
  }
  const passwordHash = await hash(parsed.data.password, 12);
  await prisma.adminUser.upsert({
    where: { email: parsed.data.email },
    create: { email: parsed.data.email, name: parsed.data.name, passwordHash },
    update: { name: parsed.data.name, passwordHash },
  });
  console.info(`Admin account configured for ${parsed.data.email}`);
}
main().finally(() => prisma.$disconnect());
