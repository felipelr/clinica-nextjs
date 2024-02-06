/*
  Warnings:

  - You are about to drop the column `domain` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `domain`,
    ADD COLUMN `domainId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `domain` (
    `id` VARCHAR(191) NOT NULL,
    `domain` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_domainId_fkey` FOREIGN KEY (`domainId`) REFERENCES `domain`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
