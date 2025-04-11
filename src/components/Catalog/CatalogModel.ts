import { ICatalog, IProduct } from '../../types';

export class CatalogModel implements ICatalog {
	items: IProduct[] = [];

	setItems(items: IProduct[]): void {
		this.items.push(...items);
	}

	getItems(): IProduct[] {
		return this.items;
	}

	getItem(id: string): IProduct {
		const result: IProduct = this.items.find((item) => item.id === id);
		return result;
	}
}
