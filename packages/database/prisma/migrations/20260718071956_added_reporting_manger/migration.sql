-- AlterTable
ALTER TABLE "user" ADD COLUMN     "reportingManagerId" UUID;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_reportingManagerId_fkey" FOREIGN KEY ("reportingManagerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
