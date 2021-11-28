/*
  Warnings:

  - A unique constraint covering the columns `[date]` on the table `Date` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Date_date_key" ON "Date"("date");
