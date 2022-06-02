class Product {
    constructor(name, code, category, price, unitsInStock) {
        this.name = name;
        this.code = code;
        this.category = category;
        this.price = price;
        this.unitsInStock = unitsInStock;
    }

    show() {
        console.log(`${this.name} ${this.code} ${this.category} ${this.price} ${this.unitsInStock}`);
    }
} 