import os

class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'cannot-be-guess'
    # postgres://<username>:<password>@<hostname/server>/<databasename>
    # SQLALCHEMY_DATABASE_URI = 'postgres://postgres:root@localhost:5432/postgis_db'
    SQLALCHEMY_DATABASE_URI = 'postgres://uxgwvdztqmjpdz:76e97c9a534be6bccbc5eac45259f72a43b348e70b841634219fd1b7c1ba2edd@ec2-54-225-228-142.compute-1.amazonaws.com:5432/dcgh7aioah2jrr'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JSON_AS_ASCII = False
