from flask import Flask, request, jsonify
import joblib
import pandas as pd
import numpy as np

app = Flask(__name__)

# 🔹 Load Models
classifier = joblib.load("water_quality_classifier.pkl")
label_encoder = joblib.load("label_encoder.pkl")

anomaly_detector = joblib.load("anomaly_detection_model.pkl")

tds_model = joblib.load("tds_regre_forecast_model.pkl")
temp_model = joblib.load("temp_regression_forecast_model.pkl")
ph_model = joblib.load("ph_forecast_model.pkl")
turb_model = joblib.load("turbidity_forecast_model.pkl")

maintenance_model = joblib.load("predictive_maintenance_model.pkl")

# 🔹 Classification Endpoint
@app.route('/predict-status', methods=['POST'])
def predict_status():
    data = request.get_json()
    input_df = pd.DataFrame([{
        "TDS": data["TDS"],
        "turbidity": data["turbidity"],
        "temperature": data["temperature"],
        "pH": data["pH"]
    }])
    pred = classifier.predict(input_df)[0]
    label = label_encoder.inverse_transform([pred])[0]
    # 👉 Cause logic (threshold-based)
    cause = []
    if data["TDS"] > 500:
        cause.append("High TDS")
    if data["turbidity"] > 30 or data["turbidity"] < 10:
        cause.append("Turbidity Warning")
    if data["temperature"] > 45:
        cause.append("High Temperature")
    if data["pH"] < 6.5 or data["pH"] > 8.5:
        cause.append("pH Out of Range")

    cause_text = ", ".join(cause) if cause else "All parameters normal"

    return jsonify({"status": label, "cause": cause_text})

# 🔹 Anomaly Detection Endpoint
@app.route('/detect-anomaly', methods=['POST'])
def detect_anomaly():
    data = request.get_json()
    input_df = pd.DataFrame([data])
    score = anomaly_detector.decision_function(input_df)[0]
    prediction = anomaly_detector.predict(input_df)[0]
    status = "Anomaly" if prediction == -1 else "Normal"
    return jsonify({"anomaly_score": round(score, 3), "status": status})

# 🔹 Regression Forecast Endpoints
@app.route('/forecast-tds', methods=['POST'])
def forecast_tds():
    try:
        data = request.get_json()
        print("🔍 Incoming data:", data)  # LOG IT
        df = pd.DataFrame([data])
        prediction = tds_model.predict(df)[0]
        return jsonify({"forecast_tds": round(prediction, 2)})
    except Exception as e:
        print("❌ ERROR:", str(e))
        return jsonify({"error": str(e)}), 400


@app.route('/forecast-temp', methods=['POST'])
def forecast_temp():
    data = request.get_json()
    input_df = pd.DataFrame([data])
    value = temp_model.predict(input_df)[0]
    return jsonify({"forecast_temp": round(value, 2)})

@app.route('/forecast-ph', methods=['POST'])
def forecast_ph():
    try:
        data = request.get_json()
        print("📨 Incoming JSON for pH Forecast:", data)

        input_df = pd.DataFrame([data])
        print("📊 DataFrame passed to model:\n", input_df)

        prediction = ph_model.predict(input_df)[0]
        prediction = float(prediction)  # ✅ Make it native Python float
        print("✅ Model Prediction:", prediction)

        return jsonify({"forecast_ph": round(prediction, 2)})
    except Exception as e:
        print("❌ ERROR in /forecast-ph:", str(e))
        return jsonify({"error": str(e)}), 400



@app.route('/forecast-turbidity', methods=['POST'])
def forecast_turbidity():
    try:
        data = request.get_json()
        input_df = pd.DataFrame([data])
        prediction = turb_model.predict(input_df)[0]
        return jsonify({"forecast_turbidity": float(round(prediction, 2))})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# 🔹 Predictive Maintenance Endpoint
@app.route('/maintenance-check', methods=['POST'])
def maintenance_check():
    data = request.get_json()
    input_df = pd.DataFrame([data])
    prediction = maintenance_model.predict(input_df)[0]
    status = "⚠️ Maintenance Alert" if prediction == 1 else "✅ All Clear"
    return jsonify({"maintenance_status": status})

# 🔚 Start the server
if __name__ == '__main__':
    app.run(debug=True, port=5000)
