/*
  Warnings:

  - You are about to drop the column `gander` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "gander",
ADD COLUMN     "gender" TEXT;
