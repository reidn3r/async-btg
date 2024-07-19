-- AlterTable
ALTER TABLE "Report" ALTER COLUMN "most_profitable_product" DROP NOT NULL,
ALTER COLUMN "most_profitable_customer" DROP NOT NULL,
ALTER COLUMN "best_seller_product" DROP NOT NULL,
ALTER COLUMN "best_seller_customer" DROP NOT NULL,
ALTER COLUMN "most_expensive_order" DROP NOT NULL;
