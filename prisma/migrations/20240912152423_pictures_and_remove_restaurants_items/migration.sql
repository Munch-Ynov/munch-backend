/*
  Warnings:

  - You are about to drop the column `coordinates` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `opening_hours` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `icon` on the `RestaurantFeature` table. All the data in the column will be lost.
  - You are about to drop the column `banner` on the `RestaurateurProfile` table. All the data in the column will be lost.
  - You are about to drop the column `banner` on the `UserProfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Restaurant" DROP COLUMN "coordinates",
DROP COLUMN "opening_hours",
ADD COLUMN     "main_picture" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "pictures" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "RestaurantFeature" DROP COLUMN "icon";

-- AlterTable
ALTER TABLE "RestaurateurProfile" DROP COLUMN "banner";

-- AlterTable
ALTER TABLE "UserProfile" DROP COLUMN "banner";
