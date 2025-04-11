import { Api } from './components/base/api';
import { EventEmitter } from './components/base/events';
import { BasketItemView } from './components/Basket/BasketItemView';
import { BasketModel } from './components/Basket/BasketModel';
import { BasketView } from './components/Basket/BasketView';
import { CardCatalogView } from './components/Card/CardCatalogView';
import { CardPreviewView } from './components/Card/CardPreviewView';
import { CatalogModel } from './components/Catalog/CatalogModel';
import { CatalogView } from './components/Catalog/CatalogView';
import { Modal } from './components/base/Modal';
import './scss/styles.scss';
import { IProduct, Order } from './types';
import { OrderModel } from './components/Order/OrderModel';
import { OrderView } from './components/Order/OrderView';
import { ContactsView } from './components/Order/ContactsView';
import { OrderSuccessView } from './components/Order/OrderSuccessView';


const events = new EventEmitter();
const cardBasketTemplate = document.getElementById(
	'card-basket'
) as HTMLTemplateElement;
const basketModel = new BasketModel(events);
const basketTemplate = document.getElementById('basket') as HTMLTemplateElement;
const basketView = new BasketView(basketTemplate, events, basketModel);

const catalogView = new CatalogView(document.querySelector('.gallery'));
const catalogModel = new CatalogModel();
const cardCatalogTemplate = document.getElementById(
	'card-catalog'
) as HTMLTemplateElement;

const modal = new Modal(events);
const cardPreviewTemplate = document.getElementById(
	'card-preview'
) as HTMLTemplateElement;

const orderModel = new OrderModel(events, basketModel);
const orderTemplate = document.getElementById('order') as HTMLTemplateElement;
const orderView = new OrderView(orderTemplate, events, orderModel);

const contactsTemplate = document.getElementById('contacts') as HTMLTemplateElement;
const contactsView = new ContactsView(contactsTemplate, events, orderModel)

const sucessTemplate = document.getElementById('success') as HTMLTemplateElement;
const sucessView = new OrderSuccessView(sucessTemplate, events, orderModel);

export const api = new Api('https://larek-api.nomoreparties.co/api/weblarek');

api
	.get('/product/')
	.then((response: { items: any[] }) => {
		const items = response.items;
		catalogModel.setItems(items as IProduct[]);
		events.emit('catalog:loaded');
	})
	.catch((err) => console.log(err));

//console.log(catalogModel.getItems());

function renderCatalog(items: IProduct[]) {
	catalogView.render({
		items: items.map((product) => {
			const itemView = new CardCatalogView(cardCatalogTemplate, events);
			return itemView.render(catalogModel.getItem(product.id));
		}),
	});
}

function renderBasket(items: IProduct[]): HTMLElement {
	return basketView.render({
		items: items.map((product, index) => {
			const itemView = new BasketItemView(cardBasketTemplate, events);
			return itemView.render({
				...product,
				index: index + 1,
			});
		}),
	});
}

events.on('catalog:loaded', () => {
	renderCatalog(catalogModel.getItems());
});

events.on('card:select', (product: IProduct) => {
	const previewTemplate = new CardPreviewView(
		cardPreviewTemplate,
		events,
		basketModel
	);
	modal.open(previewTemplate.render(catalogModel.getItem(product.id)));
});

events.on('basket:open', () => {
	modal.open(renderBasket(basketModel.items));
});

events.on('basket:change', (event: { items: IProduct[] }) => {
	renderBasket(event.items);
});

events.on('basket:buy', () => {
	modal.open(orderView.render())
})

events.on('order:contacts', () => {
	modal.open(contactsView.render())
})

events.on('order:success', (response: any) => {
	orderModel.clear();
	basketModel.clear();
	modal.open(sucessView.render(response))
})

events.on('order:change', () => {
	orderView.render();
	contactsView.render();
});

events.on('ui:basket-add', (event: { item: IProduct }) => {
	//console.log(`Корзина изменена, добавлен продукт ${event.item.id}`);
	basketModel.add(event.item);
});

events.on('ui:basket-remove', (event: { item: IProduct }) => {
	//console.log(`Корзина изменена, удалён продукт ${event.item.id}`);
	basketModel.remove(event.item);
});

events.on('order:submit', (event: {order: Order}) => {
	api
	.post('/order', event.order)
	.then((response: { data: any }) => {
		events.emit('order:success', { response });
		console.log(response)
	})
	.catch((err) => console.log(err));
});

events.on('order:close', () => {
	modal.close()
})

