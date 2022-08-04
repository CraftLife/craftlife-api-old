import { Body, Controller, Post } from "@nestjs/common";
import { CheckoutService } from "./checkout.service";


@Controller('payments')
export class CheckoutController {

  constructor(
    private checkoutService: CheckoutService,
  ) { }

  @Post('preference')
  async checkoutPreference(@Body() payment: any) {
    const value = await this.checkoutService.checkoutPreference(payment.items, payment.nickname);
    return value;
  }

}
