class Cat < ApplicationRecord
  belongs_to :user
  validates :name, presence: true
  validates :age, presence: true
  validates :city, presence: true
  validates :enjoys, length: { minimum: 10 }
end
