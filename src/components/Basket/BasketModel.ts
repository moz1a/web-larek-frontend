import { IBasket, IEventEmmiter, IProduct } from '../../types';

export class BasketModel implements IBasket {
	constructor(protected events: IEventEmmiter) {}

	items: IProduct[] = [];

	add(product: IProduct): void {
		if (product && !this.items.find((p) => p.id === product.id)) {
			this.items.push(product);
			this._changed();
		}
	}

	remove(product: IProduct): void {
		if (product) {
			this.items = this.items.filter((p) => p.id !== product.id);
			this._changed();
		}
	}

	getTotal(): number {
		return this.items.reduce((acc, current) => {
			const priceString =
				typeof current.price === 'string'
					? current.price
					: String(current.price);
			const price = parseInt(priceString.match(/\d+/)?.[0] || '0', 10);
			return acc + price;
		}, 0);
	}

	clear(): void {
		this.items = [];
		this._changed();
	}

	protected _changed() {
		this.events.emit('basket:change', { items: this.items });
	}
}
