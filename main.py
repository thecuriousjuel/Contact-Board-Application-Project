from flask import Flask
from flask import render_template
from flask import request
from operations import *

app = Flask(__name__)

@app.route('/', methods=['GET'])
def main():
    return render_template('index.html')


@app.route('/users', methods=['GET'])
def get_users():
    output = fetch_all_users()
    users = output['data']
    list_of_lists = [list(user) for user in users]
    print(list_of_lists)
    return {'response': list_of_lists}, output['status']

@app.route('/create', methods=['POST'])
def create():
    first_name = request.get_json().get('firstName')
    last_name = request.get_json().get('lastName')
    email = request.get_json().get('email')
    output = create_user(first_name, last_name, email)
    return {'response': output}, output['status']


if __name__ == '__main__':
    app.run(debug=True)
