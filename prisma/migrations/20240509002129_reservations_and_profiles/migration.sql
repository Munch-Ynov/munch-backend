/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Auth` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `RestaurateurProfile` table without a default value. This is not possible if the table is not empty.
  - Made the column `restaurantId` on table `RestaurateurProfile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
ALTER TYPE "ReservationStatus" ADD VALUE 'CANCELED';

-- DropForeignKey
ALTER TABLE "RestaurateurProfile" DROP CONSTRAINT "RestaurateurProfile_restaurantId_fkey";

-- AlterTable
ALTER TABLE "Reservation" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Restaurant" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "RestaurateurProfile" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "restaurantId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Auth_email_key" ON "Auth"("email");

-- AddForeignKey
ALTER TABLE "RestaurateurProfile" ADD CONSTRAINT "RestaurateurProfile_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
