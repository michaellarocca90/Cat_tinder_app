class CreateCats < ActiveRecord::Migration[5.1]
  def change
    create_table :cats do |t|
      t.string :name
      t.integer :age
      t.string :city
      t.text :enjoys
      t.belongs_to :user, index: true
      t.timestamps
    end
  end
end
