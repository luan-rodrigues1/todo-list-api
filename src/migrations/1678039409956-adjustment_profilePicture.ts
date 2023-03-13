import { MigrationInterface, QueryRunner } from "typeorm";

export class adjustmentProfilePicture1678039409956 implements MigrationInterface {
    name = 'adjustmentProfilePicture1678039409956'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "profilePicture" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "profilePicture" SET DEFAULT 'no profile picture'`);
    }

}
