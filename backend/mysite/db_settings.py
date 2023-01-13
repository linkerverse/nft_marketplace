LV_MYSQL = {
    'default': {
        'ENGINE': 'django.db.backends.mysql', 
        'NAME': '', 
        'USER': '', 
        'PASSWORD': '', 
        'HOST': '127.0.0.1', 
        'PORT': '3306', 
        'OPTIONS': {
            'init_command': "SET sql_mode='STRICT_TRANS_TABLES'",
            # 'sql_mode': 'traditional',
        }
    }
}

DEBUG = True