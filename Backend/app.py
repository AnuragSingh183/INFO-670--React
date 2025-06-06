from flask import Flask
from flask_cors import CORS
from routes.workouts import workout_routes
from dotenv import load_dotenv
import os
from pymongo import MongoClient

load_dotenv()

app = Flask(__name__)
CORS(app)

# MongoDB setup
client = MongoClient(os.getenv("MONGO_URI"))
db = client["workout_logger"]

# Register routes
app.register_blueprint(workout_routes(db))

if __name__ == "__main__":
    app.run(host="0.0.0.0",debug=True, port=3001)
