-- DropForeignKey
ALTER TABLE "Membership" DROP CONSTRAINT "Membership_managerId_fkey";

-- CreateIndex
CREATE INDEX "Membership_managerId_idx" ON "Membership"("managerId");

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Membership"("id") ON DELETE SET NULL ON UPDATE CASCADE;
