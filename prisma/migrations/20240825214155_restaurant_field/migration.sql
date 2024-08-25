/*
  Warnings:

  - Added the required column `coordinates` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `opening_hours` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "coordinates" TEXT NOT NULL,
ADD COLUMN     "opening_hours" TEXT NOT NULL;
