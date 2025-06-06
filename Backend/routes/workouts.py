from flask import Blueprint, request, jsonify
from datetime import datetime

def workout_routes(db):
    bp = Blueprint('workout', __name__)
    @bp.route("/api/logWorkout", methods=["POST"])
    def log_workout():
        data = request.json
        print("📥 Received data:", data)  # DEBUG PRINT
        if not all(k in data for k in ("user", "type", "duration", "notes")):
            print("Missing fields!")
            return jsonify({"success": False, "msg": "Missing fields"}), 400

        data["createdAt"] = datetime.utcnow()
        db.workouts.insert_one(data)
        return jsonify({"success": True, "msg": "Workout logged successfully!"})


    @bp.route("/api/getWorkouts", methods=["GET"])
    def get_workouts():
        user = request.args.get("user")
        workouts = list(db.workouts.find({"user": user}, {"_id": 0}))
        return jsonify({"success": True, "workouts": workouts})

    return bp
