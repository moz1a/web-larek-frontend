import { IOrder, Order } from '../../types';
import { EventEmitter } from '../base/events';
import { BasketModel } from '../Basket/BasketModel';

export class OrderModel implements IOrder {
	order: Order;
	protected basketModel: BasketModel;

	protected events: EventEmitter;
	constructor(events: EventEmitter, basketModel: BasketModel) {
		this.order = {
			address: '',
			payment: '',
			email: '',
			phone: '',
			total: 0,
			items: [],
		};
		this.events = events;
		this.basketModel = basketModel;
	}

	submit(): void {
		this.order.total = this.basketModel.getTotal();
		this.order.items = this.basketModel.items.map((item) => item.id);

		if (this.validateForm()) {
			this.events.emit('order:submit', { order: this.order });
		}
	}

	validateForm(): boolean {
		const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
			this.order.email.trim()
		);
		const phoneValid = /^\+?\d{10,}$/.test(this.order.phone.trim());
		const allFieldsFilled =
			this.order.payment &&
			this.order.address &&
			this.order.email &&
			this.order.phone;

		return allFieldsFilled && emailValid && phoneValid;
	}

	clear(): void {
		this.order = {
			address: '',
			payment: '',
			email: '',
			phone: '',
			total: 0,
			items: [],
		};
		this.events.emit('order:reset');
	}
}
