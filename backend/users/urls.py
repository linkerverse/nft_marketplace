from django.urls import path
from users.views import Signin, SignUp, ImageIdData, ResultApi, ImageAllIdData

urlpatterns = [
    path('signup', SignUp.as_view()),
    path('signin', Signin.as_view()),

    # path('nft/<int:nft_id>', NftData.as_view()),
    # path('image/<int:id>', ImageIdData.as_view()),
    path('nft', ImageIdData.as_view()),
    path('image', ImageAllIdData.as_view()),
    path('result', ResultApi.as_view())
]