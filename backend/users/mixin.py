from rest_framework.permissions import IsAuthenticated
from users.authenticate import SafeJWTAuthentication



# 아무나 사용가능한 클래스
class PublicApiMixin:
    authentication_classes = ()
    permission_classes = ()

# 로그인한 유저
class ApiAuthMixin:
    authentication_classes = (SafeJWTAuthentication, )
    permission_classes = (IsAuthenticated, )
