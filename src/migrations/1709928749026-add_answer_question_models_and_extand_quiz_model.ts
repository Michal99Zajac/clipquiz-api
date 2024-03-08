import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddAnswerQuestionModelsAndExtandQuizModel1709928749026 implements MigrationInterface {
  name = 'AddAnswerQuestionModelsAndExtandQuizModel1709928749026'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "question" ("id" SERIAL NOT NULL, "content" character varying(2048) NOT NULL, "occurrence" integer NOT NULL, "quizId" integer, CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "answer" ("id" SERIAL NOT NULL, "content" character varying(1024) NOT NULL, "isCorrect" boolean NOT NULL, "questionId" integer, CONSTRAINT "PK_9232db17b63fb1e94f97e5c224f" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `ALTER TABLE "quiz" ADD "description" character varying(1024) NOT NULL DEFAULT ''`,
    )
    await queryRunner.query(`ALTER TABLE "quiz" ALTER COLUMN "description" DROP DEFAULT`)
    await queryRunner.query(
      `ALTER TABLE "quiz" ADD "thumbnail" character varying(2048) NOT NULL DEFAULT ''`,
    )
    await queryRunner.query(`ALTER TABLE "quiz" ALTER COLUMN "thumbnail" DROP DEFAULT`)
    await queryRunner.query(
      `ALTER TABLE "quiz" ADD "videoUrl" character varying(2048) NOT NULL DEFAULT ''`,
    )
    await queryRunner.query(`ALTER TABLE "quiz" ALTER COLUMN "videoUrl" DROP DEFAULT`)
    await queryRunner.query(`ALTER TABLE "quiz" ADD "videoDuration" integer NOT NULL DEFAULT 0`)
    await queryRunner.query(`ALTER TABLE "quiz" ALTER COLUMN "videoDuration" DROP DEFAULT`)
    await queryRunner.query(
      `ALTER TABLE "quiz" ADD CONSTRAINT "UQ_91b3636bd5cc303c7409c55088b" UNIQUE ("title")`,
    )
    await queryRunner.query(
      `ALTER TABLE "question" ADD CONSTRAINT "FK_4959a4225f25d923111e54c7cd2" FOREIGN KEY ("quizId") REFERENCES "quiz"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "answer" ADD CONSTRAINT "FK_a4013f10cd6924793fbd5f0d637" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "answer" DROP CONSTRAINT "FK_a4013f10cd6924793fbd5f0d637"`)
    await queryRunner.query(
      `ALTER TABLE "question" DROP CONSTRAINT "FK_4959a4225f25d923111e54c7cd2"`,
    )
    await queryRunner.query(`ALTER TABLE "quiz" DROP CONSTRAINT "UQ_91b3636bd5cc303c7409c55088b"`)
    await queryRunner.query(`ALTER TABLE "quiz" DROP COLUMN "videoDuration"`)
    await queryRunner.query(`ALTER TABLE "quiz" DROP COLUMN "videoUrl"`)
    await queryRunner.query(`ALTER TABLE "quiz" DROP COLUMN "thumbnail"`)
    await queryRunner.query(`ALTER TABLE "quiz" DROP COLUMN "description"`)
    await queryRunner.query(`DROP TABLE "answer"`)
    await queryRunner.query(`DROP TABLE "question"`)
  }
}
