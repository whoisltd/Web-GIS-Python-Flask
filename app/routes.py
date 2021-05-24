from app import app
from app.models import *
from flask import json, render_template, request
from flask.json import jsonify
from sqlalchemy import func

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/v1/building')
def building_api():
    buildings = db.session.query(Building.id,\
    Building.addr_house, Building.typehouse,\
    Building.floor, Building.square,\
    func.ST_AsGeoJSON(func.ST_Transform(Building.geom,4326)).label('geometry')).all()
    buidling_feature = []
    for building in buildings:
        properties_temp = {
            "diaChi": building.addr_house,
            "loaiNha": building.typehouse,
            "soTang": building.floor,
            "dienTich": building.square,
            "id": building.id,
        }
        geometry_temp = json.loads(building.geometry)
        feature = {
            "type": "Feature",
            "properties": properties_temp,
            "geometry": geometry_temp
        }
        buidling_feature.append(feature)

    return jsonify({
        "features": buidling_feature
    })

@app.route('/api/v1/tree')
def tree_api():
    trees = db.session.query(Tree.id,\
    Tree.loaicay, Tree.chieucao,\
    func.ST_AsGeoJSON(func.ST_Transform(Tree.geom,4326)).label('geometry')).all()
    tree_feature = []
    for tree in trees:
        properties_temp = {
            "loaicay": tree.loaicay,
            "chieucao": tree.chieucao,
            "id": tree.id,
        }
        geometry_temp = json.loads(tree.geometry)
        feature = {
            "type": "Feature",
            "properties": properties_temp,
            "geometry": geometry_temp
        }
        tree_feature.append(feature)

    return jsonify({
        "features": tree_feature
    })