from app import db
from sqlalchemy.sql.schema import Column
from sqlalchemy.types import String
from geoalchemy2.types import Geometry

class Building(db.Model):
    __tablename__ = "building"
    id = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String, nullable=False)
    addr_house = db.Column(db.String,nullable=False)
    typehouse = db.Column(db.String,nullable=False)
    floor = db.Column(db.Integer,nullable=False)
    square = db.Column(db.Float, nullable=False)
    geom = db.Column(Geometry('POLYGON'))

class Tree(db.Model):
    __tablename__ = "trees-point"
    id = db.Column(db.Integer,primary_key=True)
    loaicay = db.Column(db.String,nullable=False)
    chieucao = db.Column(db.String,nullable=False)
    geom = db.Column(Geometry('POLYGON'))