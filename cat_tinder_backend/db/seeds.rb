# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
cat_attributes = [
  {
    name: 'Felix',
    age: 2,
    city: 'Long Beach',
    enjoys: 'Long naps on the couch, and a warm fire.',
    user_id: 2
  },
  {
    name: 'Homer',
    age: 12,
    city: 'Atlanta',
    enjoys: 'Food mostly, really just food.',
    user_id: 1
  }
]

cat_attributes.each do |attributes|
  Cat.create(attributes)
end
