/*
  Warnings:

  - You are about to drop the column `restaurateurId` on the `Restaurant` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Restaurant" DROP CONSTRAINT "Restaurant_restaurateurId_fkey";

-- AlterTable
ALTER TABLE "Restaurant" DROP COLUMN "restaurateurId",
ADD COLUMN     "restaurateurProfileId" TEXT;

-- AddForeignKey
ALTER TABLE "Restaurant" ADD CONSTRAINT "Restaurant_restaurateurProfileId_fkey" FOREIGN KEY ("restaurateurProfileId") REFERENCES "RestaurateurProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
