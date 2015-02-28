require 'rails_helper'

RSpec.describe PagesController, type: :controller do 
  %w(home).each do |page|  
    context 'on GET to /pages/#{page}' do 
      before do 
        get :show, id: page
      end

      it { should respond_with(:success) }
      it { should render_template(page) }
    end
  end
end
