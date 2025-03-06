//Интерфейс для карточек продуктов каталога
export interface IProduct {
	id: string; //уникальный идентификатор
	category: ICategory; //категория
	name: string; //название
	price: string; //цена
	image: string; //изображение
	description: string; //описание
}

//Интерфейс для каталога продуктов
export interface ICatalog {
	items: IProduct[]; //список продуктов в каталоге
}

//Типы категорий
type ICategory =  'софт-скил' | 'другое' | 'дополнительное' | 'кнопка' | 'хард-скил';

//Интерфейс для продуктов в корзине
export interface ICart {
	items: IProduct[]; //список продуктов в корзине
	add(product: IProduct): void; //добавить продукт
	remove(product: IProduct): void; //удалить продукт
	getTotal(): number; //получить общую стоимость
  clear(): void; //очищает корзину 
}

//Базовый интерфейс для форм
export interface IForm {
  submit(): void; //отправить форму
  validateForm(): void; //валидация форм
  clear(): void; //очищает формы
}

//Интерфейс для деталей заказа
export interface IOrder extends IForm {
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
