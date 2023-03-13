import { MigrationInterface, QueryRunner } from "typeorm";

export class newAdjustmentProfilePicture1678039641651 implements MigrationInterface {
    name = 'newAdjustmentProfilePicture1678039641651'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "profilePicture" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "profilePicture" SET NOT NULL`);
    }

}
