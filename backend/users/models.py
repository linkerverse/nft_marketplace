from django.db   import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    profile_url = models.CharField(max_length=2000, null=True)
    email       = models.EmailField(unique=True, null=False)
    password    = models.CharField(max_length=200, null=False)
    username = models.CharField(max_length=40, unique=False, default='')

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []


class Image(models.Model):
    image_url = models.CharField(max_length=300, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image_url_id = models.IntegerField(null=True)
    mock_data = models.JSONField(null=True)
    nft_id = models.IntegerField(null=True)

