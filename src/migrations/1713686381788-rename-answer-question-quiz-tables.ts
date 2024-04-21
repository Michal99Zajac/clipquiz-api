import { MigrationInterface, QueryRunner } from 'typeorm'

export class RenameAnswerQuestionQuizTables1713686381788 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "quiz" RENAME TO "quizzes";
        ALTER TABLE "question" RENAME TO "questions";
        ALTER TABLE "answer" RENAME TO "answers";
      `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "quizzes" RENAME TO "quiz";
        ALTER TABLE "questions" RENAME TO "question";
        ALTER TABLE "answers" RENAME TO "answer";
      `)
  }
}
