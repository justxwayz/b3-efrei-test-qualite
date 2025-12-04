import { Order } from '../Order';

export interface createOrderRepository {
    save(order: Order): Promise<void>;
}
