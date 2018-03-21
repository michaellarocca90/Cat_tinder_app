require 'rails_helper'

RSpec.describe Cat, type: :model do
  it "should validate name, city, and age" do
    cat = Cat.create
    expect(cat.errors[:name]).to_not be_empty
    expect(cat.errors[:city]).to_not be_empty
    expect(cat.errors[:age]).to_not be_empty
  end

  it "should error if enjoys is less than 10" do
    cat = Cat.create
    cat.enjoys = 'hey'
    puts cat.enjoys
    puts cat.errors[:enjoys]
    expect(cat.errors[:enjoys]).to_not be_empty
  end
  
end
