import { IProduct, IView } from '../../types';
import { EventEmitter } from '../base/events';
import { BasketModel } from '../Basket/BasketModel';

export class CardPreviewView implements IView {
	protected category: HTMLSpanElement;
	protected title: HTMLHeadingElement;
	protected image: HTMLImageElement;
	protected price: HTMLSpanElement;
	protected button: HTMLButtonElement;
	protected description: HTMLParagraphElement;

	protected item: IProduct;

	protected container: HTMLElement;

	constructor(
		protected template: HTMLTemplateElement,
		protected events: EventEmitter,
		protected basketModel: BasketModel
	) {
		const previewElement = template.content.cloneNode(true) as DocumentFragment;
		this.container = previewElement.querySelector('.card_full');

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
		this.description = this.container.querySelector(
			'.card__text'
		) as HTMLParagraphElement;
		this.button = this.container.querySelector(
			'.card__button'
		) as HTMLButtonElement;

		this.button.addEventListener('click', () => {
			this.events.emit('ui:basket-add', { item: this.item });
			this.button.disabled = true;
		});
	}

	isItemInBasket(): boolean {
		return this.basketModel.items.includes(this.item);
	}

	render(data: IProduct): HTMLElement {
		if (data) {
			this.item = data;
			this.title.textContent = data.title;
			this.price.textContent = `${data.price} синапсов`;
			this.category.textContent = data.category;
			this.image.textContent = data.image;
			this.description.textContent = data.description;

			this.button.disabled = !data.price || this.isItemInBasket();
		}
		return this.container;
	}
}
