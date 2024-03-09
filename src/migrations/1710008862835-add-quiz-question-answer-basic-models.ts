import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddQuizQuestionAnswerBasicModels1710008862835 implements MigrationInterface {
  name = 'AddQuizQuestionAnswerBasicModels1710008862835'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "quiz" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "description" character varying(1024) NOT NULL, "thumbnail" character varying(2048) NOT NULL, "videoUrl" character varying(2048) NOT NULL, "videoDuration" integer NOT NULL, CONSTRAINT "UQ_91b3636bd5cc303c7409c55088b" UNIQUE ("title"), CONSTRAINT "PK_422d974e7217414e029b3e641d0" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "question" ("id" SERIAL NOT NULL, "content" character varying(2048) NOT NULL, "occurrence" integer NOT NULL, "quizId" integer, CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "answer" ("id" SERIAL NOT NULL, "content" character varying(1024) NOT NULL, "isCorrect" boolean NOT NULL, "questionId" integer, CONSTRAINT "PK_9232db17b63fb1e94f97e5c224f" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `ALTER TABLE "question" ADD CONSTRAINT "FK_4959a4225f25d923111e54c7cd2" FOREIGN KEY ("quizId") REFERENCES "quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    )
    await queryRunner.query(
      `ALTER TABLE "answer" ADD CONSTRAINT "FK_a4013f10cd6924793fbd5f0d637" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "answer" DROP CONSTRAINT "FK_a4013f10cd6924793fbd5f0d637"`)
    await queryRunner.query(
      `ALTER TABLE "question" DROP CONSTRAINT "FK_4959a4225f25d923111e54c7cd2"`,
    )
    await queryRunner.query(`DROP TABLE "answer"`)
    await queryRunner.query(`DROP TABLE "question"`)
    await queryRunner.query(`DROP TABLE "quiz"`)
  }
}
