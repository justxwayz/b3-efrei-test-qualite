import { createOrderRepository } from './createOrderRepository';
import AppDataSource from '../../../config/db.config';
import { Order } from '../Order';

export class CreateOrderTypeOrmRepository implements createOrderRepository {
    async save(order: Order): Promise<void> {
        const typeOrmRepository = AppDataSource.getRepository<Order>(Order);
        await typeOrmRepository.save(order);
    }
}
