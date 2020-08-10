class Expense {
     //create and initialize a Expense object and its properties.
     constructor(expenseJSON) {
        this.id = expenseJSON.id
        this.name = expenseJSON.name
        this.items = expenseJSON.items.map(io => new Item(io))
    }

    //create the html for displaying expenses and items in a card class and dynamically create table for items.
    html(items) {
        return (`
            <ul class='card'>
                <li class='highlight expense-name' data-id=${this.id}>
                    ${this.name}
                </li>
                <table>
                    <tr>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Category</th>
                    </tr>
                    <div class="items-container">
                        ${items}
                    </div>

                </table>
                <button id="add-item-button">Add Item</button>
                <form class='item-card' id="new-item-form" data-id=${this.id}>
                <label>Item name: </label>
                <input type="text" id="new-item-name" placeholder="Item name">
                <br>
                <label>Item cost: </label>
                <input type="text" id="new-item-price" placeholder="Item cost" />
                <br>
                <label>Item quantity: </label>
                <input type="text" id="new-item-quantity" placeholder="Item quantity" />
                <br>
                <label>Item category: </label>
                <input type="text" id="new-item-category" placeholder="Item category" />
                <br>
                <input type="submit" id="item-submit" value="Submit" />
            </form>
            </ul>
        `)
    }


}
