json.array! @new_messages do |new_message|
  json.name              new_message.user.name
  json.content           new_message.content
  json.image             new_message.image.url
  json.is_image_present  new_message.image.present?
  json.created_at        new_message.created_at.strftime("%Y/%m/%d %H:%M")
  json.id                new_message.id
end
