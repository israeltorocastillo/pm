-- CreateEnum
CREATE TYPE "ProjectType" AS ENUM ('PREDICTIVO', 'AGIL_SCRUM', 'HIBRIDO', 'MEJORA_LEAN', 'MEJORA_SIX_SIGMA', 'ANALISIS_NEGOCIO', 'BIM');

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('IDEA', 'EVALUACION', 'EN_CURSO', 'EN_PAUSA', 'CERRADO', 'CANCELADO');

-- CreateEnum
CREATE TYPE "CynefinDomain" AS ENUM ('CLARO', 'COMPLICADO', 'COMPLEJO', 'CAOTICO', 'DESORDEN');

-- CreateEnum
CREATE TYPE "ProjectRole" AS ENUM ('OWNER', 'EDITOR', 'VIEWER');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('POR_HACER', 'EN_CURSO', 'HECHO', 'BLOQUEADO');

-- CreateEnum
CREATE TYPE "ToolStatus" AS ENUM ('BORRADOR', 'EN_REVISION', 'APROBADO');

-- CreateEnum
CREATE TYPE "AuthorType" AS ENUM ('USER', 'AI_ACCEPTED');

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" "ProjectType" NOT NULL,
    "status" "ProjectStatus" NOT NULL DEFAULT 'IDEA',
    "objective" TEXT,
    "problemStatement" TEXT,
    "cynefinDomain" "CynefinDomain",
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "keyResultId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectMember" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "ProjectRole" NOT NULL,
    "methodRole" TEXT,

    CONSTRAINT "ProjectMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "assigneeId" TEXT,
    "dueDate" TIMESTAMP(3),
    "status" "TaskStatus" NOT NULL DEFAULT 'POR_HACER',
    "sourceInstanceId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ToolInstance" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "phaseId" TEXT,
    "toolId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" "ToolStatus" NOT NULL DEFAULT 'BORRADOR',
    "data" JSONB NOT NULL,
    "schemaVersion" INTEGER NOT NULL,
    "derived" JSONB,
    "sourceInstanceId" TEXT,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ToolInstance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ToolVersion" (
    "id" TEXT NOT NULL,
    "instanceId" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "version" INTEGER NOT NULL,
    "authorId" TEXT NOT NULL,
    "authorType" "AuthorType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ToolVersion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectMember_projectId_userId_key" ON "ProjectMember"("projectId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "ToolVersion_instanceId_version_key" ON "ToolVersion"("instanceId", "version");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectMember" ADD CONSTRAINT "ProjectMember_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectMember" ADD CONSTRAINT "ProjectMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToolInstance" ADD CONSTRAINT "ToolInstance_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToolVersion" ADD CONSTRAINT "ToolVersion_instanceId_fkey" FOREIGN KEY ("instanceId") REFERENCES "ToolInstance"("id") ON DELETE CASCADE ON UPDATE CASCADE;
