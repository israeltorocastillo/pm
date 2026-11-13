import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { createProject, createTask } from "@/server/services/projects";
import { createToolInstance, saveToolInstanceData, feedToolInstance } from "@/server/services/tool-instances";

const db = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("demo1234", 12);

  const org = await db.organization.upsert({
    where: { id: "demo-org" },
    update: {},
    create: { id: "demo-org", name: "Organización Demo" },
  });

  const admin = await db.user.upsert({
    where: { email: "admin@demo.local" },
    update: {},
    create: {
      email: "admin@demo.local",
      name: "Admin Demo",
      passwordHash,
      expertise: "ADVANCED",
    },
  });

  const member = await db.user.upsert({
    where: { email: "miembro@demo.local" },
    update: {},
    create: {
      email: "miembro@demo.local",
      name: "Miembro Demo",
      passwordHash,
      expertise: "INTERMEDIATE",
    },
  });

  await db.membership.upsert({
    where: { userId_orgId: { userId: admin.id, orgId: org.id } },
    update: {},
    create: { userId: admin.id, orgId: org.id, role: "ADMIN" },
  });

  await db.membership.upsert({
    where: { userId_orgId: { userId: member.id, orgId: org.id } },
    update: {},
    create: { userId: member.id, orgId: org.id, role: "MEMBER" },
  });

  const existingProject = await db.project.findFirst({
    where: { orgId: org.id, name: "Reducir excesos en Unidad de Empaque" },
  });

  if (!existingProject) {
    const project = await createProject({
      creatorId: admin.id,
      orgId: org.id,
      name: "Reducir excesos en Unidad de Empaque",
      description: "Proyecto de ejemplo para validar el patrón Ishikawa → Pareto → A3.",
      type: "MEJORA_LEAN",
      objective: "Reducir el exceso de llenado (giveaway) en 50% antes de junio de 2026.",
      problemStatement:
        "Desde enero de 2026, la línea de bolsas excede el llenado objetivo en un 88% de los casos registrados, afectando el margen de la unidad.",
    });

    await db.projectMember.upsert({
      where: { projectId_userId: { projectId: project.id, userId: member.id } },
      update: {},
      create: { projectId: project.id, userId: member.id, role: "EDITOR" },
    });

    const charter = await createToolInstance({
      userId: admin.id,
      projectId: project.id,
      toolId: "ficha-proyecto",
      title: "Charter — Reducir excesos",
    });
    await saveToolInstanceData({
      userId: admin.id,
      instanceId: charter.id,
      data: {
        problemaOportunidad:
          "Desde enero de 2026, la línea de bolsas excede el llenado objetivo en un 88% de los casos, afectando el margen de la unidad.",
        objetivo: "Reducir el exceso de llenado (giveaway) en 50% antes de junio de 2026.",
        alcanceDentro: ["Línea de bolsas", "Línea boca ancha"],
        alcanceFuera: ["Extracción y cocción"],
        criteriosExito: [
          { id: "k1", nombre: "Giveaway bolsas", definicion: "% exceso sobre objetivo", meta: "< 44%" },
        ],
        equipo: [
          { id: "e1", persona: "Admin Demo", rol: "sponsor", dedicacionPct: 10 },
          { id: "e2", persona: "Miembro Demo", rol: "lider_jp", dedicacionPct: 50 },
        ],
      },
    });

    const ishikawa = await createToolInstance({
      userId: admin.id,
      projectId: project.id,
      toolId: "ishikawa",
      title: "Ishikawa — Exceso de llenado",
    });
    await saveToolInstanceData({
      userId: admin.id,
      instanceId: ishikawa.id,
      data: {
        efecto: "Aumento de los excesos en la Unidad de Empaque",
        metodo: "6m",
        categorias: [
          { id: "c1", nombre: "Equipos" },
          { id: "c2", nombre: "Materiales" },
          { id: "c3", nombre: "Gestión" },
          { id: "c4", nombre: "Medición" },
        ],
        causas: [
          { id: "ca1", categoria: "Equipos", texto: "Máquinas obsoletas", evidencia: [], votos531: 5, aValidar: true, padreRef: null },
          { id: "ca2", categoria: "Equipos", texto: "Fallas frecuentes", evidencia: [], votos531: 3, aValidar: true, padreRef: null },
          { id: "ca3", categoria: "Materiales", texto: "Repuestos de mala calidad", evidencia: [], votos531: 1, aValidar: false, padreRef: null },
          { id: "ca4", categoria: "Gestión", texto: "Coordinación débil entre áreas", evidencia: [], votos531: 0, aValidar: false, padreRef: null },
          { id: "ca5", categoria: "Medición", texto: "Falta de datos confiables", evidencia: [], votos531: 0, aValidar: false, padreRef: null },
        ],
      },
    });

    await feedToolInstance({ userId: admin.id, sourceInstanceId: ishikawa.id, targetToolId: "pareto" });

    await createTask({
      userId: admin.id,
      projectId: project.id,
      title: "Revisar bitácora de mantenimiento de la línea de bolsas",
    });
  }

  console.log("Seed listo: admin@demo.local / miembro@demo.local, contraseña: demo1234");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await db.$disconnect();
  });
