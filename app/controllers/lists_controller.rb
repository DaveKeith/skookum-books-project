class ListsController < ApplicationController
  def index
    b = BookList.new(params[:cat] || "title", params[:asc] || "ascending", params[:num] || 0)
    @books = b.get_books
    # render :json => {:list => @books}
    render :index, locals: { books: @books }
  end
end

class BookList
  include HTTParty
  base_uri "https://skookum-test-api.herokuapp.com/api/v1/"
  format :json

  def initialize(sort_category, ascending, num_of_items)
    @sort_category = sort_category
    @ascending = ascending
    @num_of_items = num_of_items.to_i
  end

  def get_books
    all_books = BookList.get("/books")
    all_books.each do |book|
      if(book["title"] == nil)
        book["title"] = ""
      end
      if(book["author"] == nil)
        book["author"] = ""
      end
      if(book["year"] == nil)
        book["year"] = ""
      end
      if(book["isbn"] == nil)
        book["isbn"] = ""
      end
    end
    all_books = all_books.sort_by{|book| book[@sort_category]}
    if(@ascending != "ascending")
      all_books = all_books.reverse
    end
    if(@num_of_items < 1)
      @num_of_items = all_books.length
    end
    result = []
    @num_of_items.times do |n|
      result[n] = all_books[n]
    end
    result
  end

end
