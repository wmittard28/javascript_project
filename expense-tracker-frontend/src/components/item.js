class Item {

    //create and initialize an Item object and its properties.
    constructor(itemJSON) {
        this.id = itemJSON.id
        this.name = itemJSON.name
        this.price = itemJSON.price
        this.quantity = itemJSON.quantity
        this.category = itemJSON.category
    }


    //define the elements inside the item table html.
    get tableHTML() {
        return (`
            <tr>
                <td class="item-name" data-id="${this.id}" data-type="name"> ${this.name} </td>
                <td class="item-price" data-id="${this.id}" data-type="price">${"$" + this.price.toFixed(2)} </td>
                <td class="item-quantity" data-id="${this.id}" data-type="quantity"> ${this.quantity} </td>
                <td class="item-category" data-id="${this.id}" data-type="category"> ${this.category} </td>
            </tr>
        `)
    }

}
