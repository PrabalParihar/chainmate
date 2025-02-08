/*
  Warnings:

  - You are about to drop the column `cdpWalletData` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `cdpWalletId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `ethAddress` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[seed]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_cdpWalletId_key";

-- DropIndex
DROP INDEX "User_ethAddress_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "cdpWalletData",
DROP COLUMN "cdpWalletId",
DROP COLUMN "ethAddress",
ADD COLUMN     "networkId" TEXT,
ADD COLUMN     "seed" TEXT,
ADD COLUMN     "walletId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_seed_key" ON "User"("seed");
