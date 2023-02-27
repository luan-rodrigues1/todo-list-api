import { MigrationInterface, QueryRunner } from "typeorm";

export class standardizationOfColumnNames1676911833042 implements MigrationInterface {
    name = 'standardizationOfColumnNames1676911833042'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" RENAME COLUMN "created_at" TO "createdAt"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" RENAME COLUMN "createdAt" TO "created_at"`);
    }

}
