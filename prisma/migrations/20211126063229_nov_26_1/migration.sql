/*
  Warnings:

  - You are about to drop the column `date` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Productivity` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Wellness` table. All the data in the column will be lost.
  - Added the required column `dateId` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateId` to the `Note` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateId` to the `Productivity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateId` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateId` to the `Wellness` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "date",
ADD COLUMN     "dateId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Note" DROP COLUMN "date",
ADD COLUMN     "dateId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Productivity" DROP COLUMN "date",
ADD COLUMN     "dateId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "date",
ADD COLUMN     "dateId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Wellness" DROP COLUMN "date",
ADD COLUMN     "dateId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Date" (
    "id" TEXT NOT NULL,
    "date" DATE NOT NULL,

    CONSTRAINT "Date_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_dateId_fkey" FOREIGN KEY ("dateId") REFERENCES "Date"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_dateId_fkey" FOREIGN KEY ("dateId") REFERENCES "Date"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wellness" ADD CONSTRAINT "Wellness_dateId_fkey" FOREIGN KEY ("dateId") REFERENCES "Date"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Productivity" ADD CONSTRAINT "Productivity_dateId_fkey" FOREIGN KEY ("dateId") REFERENCES "Date"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_dateId_fkey" FOREIGN KEY ("dateId") REFERENCES "Date"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
