import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MercadopagoService } from "src/checkout/mercadopago/mercadopago.service";
import { TebexService } from "src/checkout/tebex/tebex.service";
import { MerchantOrder } from "src/model/postgres/merchant-orders.model";
import { Repository } from "typeorm";

@Injectable()
export class WebhookService {

  private readonly logger = new Logger(WebhookService.name);

  constructor(
    @InjectRepository(MerchantOrder)
    private readonly merchantOrderRepository: Repository<MerchantOrder>,
    private readonly mercadopagoService: MercadopagoService,
    private readonly tebexService: TebexService,
  ) {}

  async handleMerchantOrder(id: number) {
    let merchantOrder: MerchantOrder = await this.merchantOrderRepository.findOne(id);

    if (merchantOrder) {
      await this.merchantOrderRepository.update(id, merchantOrder);
    } else {
      merchantOrder = await this.mercadopagoService.getMerchantOrder(id);
      await this.merchantOrderRepository.save(merchantOrder);
      this.logger.log(`Merchant order ${id} created`);
    }
    if (merchantOrder.order_status === 'paid' && !merchantOrder.delivered) {
      this.logger.log(`Merchant order ${id} paid`);
      merchantOrder = await this.mercadopagoService.getMerchantOrder(id);
      await this.tebexService.deliveryItens(merchantOrder);
      merchantOrder.delivered = true;
      await this.merchantOrderRepository.update(id, merchantOrder);
    }
    return merchantOrder;
  }
}