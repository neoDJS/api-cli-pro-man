class TodoSerializer < ActiveModel::Serializer
  attributes :id, :task
  belongs_to :project
  has_many :workers
end
