/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "email" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "UserLocal" (
    "id" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserLocal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSocial" (
    "id" TEXT NOT NULL,
    "providerName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserSocial_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserLocal_userId_key" ON "UserLocal"("userId");

-- CreateIndex
CREATE INDEX "UserLocal_userId_idx" ON "UserLocal"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserSocial_userId_key" ON "UserSocial"("userId");

-- CreateIndex
CREATE INDEX "UserSocial_userId_idx" ON "UserSocial"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserSocial_providerName_email_key" ON "UserSocial"("providerName", "email");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "UserLocal" ADD CONSTRAINT "UserLocal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSocial" ADD CONSTRAINT "UserSocial_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
