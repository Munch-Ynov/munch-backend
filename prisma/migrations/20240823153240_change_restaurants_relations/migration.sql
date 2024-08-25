/*
  Warnings:

  - You are about to drop the column `restaurantId` on the `RestaurateurProfile` table. All the data in the column will be lost.
  - Added the required column `restaurateurId` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RestaurateurProfile" DROP CONSTRAINT "RestaurateurProfile_restaurantId_fkey";

-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "restaurateurId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "RestaurateurProfile" DROP COLUMN "restaurantId",
ADD COLUMN     "phone" TEXT;

-- AddForeignKey
ALTER TABLE "Restaurant" ADD CONSTRAINT "Restaurant_restaurateurId_fkey" FOREIGN KEY ("restaurateurId") REFERENCES "RestaurateurProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
