import { IOrder, Order } from "../../types";
import { EventEmitter } from "../base/events";
import { BasketModel } from "../Basket/BasketModel";

export class OrderModel implements IOrder {
  order: Order;
  protected basketModel: BasketModel;

  protected events: EventEmitter;
  constructor(events: EventEmitter, basketModel: BasketModel){
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

    if(this.order.payment && this.order.address && this.order.email && this.order.phone){
      this.events.emit('order:submit', { order: this.order })
    } else {
      console.log('Не все поля заполнены')
    }
  }

  validateForm(): void {
    throw new Error("Method not implemented.");
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
    this.events.emit('order:change', { orderModel: this });
  }
}
