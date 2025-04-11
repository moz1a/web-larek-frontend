import { IView } from '../../types';
import { EventEmitter } from '../base/events';
import { OrderModel } from './OrderModel';

export class OrderView implements IView {
	protected container: HTMLElement;
	protected buttonOnline: HTMLButtonElement;
	protected buttonHome: HTMLButtonElement;
	protected buttonContinue: HTMLButtonElement;
	protected inputAddress: HTMLInputElement;

	constructor(
		protected template: HTMLTemplateElement,
		protected events: EventEmitter,
		protected orderModel: OrderModel
	) {
		const orderElement = template.content.cloneNode(true) as DocumentFragment;
		this.container = orderElement.querySelector('form') as HTMLFormElement;

		this.buttonOnline = this.container.querySelector(
			'button[name="card"]'
		) as HTMLButtonElement;
		this.buttonHome = this.container.querySelector(
			'button[name="cash"]'
		) as HTMLButtonElement;
		this.buttonContinue = this.container.querySelector(
			'.order__button'
		) as HTMLButtonElement;
		this.inputAddress = this.container.querySelector(
			'.form__input'
		) as HTMLInputElement;

		this.buttonOnline.addEventListener('click', () => {
			this.buttonOnline.classList.add('button_alt-active');
			this.buttonHome.classList.remove('button_alt-active');
			this.orderModel.order.payment = 'Онлайн';
			this._changed();
		});

		this.buttonHome.addEventListener('click', () => {
			this.buttonHome.classList.add('button_alt-active');
			this.buttonOnline.classList.remove('button_alt-active');
			this.orderModel.order.payment = 'При получении';
			this._changed();
		});

		this.inputAddress.addEventListener('input', (e: Event) => {
			const target = e.target as HTMLInputElement;
			this.orderModel.order.address = target.value;
			this._changed();
		});

		this.buttonContinue.addEventListener('click', () => {
			events.emit('order:contacts');
		});
	}

	resetForm() {
		this.inputAddress.value = '';
		this.orderModel.order.address = '';

		this.buttonOnline.classList.remove('button_alt-active');
		this.buttonHome.classList.remove('button_alt-active');
		this.orderModel.order.payment = '';

		this._changed();
	}

	protected _changed() {
		const isAddressFilled = this.orderModel.order.address.trim().length > 0;
		const isPaymentSelected = this.orderModel.order.payment !== '';
		this.buttonContinue.disabled = !(isAddressFilled && isPaymentSelected);
		this.events.emit('order:change', { orderModel: this.orderModel });
	}

	render(): HTMLElement {
		return this.container;
	}
}
