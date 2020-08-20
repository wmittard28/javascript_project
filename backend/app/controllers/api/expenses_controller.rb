class Api::ExpensesController < ApplicationController

    def index
        @expenses = Expense.all
        render json: @expenses, include: :items, status: 200
    end

    def show
        @expense = Expense.find_by(id: params[:id])
        render json: @expense, include: :items, status: 200
    end

    def create
        @expense = Expense.create(expense_params)
        render json: @expense, include: :items, status: 200
    end

    def update
        @expense = Expense.find_by(id: params[:id])
        @expense.update(expense_params)
        render json: @expense, include: :items, status: 200
    end

    def destroy
        @expense.destroy
        head :no_content
    end

    private

        def expense_params
            params.require(:expense).permit(:name)
        end

end
