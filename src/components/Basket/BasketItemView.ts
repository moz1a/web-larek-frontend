import { IProduct, IView } from '../../types';
import { EventEmitter } from '../base/events';

export class BasketItemView implements IView {
	protected title: HTMLSpanElement;
	protected price: HTMLSpanElement;
	protected removeButton: HTMLButtonElement;
	protected index: HTMLSpanElement;
	protected item: IProduct;

	protected container: HTMLElement;

	constructor(
		protected template: HTMLTemplateElement,
		protected events: EventEmitter
	) {
		const itemElement = template.content.cloneNode(true) as DocumentFragment;
		this.container = itemElement.querySelector('.basket__item');

		this.title = this.container.querySelector(
			'.card__title'
		) as HTMLSpanElement;
		this.price = this.container.querySelector(
			'.card__price'
		) as HTMLSpanElement;
		this.removeButton = this.container.querySelector(
			'.basket__item-delete'
		) as HTMLButtonElement;
		this.index = this.container.querySelector(
			'.basket__item-index'
		) as HTMLSpanElement;

		this.removeButton.addEventListener('click', () => {
			this.events.emit('ui:basket-remove', { item: this.item });
		});
	}

	render(data: IProduct & { index: number }): HTMLElement {
		if (data) {
			this.item = data;
			this.title.textContent = data.title;
			this.price.textContent = data.price;
			this.index.textContent = data.index.toString();
		}
		return this.container;
	}
}
