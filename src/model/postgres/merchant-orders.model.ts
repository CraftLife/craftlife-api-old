import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'merchant_orders',
  schema: 'site',
})
export class MerchantOrder {

  @PrimaryColumn()
  id: number;

  @Column()
  status: string;

  @Column()
  preference_id: string;

  @Column()
  date_created: string;

  @Column()
  last_updated: string;

  @Column()
  total_amount: number;

  @Column()
  paid_amount: number;

  @Column()
  refunded_amount: number;

  @Column()
  cancelled: boolean;

  @Column()
  order_status: string;

  @Column()
  delivered?: boolean;

  itens: any[];

  additional_info: string;
}
