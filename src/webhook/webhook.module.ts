import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MercadopagoService } from "src/checkout/mercadopago/mercadopago.service";
import { TebexService } from "src/checkout/tebex/tebex.service";
import { MerchantOrder } from "src/model/postgres/merchant-orders.model";
import { WebhookController } from "./webhook.controller";
import { WebhookService } from "./webhook.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([MerchantOrder])
  ],
  providers: [
    WebhookService,
    MercadopagoService,
    TebexService
  ],
  controllers: [
    WebhookController,
  ],
  exports: [],
})
export class WebhookModule {}