

json.array! @cats do |cat|
  json.name cat.name
  json.age cat.age
  json.enjoys cat.enjoys
  json.avatar asset_url(cat.avatar.url(:med))
end
