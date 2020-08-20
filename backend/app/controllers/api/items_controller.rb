class Api::ItemsController < ApplicationController

    def index
        @items = Item.all
        render json: @items, include: :expense, status: 200
    end

    def show
        @item = Item.find_by(id: params[:id])
        render json: @item, include: :expense, status: 200
    end

    def create
        @item = Item.create(item_params)
        render json: @item, include: :expense, status: 200
    end

    def update
        @item = Item.find_by(id: params[:id])
        @item.update(item_params)
        render json: @item, include: :expense, status: 200
    end

    def destroy
        @item.destroy
        head :no_content
    end

    private

        def item_params
            params.require(:item).permit(:name, :price, :quantity, :category, :expense_id)
        end


end
