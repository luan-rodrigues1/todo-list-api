import { MigrationInterface, QueryRunner } from "typeorm";

export class addedIsActived1676934319998 implements MigrationInterface {
    name = 'addedIsActived1676934319998'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "status" TO "isActive"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "isActive" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "isActive" character varying NOT NULL DEFAULT 'active'`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "isActive" TO "status"`);
    }

}
