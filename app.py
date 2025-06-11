from flask import Flask, render_template, session, redirect, url_for, g, request
from database import get_db, close_db
from flask_session import Session
from werkzeug.security import generate_password_hash, check_password_hash
from forms import LoginForm, RegistrationForm
from functools import wraps


app = Flask(__name__)
app.teardown_appcontext(close_db)
app.config["SECRET_KEY"] = "jordansPw"
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

@app.before_request
def load_logged_in_user():
    g.user = session.get('user_id', None)

def login_required(view):
    @wraps(view)
    def wrapped_view(*args, **kwargs):
        if g.user is None:
            return redirect(url_for('login', next=request.url))
        return view(*args, **kwargs)
    return wrapped_view

@app.route('/', methods=(['GET','POST']))
def index():
    return render_template('base.html')

@app.route('/register', methods = (['GET','POST']))
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        db = get_db()
        clash = db.execute('''
            SELECT * FROM users
            WHERE username = ?;''', (username,)).fetchone()
        if clash is not None:
            form.username.errors.append('Username already taken')
        else:
            db.execute('''
                INSERT INTO users (username, password)
                VALUES (?, ?);''',
                (username, generate_password_hash(password)))
            db.commit()
            return redirect( url_for('login'))
        return render_template('register.html',form=form)
    



