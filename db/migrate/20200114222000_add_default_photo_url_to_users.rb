class AddDefaultPhotoUrlToUsers < ActiveRecord::Migration[5.2]
  def change
    change_column_default(
      :users,
      :photo,
      "https://images.unsplash.com/photo-1466921583968-f07aa80c526e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
    )
  end
end
