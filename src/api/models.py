from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(85), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(180), unique=False, nullable=False)
    salt=db.Column(db.String(120), nullable=False)
    avatar=db.Column(db.String(120), default=("https://i.pravatar.cc/300"))
    created_at=db.Column(db.DateTime(timezone=True), default=db.func.now(), nullable=False)
    update_at=db.Column(db.DateTime(timezone=True), default=db.func.now(),onupdate=db.func.now(), nullable=False)

   

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "avatar":self.avatar
            # do not serialize the password, its a security breach
        }