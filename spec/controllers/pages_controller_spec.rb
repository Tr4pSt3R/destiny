require 'rails_helper'

RSpec.describe PagesController, type: :controller do 
  context "#static" do 
    it "gets :home" do 
      get '/'
      expect(response).to be_success 
    end
  end
end
