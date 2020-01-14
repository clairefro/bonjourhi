class ApplicationController < ActionController::Base
  before_action :set_title
  before_action :authenticate_user!
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

       def configure_permitted_parameters
           # devise_parameter_sanitizer.for(:sign_up) { |u| u.permit(:first_name, :last_name, :city, :email, :password) }
           # devise_parameter_sanitizer.for(:account_update) { |u| u.permit(:name, :email, :password, :current_password) }
           devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name, :city])
       end

  private

  def set_title
    @header_title = ""
  end

  def default_url_options
    { host: ENV["DOMAIN"] || "localhost:3000" }
  end
end
