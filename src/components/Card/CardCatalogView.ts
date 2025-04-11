import { IProduct, IView } from '../../types';
import { EventEmitter } from '../base/events';

export class CardCatalogView implements IView {
	protected category: HTMLSpanElement;
	protected title: HTMLHeadingElement;
	protected image: HTMLImageElement;
	protected price: HTMLSpanElement;

	protected item: IProduct;

	protected container: HTMLElement;

	constructor(
		protected template: HTMLTemplateElement,
		protected events: EventEmitter
	) {
		const itemElement = template.content.cloneNode(true) as DocumentFragment;
		this.container = itemElement.querySelector('.gallery__item');

		this.title = this.container.querySelector(
			'.card__title'
		) as HTMLHeadingElement;
		this.price = this.container.querySelector(
			'.card__price'
		) as HTMLSpanElement;
		this.category = this.container.querySelector(
			'.card__category'
		) as HTMLSpanElement;
		this.image = this.container.querySelector(
			'.card__image'
		) as HTMLImageElement;

		this.container.addEventListener('click', () => {
			this.events.emit('card:select', this.item);
		});
	}

	render(data: IProduct): HTMLElement {
		if (data) {
			this.item = data;
			this.title.textContent = data.title;
			this.price.textContent = `${data.price} синапсов`;
			this.category.textContent = data.category;
			this.image.textContent = data.image;
		}
		return this.container;
	}
}
