import datetime, jwt
from rest_framework import exceptions
from rest_framework.authentication import BaseAuthentication
from mysite.settings import get_secret
from django.utils import timezone
from datetime import timedelta
from users.models import User

def generate_access_token(user):
    access_token_payload = {
        'user_id': user.id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(
            days=7, minutes=60
        ),
        'iat': datetime.datetime.utcnow(),
    }
    
    access_token = jwt.encode(
        access_token_payload,
        get_secret("SECRET_KEY"), algorithm='HS256' # 여기도 바꿔야함 ES256으로
    )
    
    return access_token

def generate_refresh_token(user):
    refresh_token_payload = {
        'user_id': user.id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7, minutes=60),
        'iat': datetime.datetime.utcnow(),
    }
    
    refresh_token = jwt.encode(
        refresh_token_payload,
        get_secret("REFRESH_TOKEN_SECRET"), algorithm='HS256' # 여기도 바꿔야함 ES256으로
    )
    
    return refresh_token


def jwt_login(user, email, username):
    access_token = generate_access_token(user) 
    refresh_token = generate_refresh_token(user)

    print("refresh_token 만들어졌나 : ", refresh_token)
    
    data = {
        'access_token' : access_token,
        'refresh_token' : refresh_token,
        'email':email,
        'username':username,
        'user_id' : user.id, # 7.15 추가
        # 'image' : user.image
    }
    
    print("data : ", data)
    
    return data


class SafeJWTAuthentication(BaseAuthentication):
    """
    JWT Authentication
    헤더의 jwt 값을 디코딩해 얻은 user_id 값을 통해서 유저 인증 여부를 판단한다.
    """
    
    def authenticate(self, request):
        # authorization_header = request.COOKIES.get('refresh_token')
        authorization_header = request.headers.get('Authorization')
        print("authorization_header : access_token 받아짐? 로그인 상황 : ", authorization_header)
        

        if not authorization_header:
            return None

        try:
            payload = jwt.decode(
                authorization_header, get_secret("REFRESH_TOKEN_SECRET"), algorithms=['HS256']
            )

        except jwt.ExpiredSignatureError:
            raise exceptions.AuthenticationFailed('access_token expired')
        except IndexError:
            raise exceptions.AuthenticationFailed('Token prefix missing')
        
        return self.authenticate_credentials(request, payload['user_id'])
    
    def authenticate_credentials(self, request, key):
        user = User.objects.filter(id=key).first()
        print("user ? :", user)
        print("key ? :", key)
        
        if user is None:
            raise exceptions.AuthenticationFailed('User not found')
        
        if not user.is_active:
            raise exceptions.AuthenticationFailed('User is inactive')
        
        # self.enforce_csrf(request)
        return (user, None)

    # def enforce_csrf(self, request):
    #     check = CSRFCheck()
        
    #     check.process_request(request)
    #     reason = check.process_view(request, None, (), {})

    #     print("reason: ", reason)
    #     if reason:
    #         raise exceptions.PermissionDenied(f'CSRF Failed: {reason}')