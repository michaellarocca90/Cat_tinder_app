class UsersController < ApplicationController
  before_action :authenticate_user, only: :show

  def show
    user = User.find params[:id]
    render json: user
  end

  def create
    # here would be a method that creates a user from post params
    user = User.new()
    user.name = params[:name]
    user.email = params[:email]
    user.password = params[:password]
    user.save
    if user.valid?
      token = Knock::AuthToken.new(payload: { sub: user.id }).token
      payload = {
        user: user,
        jwt: token
      }
      render json: payload, status: 201
    else
      puts user.errors.messages
      debugger
      render json: {errors: user.errors}, status: 422
    end
  end

  private
  def user_params
    params.require(:user).permit(:email, :name, :password, :password_confirmation)
  end

end
