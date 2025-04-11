import { IView } from '../../types';
import { EventEmitter } from '../base/events';
import { OrderModel } from './OrderModel';

export class ContactsView implements IView {
	protected container: HTMLElement;
	protected inputEmail: HTMLInputElement;
	protected inputPhone: HTMLInputElement;
	protected buttonContinue: HTMLButtonElement;

	constructor(
		protected template: HTMLTemplateElement,
		protected events: EventEmitter,
		protected orderModel: OrderModel
	) {
		const contactsElement = template.content.cloneNode(true) as DocumentFragment;
    this.container = contactsElement.querySelector('.form') as HTMLFormElement;
    this.inputEmail = this.container.querySelector('.form__input[name="email"]') as HTMLInputElement;
    this.inputPhone = this.container.querySelector('.form__input[name="phone"]') as HTMLInputElement;
    this.buttonContinue = this.container.querySelector('button') as HTMLButtonElement;
    
    this.inputEmail.addEventListener('input', (e: Event) => {
      const target = e.target as HTMLInputElement;
      this.orderModel.order.email = target.value;
      this._changed()
    })

    this.inputPhone.addEventListener('input', (e: Event) => {
      const target = e.target as HTMLInputElement;
      this.orderModel.order.phone = target.value;
      this._changed()
    })

    this.buttonContinue.addEventListener('click', (e: Event) => {
      e.preventDefault();
      orderModel.submit();
    })
	}

  protected _changed() {
    const isEmailFilled = this.orderModel.order.email.trim().length > 0;
    const isPhoneFilled = this.orderModel.order.phone.trim().length > 0;
    this.buttonContinue.disabled = !(isEmailFilled && isPhoneFilled);
		this.events.emit('order:change', { orderModel: this.orderModel });
	}

  render(): HTMLElement {
    return this.container;
  }
}
