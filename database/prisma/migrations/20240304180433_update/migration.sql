/*
  Warnings:

  - Added the required column `authorId` to the `BlogPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isDraft` to the `BlogPost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BlogPost" ADD COLUMN     "authorId" TEXT NOT NULL,
ADD COLUMN     "isDraft" BOOLEAN NOT NULL;

-- AddForeignKey
ALTER TABLE "BlogPost" ADD CONSTRAINT "BlogPost_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
