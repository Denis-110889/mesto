export class Section {
    constructor({ items, renderer }, containerSelector ) {
        this._container = document.querySelector(containerSelector);
        this._items = items;
        this._renderer = renderer;
    };

    renderItem(cards){
        cards.forEach(data => {
            this._renderer(data, this._container);
        });
    };

    addItem(element){
        this._container.prepend(element);
    };
};