/*
  Warnings:

  - Added the required column `subdomain` to the `domains` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `domains` ADD COLUMN `subdomain` VARCHAR(191) NOT NULL;
