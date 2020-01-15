class MeetupsController < ApplicationController

  def index
    @header_title = "Your Meetups"
    @outbound_meetup_requests = current_user.outbound_meetup_requests
    @inbound_meetup_requests = current_user.inbound_meetup_requests
    @confirmed_meetups = current_user.confirmed_meetups
    @past_meetups = @confirmed_meetups.select { |cm| cm.meetup_occurred? }.reverse
    @upcoming_meetups = @confirmed_meetups.select { |cm| cm.date > Date.today }
  end

  def show
    @header_title = "Meetup Info"
    @meetup = Meetup.find(params[:id])

  end

  def new
    @header_title = "Request a Meetup"
    @user = User.find(params[:user_id])
    @meetup = Meetup.new
    @seeking_langs = @user.user_languages.filter(&:sharing).map {|user_languages| user_languages.language}
    @sharing_langs = current_user.user_languages.filter(&:sharing).map {|user_languages| user_languages.language}
    # @seeking_langs = @user.user_languages.filter(&:sharing).map {|user_languages| user_languages.language}.collect {|l| [ l.name, l.id ] }
    # @sharing_langs = current_user.user_languages.filter(&:sharing).map {|user_languages| user_languages.language}.collect {|l| [ l.name, l.id ] }

  end

  def create
    @user = User.find(params[:user_id])
    @meetup = Meetup.new(meetup_params)
    # seeking_l =  Language.find(params[:meetup][:seeking_lang].to_i)
    @meetup.sharing_lang = Language.find(params[:meetup][:sharing_lang].to_i)
    @meetup.seeking_lang_id = params[:meetup][:seeking_lang].to_i
    # @meetup.seeking_lang_id = seeking_l.id

    @meetup.sender = current_user

    @meetup.recipient = @user
    @seeking_langs = @user.user_languages.filter(&:sharing).map {|user_languages| user_languages.language}.collect {|l| [ l.name, l.id ] }
    @sharing_langs = current_user.user_languages.filter(&:sharing).map {|user_languages| user_languages.language}.collect {|l| [ l.name, l.id ] }

    if @meetup.save!

      redirect_to meetup_path(@meetup)
    else
      render :new
    end
  end

  def update
    @meetup = Meetup.find(params[:id])
    @meetup.update_attribute(:confirmed, true)

    respond_to do |format|
      format.js
    end
  end

  private

  # def client_options
  #   {
  #     client_id: ENV["GOOGLE_CLIENT_ID"],
  #     client_secret: ENV["GOOGLE_CLIENT_SECRET"],
  #     authorization_uri: 'https://accounts.google.com/o/oauth2/auth',
  #     token_credential_uri: 'https://accounts.google.com/o/oauth2/token',
  #     scope: Google::Apis::CalendarV3::AUTH_CALENDAR,
  #     redirect_uri: new_event_url
  #   }
  # end

  def meetup_params
    params.require(:meetup).permit(:date, :start_time, :duration, :location, :greeting)
  end

  def confirmed_meetup_params
    params.require(:meetup).permit(:confirmed)
  end
end
