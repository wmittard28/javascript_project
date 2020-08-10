class ItemsAdapter {

    //create and initialize a url to fetch items instances.
    constructor() {
        this.baseUrl = 'http://localhost:9000/api/items'
    }

    //a "get" fetch request to grab items from the database.
    getItems() {
        return fetch(this.baseUrl).then(res => res.json())
    }

    //send a new item and its properties to the database.
    createItem(itemName, itemPrice, itemQuantity, itemCategory, expenseId) {

        const item = {
            name: itemName,
            price: itemPrice,
            quantity: itemQuantity,
            category: itemCategory,
            expense_id: expenseId
        }

        return fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ item }),
        }).then(res => res.json())
    }

    //modify an item and its properties and send them to the database.
    updateItem(newName, newPrice, newQuantity, newCategory, id) {

        const item = {
            name: newName,
            price: newPrice,
            quantity: newQuantity,
            category: newCategory,
            id: id
        }

        return fetch(`${this.baseUrl}/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'accepts': 'application/json',
            },
            body: JSON.stringify({ item }),
        }).then(res => res.json())
    }
}
