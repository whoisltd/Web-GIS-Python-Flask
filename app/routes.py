from app import app
from app.models import *
from flask import request, render_template
from flask.json import jsonify
from sqlalchemy import func

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/v1/building')
def building_api():
    buildings = Building.query.all()
    func.ST_AsGeoJSON(func.ST_SetSRID(Building.geom, 4326)).label('geometry').all()
    buidling_feature = []
    for building in buildings:
        properties_temp = {
            "diaChi": building.addr_house,
            "loaiNha": building.typehouse,
            "soTang": building.floor,
            "dienTich"
        }
