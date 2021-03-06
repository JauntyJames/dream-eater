require 'carrierwave/processing/rmagick'

class ComicFileUploader < CarrierWave::Uploader::Base
  # Include RMagick or MiniMagick support:
  # include CarrierWave::RMagick
  # include CarrierWave::MiniMagick
  include Cloudinary::CarrierWave

  # Choose what kind of storage to use for this uploader:
  if Rails.env.test?
    storage :file
  end

  # Override the directory where uploaded files will be stored.
  # This is a sensible default for uploaders that are meant to be mounted:
  # def store_dir
  #   "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  # end


  version :standard do
  end

#   version :rotated do
#   eager
#   cloudinary_transformation :transformation => [
#       {:width => 150, :height => 200, :crop => :fill, :effect => "sepia"},
#       {:angle => 10}
#     ]
# end

  version :thumb do
    cloudinary_transformation transformation: [
      { page: 1, width: 300, height: 300, crop: :fit }
    ]
    process convert: 'jpg'
  end

  # Provide a default URL as a default if there hasn't been a file uploaded:
  # def default_url(*args)
  #   # For Rails 3.1+ asset pipeline compatibility:
  #   # ActionController::Base.helpers.asset_path("fallback/" + [version_name, "default.png"].compact.join('_'))
  #
  #   "/images/fallback/" + [version_name, "default.png"].compact.join('_')
  # end

  # Process files as they are uploaded:
  # process scale: [200, 300]
  #
  # def scale(width, height)
  #   # do something
  # end

  # Create different versions of your uploaded files:
  # def cover
  #   manipulate! do |frame, index|
  #     frame if index.zero? # take only the first page of the file
  #   end
  # end
  #
  # version :thumb do
  #   process :cover
  #   process :resize_to_fit => [400, 400]
  #   process :convert => :jpg
  #
  #   def full_filename (for_file = model.source.file)
  #     super.chomp(File.extname(super)) + '.jpg'
  #   end
  # end

  # Add a white list of extensions which are allowed to be uploaded.
  # For images you might use something like this:
  def extension_whitelist
    %w(pdf)
  end

  # Override the filename of the uploaded files:
  # Avoid using model.id or version_name here, see uploader/store.rb for details.
  # def filename
  #   "something.jpg" if original_filename
  # end
end
