import { Injectable, Logger } from "@nestjs/common";
import Axios from 'axios';
import { MerchantOrder } from "src/model/postgres/merchant-orders.model";

@Injectable()
export class TebexService {

  private readonly logger = new Logger(TebexService.name);

  async deliveryItens(merchantOrder: MerchantOrder): Promise<void> {
    const packages = merchantOrder.items.map(item => {
      return {
        id: +item.id,
        options: {},
      };
    });
    await Axios.post('https://plugin.tebex.io/payments', {
      packages,
      price: +merchantOrder.paid_amount,
      ign: merchantOrder.additional_info,
      note: `Pagamento via site. MP: ${merchantOrder.id}`,
    }, {
      headers: {
        'X-Tebex-Secret': process.env.TEBEX_SECRET,
      },
    })
    this.logger.log(`Tebex: itens delivered for order ${merchantOrder.id}`);
  }

  async getPackages(): Promise<any> {
    return (await Axios.get('https://plugin.tebex.io/listing', {
      headers: {
        'X-Tebex-Secret': process.env.TEBEX_SECRET,
      },
    })).data;
  }

  async getPackage(id: number): Promise<any> {
    return (await Axios.get('https://plugin.tebex.io/package/' + id, {
      headers: {
        'X-Tebex-Secret': process.env.TEBEX_SECRET,
      },
    })).data;
  }

  async getPlayerLookup(username: string): Promise<any> {
    return (await Axios.get('https://plugin.tebex.io/user/' + username, {
      headers: {
        'X-Tebex-Secret': process.env.TEBEX_SECRET,
      },
    })).data;
  }

  async getPayment(id: string) {
    return (await Axios.get('https://plugin.tebex.io/payments/' + id, {
      headers: {
        'X-Tebex-Secret': process.env.TEBEX_SECRET,
      },
    })).data;
  }

} 
