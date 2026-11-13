import { config } from "dotenv";
import { defineConfig } from "prisma/config";

config({ path: "prisma/.env" });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    seed: "tsx prisma/seed.ts",
  },
});
