require 'rails_helper'

describe "Cats API" do
  it "gets a list of Cats" do

    Cat.create(name: 'Felix', age: 2, city: 'West Side', enjoys: "That city life.")

    get '/cats'

    json = JSON.parse(response.body)

    expect(response).to be_success

    expect(json.length).to eq 1
  end

  it "creates a cat" do

    cat_params = {
      cat: {
        name: 'Buster',
        age: 4,
        city: 'San Diego',
        enjoys: 'fancy feast and palm trees'
      }
    }

    post '/cats', params: cat_params

    expect(response).to be_success

    new_cat = Cat.first

    expect(new_cat.name).to eq('Buster')
  end

  it "doesn't create a cat without a name, age, and city" do
    cat_params = {
      cat: {
        enjoys: 'long walks without a leash'
      }
    }

    post '/cats', params: cat_params

    expect(response.status).to eq 422

    json = JSON.parse(response.body)

    expect(json['name']).to include "can't be blank"
  end

end
