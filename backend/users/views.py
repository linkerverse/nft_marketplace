import json, re, bcrypt, jwt, requests
from mysite.settings import get_secret
from django.http      import JsonResponse
from django.shortcuts import get_object_or_404

import jwt
import json
import re
import uuid
import datetime
import random

from mysite.settings import get_secret
from users.mixin import PublicApiMixin, ApiAuthMixin
from users.models     import User, Image
from users.authenticate import jwt_login, generate_access_token

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.
class SignUp(PublicApiMixin, APIView):
    def post(self, request):

        data = json.loads(request.body)

        try:

            if User.objects.filter(email=data["email"]).exists():
                return JsonResponse ({"MESSAGE":"HTTP_400_BAD_REQUEST"}, status=status.HTTP_400_BAD_REQUEST)

            hashed_passwored = bcrypt.hashpw(data["password"].encode('utf-8'), bcrypt.gensalt()).decode()

            User.objects.create(
                email = data["email"],
                password = hashed_passwored,
                username = data["name"]
            )

            return JsonResponse ({"MESSAGE":"HTTP_201_CREATED"}, status=status.HTTP_201_CREATED)
        except KeyError:
            return JsonResponse ({"MESSAGE":"HTTP_400_BAD_REQUEST"}, status=status.HTTP_400_BAD_REQUEST)


class Signin(PublicApiMixin, APIView):
    def post(self, request):

        try:
            data = json.loads(request.body)
            
            # email 확인
            if not User.objects.filter(email=data['email']).exists():
                return JsonResponse ({"MESSAGE":"HTTP_401_UNAUTHORIZED"}, status=status.HTTP_401_UNAUTHORIZED)

            user = User.objects.get(email=data["email"])

            # password 확인
            if not bcrypt.checkpw(data["password"].encode("utf-8"), user.password.encode("utf-8")):
                return JsonResponse({"message": "HTTP_401_UNAUTHORIZED"}, status=status.HTTP_401_UNAUTHORIZED)

            response = jwt_login(user=user, email=user.email, username=user.username)
            refresh_token=response['refresh_token']
            
            return Response({'token': response}, status=status.HTTP_200_OK)

        except KeyError:
            return JsonResponse({"message": "HTTP_401_UNAUTHORIZED"}, status=status.HTTP_401_UNAUTHORIZED)


class NftData(ApiAuthMixin, APIView):
    def get(self, request, nft_id):

        if not request.user.id:
            response = Response({
            "message": "HTTP_401_UNAUTHORIZED"
            }, status=status.HTTP_401_UNAUTHORIZED)
            return response

        image_id_data=get_object_or_404(Image, nft_id=nft_id)

        data_mock = {
            "image" : image_id_data.image_url,
            "data" : image_id_data.mock_data,
            # "image_url_id": image_id_data.image_url_id,
            "image_id" : image_id_data.id,
            "nft_id" : image_id_data.nft_id
        }
        return Response({'data': data_mock}, status=status.HTTP_200_OK)


class ImageAllIdData(ApiAuthMixin, APIView):
    def get(self, request):
        if not request.user.id:
            response = Response({
            "message": "HTTP_401_UNAUTHORIZED"
            }, status=status.HTTP_401_UNAUTHORIZED)
            return response


        all_id=Image.objects.filter(user_id=request.user.id)
        print("all : ", all_id)
        
        return Response({"all_id":[{
            "image_id": i.id,
            # "image_id": i.image_url_id,
            "image_data": i.mock_data,
            "image_url":i.image_url
        }
        for i in all_id]}, status=status.HTTP_200_OK)



class ImageIdData(ApiAuthMixin, APIView):  
    def get(self, request, id):

        if not request.user.id:
            response = Response({
            "message": "HTTP_401_UNAUTHORIZED"
            }, status=status.HTTP_401_UNAUTHORIZED)
            return response

        image_id_data=get_object_or_404(Image, id=id)

        data = {
            "image_id" : image_id_data.image_url_id
        }
        return Response({'image_url_id': data}, status=status.HTTP_200_OK)

    def post(self, request, id):
        if not request.user.id:
            response = Response({
            "message": "HTTP_401_UNAUTHORIZED"
            }, status=status.HTTP_401_UNAUTHORIZED)
            return response

        image_id_data=get_object_or_404(Image, id=id)

        data = json.loads(request.body)
        nft_id = data['nft_id']

        image_id_data.nft_id = nft_id
        image_id_data.save()

        return Response({'nft_id': nft_id}, status=status.HTTP_201_CREATED)


# 분석결과
class ResultApi(ApiAuthMixin, APIView):
    def post(self, request):

        if not request.user.id:
            response = Response({
            "message": "HTTP_401_UNAUTHORIZED"
            }, status=status.HTTP_401_UNAUTHORIZED)
            return response

        image=Image.objects.create(
            image_url = "https://raw.githubusercontent.com/amamov/teaching-nestjs-a-to-z/main/images/1.jpeg",
            user_id = request.user.id,
            # image_url_id = int(random.randrange(1, 100)),
            mock_data = {
                "crack":{"cverall":0.7,"type1":0.5,"type2":0.5},
                "color":{"white ":0.7,"red-black":0.5,"black":0.5, "blue":0.7,"green":0.5,"yellow":0.5},
                "pattern":{"vertical-line":0.7,"horizontal-line":0.5,"vertical-band":0.5, 
                                        "horizontal-band":0.7,"furrow":0.5,"uneven":0.5, 
                                        "wave":0.5,"spot-white":0.5,"spot-black":0.5},
                "shape":{"club":0.7,"terminal-hypertrophy":0.5},
                "around":{"rough":0.7,"type1":0.5,"type2":0.5},
                "thickness":0.5,
                "curvature":0.5,
                "ingrouwn":0.5,
                "pointed":0.5
                }
        )
        return Response({'image_id': image.id}, status=status.HTTP_201_CREATED)

