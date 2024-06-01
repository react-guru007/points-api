-- CreateTable
CREATE TABLE "Point" (
    "id" TEXT NOT NULL,
    "event_name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "campaign_id" TEXT NOT NULL,

    CONSTRAINT "Point_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApiKey" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "campaign_name" TEXT NOT NULL,
    "campaign_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ApiKey_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ApiKey_campaign_id_key" ON "ApiKey"("campaign_id");

-- AddForeignKey
ALTER TABLE "Point" ADD CONSTRAINT "Point_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "ApiKey"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
