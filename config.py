import os

class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'cannot-be-guess'
    SQLALCHEMY_DATABASE_URI = 'postgres://postgres:root@localhost:5432/postgis_db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JSON_AS_ASCII = False
