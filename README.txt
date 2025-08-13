IIOT WATER QUALITY MONITORING PROJECT - README

----------------------------------------
REQUIREMENTS
----------------------------------------
- Python 3.10
- Node-RED + Node.js
- PLC programming tool (for CPU S7 200)
- Flask, scikit-learn, pandas, numpy (install via pip)
- Ethernet or Wi-Fi network

----------------------------------------
SETUP STEPS
----------------------------------------

1. PLC SETUP
   - Load ladder logic/program on PLC for reading sensors & controlling actuator.
   - Configure PLC to communicate over Modbus TCP.

3. GATEWAY/ML API
   - On PC, clone or download project files.
   - Open a terminal. Go to "C:\Users\Desktop\AQUA MAVERICK-IIoT Project\Machine Learning Environment & Files" folder.(maybe different path in your folder)
   - Install Python packages:
                             "pip install numpy==1.22.4 scikit-learn==1.2.2 pandas==1.5.3 flask joblib matplotlib"
   after downloading.........
   - Start ML API: 
                  ".\waterenv\Scripts\Activate"
      then        "python app.py"

   - If you ever want to disable it later, just run
     powershell
     Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Restricted
4. DASHBOARD (Node-RED)
   - Start Node-RED by running command in command prompt : node-red
   - Open browser at 'http://localhost:1880'
   - Import dashboard- AQUA MAVERICK - NodeRed.json from project folder.
   - Deploy flow and make sure sensors, ML API and PLC data show up.

5. RUN
   - ML API returns Safe/Warning/Danger status.
   - PLC controls pump/motor/valve as per ML output.
   - Dashboard shows live readings and WQI (Water Quality Index).

6. DATA LOGGING
   - System logs all readings and predictions to .csv files in /logs folder.
    (for this change the folder location in data logger group according to your PC)

----------------------------------------
NOTES
----------------------------------------
- Config files are in the project folder (config.py or .env).
- All code is for demo/research, use at your own risk.

----------------------------------------
CONTACT
----------------------------------------
Made by Aqua Maverick, DSEU, 2025.

