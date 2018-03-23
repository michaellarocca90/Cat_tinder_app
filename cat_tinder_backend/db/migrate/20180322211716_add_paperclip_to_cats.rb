class AddPaperclipToCats < ActiveRecord::Migration[5.1]
  def change
    add_attachment :cats, :avatar #add this line
  end
end
