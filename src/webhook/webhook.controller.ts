import { Controller, Post, Query, Request, Response } from "@nestjs/common";

import { WebhookService } from "./webhook.service";

@Controller('webhook')
export class WebhookController {
  
  constructor(
    private readonly webhookService: WebhookService,
  ) {}

  @Post('mercadopago')
  async mercadopagoWebhook(@Response() response, @Query() query) {
    switch(query.topic) {
      case 'payment':
        // return await this.webhookService.handlePayment(query.id); //TODO
      case 'merchant_order':
        await this.webhookService.handleMerchantOrder(query.id);
        return response.status(200).send(); 
      default:
        response.status(400).send('Invalid topic');
    }
  }

}
