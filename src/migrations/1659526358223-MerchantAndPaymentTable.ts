import {MigrationInterface, QueryRunner} from "typeorm";

export class MerchantAndPaymentTable1659526358223 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            CREATE TABLE merchant_orders(
                id BIGINT PRIMARY KEY,
                status VARCHAR(16),
                preference_id VARCHAR(50),
                date_created TIMESTAMP,
                last_updated TIMESTAMP,
                total_amount NUMERIC(5,2),
                paid_amount NUMERIC(5,2),
                refunded_amount NUMERIC(5,2),
                cancelled BOOLEAN,
                order_status VARCHAR(16),
                delivered BOOLEAN DEFAULT FALSE
            );
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            DROP TABLE merchant_orders;
        `)
    }

}
