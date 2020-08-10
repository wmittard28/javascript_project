class ExpensesAdapter {

    //create and initialize a url to fetch expenses instances.
    constructor() {
        this.baseUrl = 'http://localhost:9000/api/expenses'
    }

    //fetch expenses  using "get" (and items) from the database.
    getExpenses() {
        return fetch(this.baseUrl).then(res => res.json())
    }

    //send new expenses  to the database.
    createExpense(value) {
        const expense = {
            name: value,
        }

        return fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ expense }),
        }).then(res => res.json())
    }

    //modify a expense and send it to the database.
    updateStore(value, id) {
        const expense = {
            name: value,
        }

        return fetch(`${this.baseUrl}/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'accepts': 'application/json',
            },
            body: JSON.stringify({ expense }),
        }).then(res => res.json())
    }
}
