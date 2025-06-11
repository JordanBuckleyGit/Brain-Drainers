from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, PasswordField
from wtforms.validators import InputRequired, EqualTo, Length

class RegistrationForm(FlaskForm):
    username = StringField('Username:',validators=[InputRequired()])
    password = PasswordField('Password:',validators=[InputRequired(), Length(min=4)] )
    password2 = PasswordField('Enter your password again:',validators=[InputRequired(),EqualTo('password')])
    submit = SubmitField('Submit')

class LoginForm(FlaskForm):
    username = StringField('Username:', validators=[InputRequired()])
    password = PasswordField('Password:', validators=[InputRequired()])
    submit = SubmitField('Submit')