/*
  Warnings:

  - You are about to drop the column `userId` on the `Department` table. All the data in the column will be lost.
  - You are about to drop the column `departmentId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `deptId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `isOnboarded` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `passwordChangeAt` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `passwordHash` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `reportingManagerId` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Department" DROP CONSTRAINT "Department_userId_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_deptId_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_reportingManagerId_fkey";

-- DropIndex
DROP INDEX "user_isOnboarded_idx";

-- AlterTable
ALTER TABLE "Department" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Membership" ADD COLUMN     "departmentId" UUID,
ADD COLUMN     "designation" TEXT,
ADD COLUMN     "joiningDate" TIMESTAMP(3),
ADD COLUMN     "managerId" UUID,
ADD COLUMN     "salary" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "departmentId",
DROP COLUMN "deptId",
DROP COLUMN "isOnboarded",
DROP COLUMN "passwordChangeAt",
DROP COLUMN "passwordHash",
DROP COLUMN "reportingManagerId",
ADD COLUMN     "gender" TEXT;

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;
