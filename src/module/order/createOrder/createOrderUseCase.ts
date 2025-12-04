import { createOrderRepository } from './createOrderRepository';
import { Order } from '../Order';

export class CreateOrderUseCase {
    private orderRepository: createOrderRepository;

    constructor(orderRepository: createOrderRepository) {
        this.orderRepository = orderRepository;
    }

    async execute({
        productIds,
        totalPrice
    }: {
        productIds: number[];
        totalPrice: number;
    }): Promise<void> {
        const order = new Order({ productIds, totalPrice });

        try {
            await this.orderRepository.save(order);
        } catch (error) {
            throw new Error('Erreur lors de la création de la commande');
        }
    }
}
