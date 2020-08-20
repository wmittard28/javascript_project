# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


Item.destroy_all
Expense.destroy_all

expenses = Expense.create!([{ name: 'Dicks Sporting Goods' }, { name: 'Panera Bread' }, { name: 'PSU Football Game' }])

item1 = Item.create(name: 'Nike t-shirt', price: 20.99, quantity: 2, category: "Leisure", expense_id: 1)
item2 = Item.create(name: 'Toastes chipotle avacodo chicken melt', price: 10.00, quantity: 1, category: "Food", expense_id: 2)
item3 = Item.create(name: 'Superfood smoothie', price: 4.69, quantity: 1, category: "Food", expense_id: 3)
item4 = Item.create(name: 'PSU Sweatshirt', price: 85.99, quantity: 1, category: "Leisure", expense_id: 3)
item5 = Item.create(name: 'PSU game tickets', price: 35.99, quantity: 5, category: "Leisure", expense_id: 3)

expenses[0].items << item1
expenses[1].items << item2
expenses[1].items << item3
expenses[2].items << item4
expenses[2].items << item5
