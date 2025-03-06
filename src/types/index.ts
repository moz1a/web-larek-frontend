//Интерфейс для карточек продуктов каталога
export interface IProduct {
	id: string; //уникальный идентификатор
	category: string; //категория
	name: string; //название
	price: string; //цена
	image: string; //изображение
	description: string; //описание
}

//Интерфейс для каталога продуктов
export interface ICatalog {
	items: IProduct[]; //список продуктов в каталоге
}

//Интерфейс для продуктов в корзине
export interface ICart {
	items: IProduct[]; //список продуктов в корзине
	add(product: IProduct): void; //добавить продукт
	remove(product: IProduct): void; //удалить продукт
	getTotal(): number; //получить общую стоимость
}

//Интерфейс для деталей заказа
export interface IOrder {
	payment: 'Онлайн' | 'При получении'; //способ оплаты
	address: string; //адрес
}

//Интерфейс для персональных данных
export interface IPersonalData {
	email: string; //электронная почта
	phone: string; //телефон
}

//Интерфейс для слушателя событий
export interface IEventEmmiter {
	emit: (event: string, data: unknown) => void; //инициировать событие
}

//Интерфейс для представлений
export interface IView {
	render(data?: object): HTMLElement; //устанавливаем данные, возвращаем контейнер
}
