from flask import Flask
from flask import render_template
from flask import request
from operations import *

app = Flask(__name__)

@app.route('/', methods=['GET'])
def main():
    return render_template('index.html')

@app.route('/create', methods=['POST'])
def create():
    first_name = request.get_json().get('firstName')
    last_name = request.get_json().get('lastName')
    email = request.get_json().get('email')

    print(first_name, last_name, email)
    out = create_user(first_name, last_name, email)

    return {'response': out}

if __name__ == '__main__':
    app.run(debug=True)
