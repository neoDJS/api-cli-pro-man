class ApplicationSerializer < ActiveModel::Serializer
    attributes :created_at, :updated_at
    belongs_to :created_by, class_name: "User"
    belongs_to :updated_by, class_name: "User"
end
  