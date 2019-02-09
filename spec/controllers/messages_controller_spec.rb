require 'rails_helper'

describe MessagesController do
  let(:group) { create(:group) }
  let(:user) { create(:user) }

  describe '#index' do
    context 'ログインできる' do
      before do
        login user
        get :index, params: { group_id: group.id }
      end

      it "インスタンス変数@messageを割り当てられている" do
        expect(assigns(:message)).to be_a_new(Message) #assignsで参照
      end

      it "インスタンス変数@groupを割り当てられている" do
        expect(assigns(:group)).to eq group
      end

      it "メッセージ一覧表示のビューに遷移できる" do
        expect(response).to render_template :index
      end
    end

    context 'ログインしていない' do
      before do
        get :index, params: { group_id: group.id }
      end

      it "ログイン画面に遷移できる" do
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end

  describe 'POST #create' do
    let(:params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message) } }

    context 'ログインしている' do
      before do
        login user
      end

      context "保存できている" do
        subject {
          post :create,
          params: params
        }

        it "メッセージの保存ができているか" do
          expect{ subject }.to change(Message, :count).by(1)
        end

        it "createアクションのビューに遷移しているか" do
          subject
          expect(response).to redirect_to(group_messages_path(group))
        end
      end

      context '保存できない場合' do
        let(:invalid_params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message, content: nil, image: nil) } }

        subject {
          post :create,
          params: invalid_params
        }

        it "メッセージの保存ができていないか" do
          expect{ subject }.not_to change(Message, :count)
        end

        it "indexアクションのビューに遷移しているか" do
          subject
          expect(response).to render_template :index
        end
      end
    end

    context 'ログインしていない場合' do

      it "ログイン画面にリダイレクトできているか" do
        post :create, params: params
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
end
