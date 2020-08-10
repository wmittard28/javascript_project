class Expenses {

     //create and initialize obects related to Expenses class.
     constructor() {
        this.expenses = []
        this.items = []
        this.expensesAdapter = new ExpensesAdapter()
        this.itemsAdapter = new ItemsAdapter()
        this.expenseBindingsAndEventListeners()
        this.fetchAndLoadExpenses()
    }

    //bind html elements related to Expense and sets eventListeners for user interactions.
    expenseBindingsAndEventListeners() {
        this.expensesContainer = document.getElementById('expenses-container')
        this.body = document.querySelector('body')
        this.newExpenseName = document.getElementById('new-expense-name')
        this.expenseForm = document.getElementById('new-expense-form')

        this.expenseForm.addEventListener('submit', this.createExpense.bind(this))
        this.expensesContainer.addEventListener('dblclick', this.handleExpenseOrItemClick.bind(this))
        this.body.addEventListener('blur', this.updateExpenseOrItem.bind(this), true)
    }

    //call on the createExpense() function in ExpensesAdapter to create a new expense name.
    createExpense(e) {
        e.preventDefault()
        const value = this.newExpenseName.value

        this.expensesAdapter.createExpense(value).then(expense => {
            this.expenses.push(new Expense(expense))
            this.newExpenseName.value = ''
            this.renderExpense()
        })
    }


    //call on toggleExpense() when expense is double clicked.
    handleExpenseOrItemClick(e) {
        this.editExpenseOrItem(e)
    }

    //set the expense name element to become editable when clicked on.
    editExpenseOrItem(e) {
        if (e.target.classList.contains('expense-name')) {
            e.preventDefault()
            const li = e.target
            li.contentEditable = true
            li.focus()
            li.classList.add('editable')
        }

        if (e.target.classList.contains('item-name') || e.target.classList.contains('item-price') || e.target.classList.contains('item-quantity')) {
            e.preventDefault()
            const li = e.target
            li.contentEditable = true
            li.focus()
            li.classList.add('editable')
        }
    }

    //if expense-name element is clicked, send the updated value to the database when the user clicks away on another element.
    updateExpenseOrItem(e) {
        if (e.target.classList.contains('expense-name')) {
            const li = e.target
            li.contentEditable = false
            li.classList.remove('editable')
            const newValue = li.innerHTML
            const id = li.dataset.id
            this.expensesAdapter.updateExpense(newValue, id)
        }

        if (e.target.classList.contains('item-name')) {
            const td = e.target
            const newName = td.innerHTML
            const samePrice = td.value
            const sameQuantity = td.value
            const sameCategory = td.value

            td.contentEditable = false
            td.classList.remove('editable')

            const id = td.dataset.id
            this.itemsAdapter.updateItem(newName, samePrice, sameQuantity, sameCategory, id)
        }


        if (e.target.classList.contains('item-price')) {
            const td = e.target
            const sameName = td.value
            const newPrice = td.innerHTML
            const sameQuantity = td.value
            const sameCategory = td.value
            console.log(newPrice)

            td.contentEditable = false
            td.classList.remove('editable')

            const id = td.dataset.id
            this.itemsAdapter.updateItem(sameName, newPrice, sameQuantity, sameCategory, id)
        }


        if (e.target.classList.contains('item-quantity')) {
            const td = e.target
            const sameName = td.value
            const samePrice = td.value
            const newQuantity = td.innerHTML
            const sameCategory = td.value

            td.contentEditable = false
            td.classList.remove('editable')

            const id = td.dataset.id
            this.itemsAdapter.updateItem(sameName, samePrice, newQuantity, sameCategory, id)
        }


        if (e.target.classList.contains('item-quantity')) {
            const td = e.target
            const sameName = td.value
            const samePrice = td.value
            const sameQuantity = td.value
            const newCategory = td.innerHTML

            td.contentEditable = false
            td.classList.remove('editable')

            const id = td.dataset.id
            this.itemsAdapter.updateItem(sameName, samePrice, sameQuantity, newCategory, id)
        }
    }

    //grab all the expenses and related items from the database. call on renderExpense().
    fetchAndLoadExpenses() {
        this.expensesAdapter
            .getExpenses()
            .then(expenses => {
                expenses.forEach(expense => this.expenses.push(new Expense(expense)))
            })
            .then(() => {
                this.renderExpense()
            })
    }

    //display the expenses and items in a format defined in expense.js and item.js.
    //call on invokeItemListeners when the dynamically created elements are set.
    renderExpense() {
        const expensesContainer = document.getElementById('expenses-container')

        const expenseHTML = this.expenses.map(expense => {
            const itemHTML = expense.items.map(i => i.tableHTML).join('')

            return expense.html(itemHTML)
        }).join('')
        expensesContainer.innerHTML = expenseHTML

        this.invokeItemListeners()
    }

    //bind new dynamically created elements and set event listeners for new elements.
    invokeItemListeners() {
        this.addItemButton = document.querySelectorAll('#add-item-button')
        this.newItemForms = document.querySelectorAll('#new-item-form')

        for (let form of this.newItemForms) {
            form.addEventListener('submit', this.createItems.bind(this))
        }

        if (this.addItemButton) {
            this.addItemButton.forEach(button => {
                button.addEventListener('click', this.renderNewItemForm.bind(this))
            })
        }
    }

    //display new-item-form when Edit Item button is clicked.
    renderNewItemForm(e) {
        const form = e.target.parentElement.querySelector('form')
        form.style.display = 'block'
    }

    //create new item in new-item-form and send to the database.
    createItems(e) {
        e.preventDefault()

        const loader = document.createElement('div')
        loader.className = 'loader'
        e.target.parentElement.appendChild(loader)

        const [name, price, quantity, category, _] = e.target.querySelectorAll('input')
        const itemName = name.value
        const itemPrice = price.value
        const itemQuantity = quantity.value
        const itemCategory = category.value
        const expenseId = e.target.dataset.id

        this.itemsAdapter.createItem(itemName, itemPrice, itemQuantity, itemCategory, expenseId).then(item => {
            const expense = this.expenses.find(s => s.id == expenseId)
            e.target.parentElement.removeChild(loader)
            expense.items.push(new Item(item))
            e.target.hidden = true
            this.renderExpense()
        })
    }



}
