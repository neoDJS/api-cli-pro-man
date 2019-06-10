class WorkerSerializer < ApplicationSerializer
  attributes :id, :title
  belongs_to :user
  has_many :todos
  has_many :projects
end
