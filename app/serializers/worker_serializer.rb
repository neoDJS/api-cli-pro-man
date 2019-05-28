class WorkerSerializer < ActiveModel::Serializer
  attributes :id, :title
  belongs_to :user
  has_many :todos
  has_many :projects
end
