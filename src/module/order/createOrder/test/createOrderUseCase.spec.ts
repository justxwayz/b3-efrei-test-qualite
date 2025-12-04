import { describe, expect, test } from '@jest/globals';
import { CreateOrderUseCase } from '../createOrderUseCase';
import { createOrderRepository } from '../createOrderRepository';
import { Order } from '../../Order';

class CreateOrderRepositoryMock implements createOrderRepository {
    async save(order: Order): Promise<void> {
        return;
    }
}

describe('US-2 : Création de commande', () => {

    test('succès avec commande valide', async () => {
        const repositoryMock = new CreateOrderRepositoryMock();
        const useCase = new CreateOrderUseCase(repositoryMock);

        const orderData = {
            productIds: [1, 2, 3],
            totalPrice: 150
        };

        const order: Order = await useCase.execute(orderData);

        expect(order.productIds).toEqual(orderData.productIds);
        expect(order.totalPrice).toBe(orderData.totalPrice);
        expect(order.status).toBe('PENDING');
        expect(order.createdAt).toBeInstanceOf(Date);
    });

    test('Erreur si plus de 5 produits', async () => {
        const repositoryMock = new CreateOrderRepositoryMock();
        const useCase = new CreateOrderUseCase(repositoryMock);

        const orderData = {
            productIds: [1, 2, 3, 4, 5, 6],
            totalPrice: 300
        };

        await expect(
            useCase.execute(orderData)
        ).rejects.toThrow('Une commande ne peut contenir plus de 5 produits');
    });

    test('Erreur si totalPrice < 2', async () => {
        const repositoryMock = new CreateOrderRepositoryMock();
        const useCase = new CreateOrderUseCase(repositoryMock);

        const orderData = {
            productIds: [1, 2],
            totalPrice: 1
        };

        await expect(
            useCase.execute(orderData)
        ).rejects.toThrow('Le prix total doit être supérieur ou égal à 2€');
    });

    test('Erreur si totalPrice > 500', async () => {
        const repositoryMock = new CreateOrderRepositoryMock();
        const useCase = new CreateOrderUseCase(repositoryMock);

        const orderData = {
            productIds: [1, 2],
            totalPrice: 600
        };

        await expect(
            useCase.execute(orderData)
        ).rejects.toThrow('Le prix total doit être inférieur ou égal à 500€');
    });

});
