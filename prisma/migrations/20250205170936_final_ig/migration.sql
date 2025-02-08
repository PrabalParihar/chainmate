/*
  Warnings:

  - You are about to drop the column `walletData` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "walletData",
ADD COLUMN     "cdpWalletData" TEXT;
