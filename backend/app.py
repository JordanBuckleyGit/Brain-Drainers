from flask import Flask, request, jsonify, g, session
from flask_cors import CORS
from flask_session import Session
from werkzeug.security import generate_password_hash, check_password_hash
from database import get_db, close_db

app = Flask(__name__)
CORS(app, supports_credentials=True, origins=["http://localhost:3000"])
app.teardown_appcontext(close_db)

# Session configuration
app.config["SECRET_KEY"] = "jordansPw"
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    db = get_db()
    if db.execute(
        "SELECT id FROM user WHERE username = ? OR email = ?",
        (data['username'], data['email'])
    ).fetchone():
        return jsonify({"message": "User already exists."}), 400
    db.execute(
        "INSERT INTO user (username, email, password_hash) VALUES (?, ?, ?)",
        (data['username'], data['email'], generate_password_hash(data['password']))
    )
    db.commit()
    return jsonify({"message": "User registered!"}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    db = get_db()
    user = db.execute(
        "SELECT * FROM user WHERE email = ?", (data['email'],)
    ).fetchone()
    if user and check_password_hash(user['password_hash'], data['password']):
        session['user_id'] = user['id']
        return jsonify({"message": "Login successful!"}), 200
    return jsonify({"message": "Invalid credentials."}), 401

@app.route('/api/user', methods=['GET'])
def get_user():
    print("Session user_id:", session.get('user_id'))  # Add this line
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({"username": None}), 401
    db = get_db()
    user = db.execute(
        "SELECT username FROM user WHERE id = ?", (user_id,)
    ).fetchone()
    if user:
        return jsonify({"username": user['username']})
    return jsonify({"username": None}), 404

if __name__ == '__main__':
    app.run(debug=True)