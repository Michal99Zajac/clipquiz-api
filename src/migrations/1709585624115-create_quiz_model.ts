import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateQuizModel1709585624115 implements MigrationInterface {
  name = 'CreateQuizModel1709585624115'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "quiz" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, CONSTRAINT "PK_422d974e7217414e029b3e641d0" PRIMARY KEY ("id"))`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "quiz"`)
  }
}
