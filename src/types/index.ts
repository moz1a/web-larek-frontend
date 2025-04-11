//Интерфейс для карточек продуктов каталога
export interface IProduct {
	id: string;
	category: ICategory;
	title: string;
	price: string;
	image: string;
	description: string;
}

//Интерфейс для каталога продуктов
export interface ICatalog {
	items: IProduct[];
}

//Типы категорий
type ICategory =
	| 'софт-скил'
	| 'другое'
	| 'дополнительное'
	| 'кнопка'
	| 'хард-скил';

//Интерфейс для продуктов в корзине
export interface IBasket {
	items: IProduct[];
	add(product: IProduct): void;
	remove(product: IProduct): void;
	getTotal(): number;
}

//Базовый интерфейс для форм
export interface IForm {
	submit(): void;
	validateForm(): void;
	clear(): void;
}

//Интерфейс для деталей заказа
export interface IOrder extends IForm {
	order: Order;
}

export type Order = {
	payment: '' | 'Онлайн' | 'При получении';
	address: string;
	email: string;
	phone: string;
	total: number;
	items: string[];
};

//Интерфейс для слушателя событий
export interface IEventEmmiter {
	emit: (event: string, data: unknown) => void;
}

//Интерфейс для представлений
export interface IView {
	render(data?: object): HTMLElement;
}

export interface IOrderSuccessResponse {
	id: string;
	total: number;
}

export interface IOrderErrorResponse {
	error: string;
}

export type OrderSuccessResponse = { id: string; total: number };
export type OrderErrorResponse = { error: string };
export type OrderResponse = OrderSuccessResponse | OrderErrorResponse;
