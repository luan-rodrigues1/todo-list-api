import { MigrationInterface, QueryRunner } from "typeorm";

export class addingFieldForSoftRemove1676911573243 implements MigrationInterface {
    name = 'addingFieldForSoftRemove1676911573243'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "level_importance"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "status" character varying NOT NULL DEFAULT 'active'`);
        await queryRunner.query(`ALTER TABLE "users" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "priority" character varying(10) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "completed" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "completed"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "priority"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "status" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "level_importance" character varying(10) NOT NULL`);
    }

}
