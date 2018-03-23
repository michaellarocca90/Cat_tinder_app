require 'rails_helper'

describe "Cats API" do
  let(:encoded_file) do
    file_path = File.join(Rails.root, 'spec', 'fixtures', 'sample-image.png')
    base64_image = Base64.encode64(File.read(file_path))
    "data:image/png;base64,#{base64_image}"
  end

  it "gets a list of Cats" do

    User.create(
      name:'Bob',
      email: 'bob@bob.com',
      password: 'secret'
    )

    cat = Cat.create!(
      name: 'Felix',
      age: 2,
      city: 'West Side',
      enjoys: "That city life.",
      user_id: 1,
      avatar_base: encoded_file
    )

    get '/cats.json'
    json = JSON.parse(response.body)

    expect(json).to be_a(Array)

    expect(json.length).to eq 1
  end

  it "creates a cat" do

    User.create(
      name:'Bob',
      email: 'bob@bob.com',
      password: 'secret'
    )

    cat_params = {
      cat: {
        name: 'Buster',
        age: 4,
        city: 'San Diego',
        enjoys: 'fancy feast and palm trees',
        avatar_base: encoded_file,
        user_id: 1
      }
    }

  post '/cats', params: cat_params
  puts response.body

   new_cat = Cat.first
   expect(new_cat.name).to eq('Buster')
   expect(new_cat.avatar.url).to_not be nil

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
