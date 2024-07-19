/*
  Warnings:

  - The primary key for the `Order_Report` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `orderId` on the `Order_Report` table. All the data in the column will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[reportId]` on the table `Order_Report` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `Order_Report` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Order_Report" DROP CONSTRAINT "Order_Report_orderId_fkey";

-- AlterTable
ALTER TABLE "Order_Report" DROP CONSTRAINT "Order_Report_pkey",
DROP COLUMN "orderId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Order_Report_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Order";

-- CreateIndex
CREATE UNIQUE INDEX "Order_Report_reportId_key" ON "Order_Report"("reportId");
