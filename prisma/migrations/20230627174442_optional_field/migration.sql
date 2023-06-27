-- DropForeignKey
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_agent_id_fkey";

-- AlterTable
ALTER TABLE "tickets" ALTER COLUMN "agent_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "agents"("id") ON DELETE SET NULL ON UPDATE CASCADE;
