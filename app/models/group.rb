class Group < ApplicationRecord

  has_many :members
  has_many :users, through: :members
  has_many :messages
  validates :group_name, presence: true
end
