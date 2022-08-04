import { BadRequestException, Injectable } from "@nestjs/common";
import { MercadopagoResponse } from "./mercadopago.interface";
import * as mercadopago from 'mercadopago';
import { MerchantOrder } from "src/model/postgres/merchant-orders.model";

@Injectable()
export class MercadopagoService {
    
  constructor() {
    mercadopago.configure({
      access_token: process.env.MERCADOPAGO_SECRET,
    })
  }

  async createPreference(preference: Object): Promise<number> {
    let response: MercadopagoResponse; 
    
    try {
      response = (await mercadopago.preferences.create(preference)).body
    } catch {
      throw new BadRequestException('Ocorreu um erro ao criar a sua preferência');
    }

    console.log(response)
    return response.id;
  }

  async getMerchantOrder(merchantOrderId: number): Promise<MerchantOrder> {
    return (await mercadopago.merchant_orders.findById(merchantOrderId)).body;
  }

  // async getPayment(id: number): Promise<Payment>{
  //   const bodyResponse = (await mercadopago.payment.get(id)).body;
  //   return {
  //     id: bodyResponse.id,
  //     username: bodyResponse.metadata.username,
  //     transaction_amount: bodyResponse.transaction_amount,
  //     package_id: bodyResponse.metadata.product_id,
  //     status: bodyResponse.status,
  //     payment_method_id: bodyResponse.payment_method_id,
  //     installments: bodyResponse.installments,
  //     external_reference: bodyResponse.external_reference,
  //   };
  // }
  
}