import { IView } from '../../types';
import { EventEmitter } from '../base/events';
import { OrderModel } from './OrderModel';

export class OrderSuccessView implements IView {
	protected container: HTMLElement;
	protected price: HTMLSpanElement;
  protected buttonClose: HTMLButtonElement;

	constructor(
		protected template: HTMLTemplateElement,
		protected events: EventEmitter,
		protected orderModel: OrderModel
	) {
		const successElement = template.content.cloneNode(true) as DocumentFragment;
    this.container = successElement.querySelector('.order-success') as HTMLDivElement;
    this.price = this.container.querySelector('.order-success__description') as HTMLSpanElement;
    this.buttonClose = this.container.querySelector('.order-success__close') as HTMLButtonElement;


    this.buttonClose.addEventListener('click', () => {
      events.emit('order:close')
    })
	}

  render(data: { response: any }): HTMLElement {
    this.price.textContent = `Списано ${data.response.total} синапсов`
    return this.container;
  }
}
