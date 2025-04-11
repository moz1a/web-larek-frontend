import { IView } from '../../types';
import { EventEmitter } from '../base/events';
import { BasketModel } from './BasketModel';

export class BasketView implements IView {
	protected container: HTMLElement;
	protected price: HTMLSpanElement;
	protected basketBuyButton: HTMLButtonElement;
	protected basketHeaderButton: HTMLButtonElement;
	protected basketHeaderIndex: HTMLSpanElement;

	constructor(
		protected template: HTMLTemplateElement,
		protected events: EventEmitter,
		protected basketModel: BasketModel
	) {
		const basketElement = template.content.cloneNode(true) as DocumentFragment;
		this.container = basketElement.querySelector('.basket') as HTMLElement;
		this.basketBuyButton = this.container.querySelector(
			'.basket__button'
		) as HTMLButtonElement;
		this.price = this.container.querySelector(
			'.basket__price'
		) as HTMLSpanElement;
		this.basketHeaderIndex = document.querySelector(
			'.header__basket-counter'
		) as HTMLSpanElement;

		this.basketBuyButton.addEventListener('click', () => {
			this.events.emit('basket:buy');
		});

		this.basketHeaderButton = document.querySelector(
			'.header__basket'
		) as HTMLButtonElement;
		this.basketHeaderButton.addEventListener('click', () => {
			this.events.emit('basket:open');
		});
	}
	render(data: { items: HTMLElement[] }): HTMLElement {
		if (data) {
			const list = this.container.querySelector(
				'.basket__list'
			) as HTMLUListElement;
			if (list) {
				list.replaceChildren(...data.items);
			}
			this.price.textContent = `${this.basketModel
				.getTotal()
				.toString()} синапсов`;
			this.basketHeaderIndex.textContent =
				this.basketModel.items.length.toString();
			this.basketModel.items.length === 0
				? (this.basketBuyButton.disabled = true)
				: (this.basketBuyButton.disabled = false);
		}
		return this.container;
	}
}
