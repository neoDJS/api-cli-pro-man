class TodoSerializer < ApplicationSerializer
    attributes :id, :task
    belongs_to :project
    has_many :workers
  end