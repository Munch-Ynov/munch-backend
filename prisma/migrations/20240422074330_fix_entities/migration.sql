-- DropForeignKey
ALTER TABLE "RestaurateurProfile" DROP CONSTRAINT "RestaurateurProfile_restaurantId_fkey";

-- AlterTable
ALTER TABLE "Auth" ALTER COLUMN "role" DROP DEFAULT;

-- AlterTable
ALTER TABLE "RestaurateurProfile" ALTER COLUMN "restaurantId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "RestaurateurProfile" ADD CONSTRAINT "RestaurateurProfile_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
