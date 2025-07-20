/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `USER` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `USER` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `USER` ADD COLUMN `username` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `USER_username_key` ON `USER`(`username`);
