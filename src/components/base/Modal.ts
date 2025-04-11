import { EventEmitter } from './events';

export class Modal {
	protected modalElement: HTMLElement;
	protected closeButton: HTMLButtonElement;
	protected contentElement: HTMLElement;

	constructor(protected events: EventEmitter) {
		this.modalElement = document.getElementById('modal-container');
		this.closeButton = this.modalElement.querySelector('.modal__close');
		this.contentElement = this.modalElement.querySelector('.modal__content');

		this.closeButton.addEventListener('click', () => this.close());
		this.modalElement.addEventListener('click', (e) => {
			if (e.target === this.modalElement) this.close();
		});
	}

	open(content?: HTMLElement) {
		if (content) {
			this.contentElement.innerHTML = '';
			this.contentElement.appendChild(content);
		}
		document.body.style.overflow = 'hidden';
		this.modalElement.classList.add('modal_active');
	}

	close() {
		this.modalElement.classList.remove('modal_active');
		this.events.emit('modal:close');
		document.body.style.overflow = 'scroll';
	}
}
