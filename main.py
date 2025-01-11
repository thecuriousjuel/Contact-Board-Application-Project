"""
Importing all the functions needed to perform all the operations.
Operations include creating the database folder, database file, user table
and all the CRUD operations on the User data.
"""
import webbrowser
from flask import Flask
from flask import render_template
from flask import request
from flask import jsonify
from operations import fetch_all_users
from operations import create_user
from operations import update_user
from operations import delete_user
from operations import prepare

LOCALHOST = "127.0.0.1"
PORT = 5000

# Creating the flask app
app = Flask(__name__)

@app.route('/', methods=['GET'])
def main():
    """
    This method creates/prepares the server environment for execution.
    It returns the homepage of the application.
    """
    prepare()
    return render_template('index.html')


@app.route('/users', methods=['GET'])
def get_users():
    """
    This method fetches all the user details like User first and last name and email.
    """
    output = fetch_all_users()
    return jsonify(output), output['status']

@app.route('/create', methods=['POST'])
def create():
    """
    This method handles the request of storing the User details.
    """
    first_name = request.get_json().get('firstName')
    last_name = request.get_json().get('lastName')
    email = request.get_json().get('email')
    output = create_user(first_name, last_name, email)
    return jsonify({'response': output}), output['status']

@app.route('/delete', methods=['DELETE'])
def delete():
    """
    This method handles the request of deleting the User details.
    """
    email = request.get_json().get('email')
    output = delete_user(email)
    return jsonify({'response': output}), output['status']

@app.route('/update', methods=['PUT'])
def update():
    """
    This method handles the request of updating the User details.
    """
    first_name = request.get_json().get('firstName')
    last_name = request.get_json().get('lastName')
    email = request.get_json().get('email')
    output = update_user(email, first_name, last_name)
    return jsonify({'response': output}), output['status']

# Starting the application
if __name__ == '__main__':
    url = f"http://{LOCALHOST}:{PORT}/"
    webbrowser.open_new_tab(url)
    app.run(host=LOCALHOST, port=PORT)
