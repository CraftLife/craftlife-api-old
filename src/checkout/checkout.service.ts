import { Injectable, Logger } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional-cls-hooked';

import { ProductService } from '../product/product.service';
import { MercadopagoService } from './mercadopago/mercadopago.service';

@Injectable()
export class CheckoutService {

  private readonly logger = new Logger(CheckoutService.name);

  constructor(
    private readonly mercadopagoService: MercadopagoService,
    private readonly productService: ProductService,
  ) {}

  @Transactional()
  async checkoutPreference(products: Array<number>, nickname: String): Promise<any> {
    let items: Array<any>;
    
    items = await Promise.all(products.map(async productId => {
      const product = await this.productService.getProduct(productId);
      return {
        id: product.id,
        title: product.name + ' - ' + nickname,
        unit_price: +product.price,
        quantity: 1,
      };
    }));
    
    return await this.mercadopagoService.createPreference({ items, notification_url: "https://craftlife-api.herokuapp.com/webhook/mercadopago", additional_info: nickname });
  };
}
