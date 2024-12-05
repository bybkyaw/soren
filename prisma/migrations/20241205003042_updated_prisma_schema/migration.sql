/*
  Warnings:

  - You are about to alter the column `price` on the `book` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.

*/
-- AlterTable
ALTER TABLE `book` ADD COLUMN `isBestSelling` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `sales` INTEGER NOT NULL DEFAULT 0,
    MODIFY `price` DOUBLE NOT NULL;
