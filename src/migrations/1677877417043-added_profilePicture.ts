import { MigrationInterface, QueryRunner } from "typeorm";

export class addedProfilePicture1677877417043 implements MigrationInterface {
    name = 'addedProfilePicture1677877417043'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "profilePicture" character varying NOT NULL DEFAULT 'no profile picture'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "profilePicture"`);
    }

}
