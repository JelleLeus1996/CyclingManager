import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTeamTableMigration implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'team',
            columns: [
                {
                    name: 'teamId',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'name',
                    type: 'varchar',
                    length: '255',
                    isNullable: false,
                },
                {
                    name: 'country',
                    type: 'varchar',
                    length: '255',
                    isNullable: false,
                },
                {
                    name: 'victories',
                    type: 'int',
                    isNullable: true,
                },
                {
                    name: 'points',
                    type: 'int',
                    isNullable: true,
                },
                {
                    name: 'team_status',
                    type: 'varchar',
                    length: '50',
                    isNullable: false,
                },
                {
                    name: 'abbreviation',
                    type: 'varchar',
                    length: '50',
                    isNullable: false,
                },
                {
                    name: 'director',
                    type: 'varchar',
                    length: '255',
                    isNullable: false,
                },
                {
                    name: 'assistant',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                },
                {
                    name: 'representative',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                },
                {
                    name: 'bike',
                    type: 'varchar',
                    length: '255',
                    isNullable: false,
                },
                {
                    name: 'overhead_cost',
                    type: 'decimal',
                    precision: 10,
                    scale: 2,
                    isNullable: false,
                },
            ],
            uniques: [
                {
                    name: 'idx_team_name_unique',
                    columnNames: ['name'],
                },
            ],
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('team');
    }
}
