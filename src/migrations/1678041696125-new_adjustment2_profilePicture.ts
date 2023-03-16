import { MigrationInterface, QueryRunner } from "typeorm";

export class newAdjustment2ProfilePicture1678041696125 implements MigrationInterface {
    name = 'newAdjustment2ProfilePicture1678041696125'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "profilePicture" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "profilePicture" SET DEFAULT 'no profile picture'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "profilePicture" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "profilePicture" DROP NOT NULL`);
    }

}
