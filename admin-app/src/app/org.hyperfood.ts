import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.hyperfood{
   export enum PesticideType {
      NATURAL,
      CHEMICAL,
   }
   export enum Status {
      WAITING_FOR_AUDIT,
      AUDITED,
      SHIPPED,
      DELIVERED,
   }
   export class Product extends Asset {
      productId: string;
      waterPh: string;
      seeds: string;
      pesticides: PesticideType[];
      soil: string;
      fertilizer: string[];
      origin: string;
      status: Status;
      producer: Producer;
      audits: Audit[];
   }
   export class Audit extends Asset {
      auditId: string;
      date: Date;
      sucess: boolean;
      notes: string;
      auditor: Auditor;
   }
   export class Producer extends Participant {
      producerId: string;
      firstName: string;
      lastName: string;
      address: string;
   }
   export class Auditor extends Participant {
      auditorId: string;
      firstName: string;
      lastName: string;
      organization: string;
   }
   export class changeProductStatus extends Transaction {
      product: Product;
      newStatus: string;
   }
   export class auditProduct extends Transaction {
      product: Product;
      auditor: Auditor;
   }
// }
