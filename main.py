from flask import Flask
from flask import render_template
from flask import request
from flask import jsonify
from operations import fetch_all_users
from operations import create_user
from operations import update_user
from operations import delete_user

app = Flask(__name__)

@app.route('/', methods=['GET'])
def main():
    return render_template('index.html')


@app.route('/users', methods=['GET'])
def get_users():
    output = fetch_all_users()
    return jsonify(output), output['status']

@app.route('/create', methods=['POST'])
def create():
    first_name = request.get_json().get('firstName')
    last_name = request.get_json().get('lastName')
    email = request.get_json().get('email')
    output = create_user(first_name, last_name, email)
    return jsonify({'response': output}), output['status']

@app.route('/delete', methods=['DELETE'])
def delete():
    email = request.get_json().get('email')
    output = delete_user(email)
    return jsonify({'response': output}), output['status']

@app.route('/update', methods=['PUT'])
def update():
    first_name = request.get_json().get('firstName')
    last_name = request.get_json().get('lastName')
    email = request.get_json().get('email')
    output = update_user(email, first_name, last_name)
    return jsonify({'response': output}), output['status']


if __name__ == '__main__':
    app.run(debug=True)
