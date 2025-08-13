# Aqua Maverick IIoT System 💧⚙️

## Overview
**Aqua Maverick** is an Industrial IoT (IIoT) solution for **Industrial Water Quality Monitoring, Management, and Predictive Maintenance**.  
It integrates:

- **PLC Control** for real-time process automation
- **Node-RED Dashboard** for visualization and control
- **Webpage** for project overview and quick access to the dashboard

The system continuously monitors critical water parameters like **pH**, **TDS**, **Temperature**, and **Turbidity**, enabling automated safety control and data-driven decision-making.

---

## Features
- 🌐 **Project Webpage** — Team and project info with a link to the live dashboard  
- 📊 **Node-RED Dashboard** — Real-time and historical water quality monitoring  
- ⚙️ **PLC Program** — Controls valves, triggers alarms, and manages process logic  
- 💾 **Data Logging** — Stores sensor readings locally and for cloud sync  
- 🛡 **Safety Control** — Automated valve control based on SAFE/UNSAFE logic  
- 🔗 **Integration Ready** — Can connect with ML models for anomaly detection and maintenance forecasting ([ML Repo](https://github.com/ORG_NAME/aqua-maverick-ml))

---

## Repository Structure
```plaintext
/webpage
    index.html          # Project webpage
    style.css           # Web styling
    script.js           # Animations and interactivity

/node-red
    AQUA MAVERICK - NodeRed.json   # Node-RED flow for dashboard

/plc
    AQUA MAVERICK - PLC PROGRAM.smart  # Siemens S7-200 SMART PLC program
```

---

## How to Run

### 1️⃣ Webpage (Project Overview)
1. Open `index.html` in any modern web browser.
2. Click **"Open Dashboard"** to launch the Node-RED UI.

### 2️⃣ Node-RED Dashboard
1. Install [Node-RED](https://nodered.org/).
2. Import `AQUA MAVERICK - NodeRed.json` into Node-RED.
3. Deploy and open the dashboard URL (usually [http://localhost:1880/ui](http://localhost:1880/ui)).

### 3️⃣ PLC Program
1. Open `AQUA MAVERICK - PLC PROGRAM.smart` in Siemens STEP 7 MicroWIN SMART.
2. Connect to your S7-200 SMART PLC.
3. Download the program and run.

---

## System Architecture
```plaintext
Sensors → PLC (S7-200 SMART) → Node-RED Dashboard → Operators / Cloud
```
- PLC handles **real-time safety control**.
- Node-RED manages **visualization and data logging**.
- Webpage provides **project context and quick access**.
- Optional ML module can connect via API for advanced analytics.

---

## Related Projects
- 🤖 **Machine Learning Module** — [ML Models]([https://github.com/ORG_NAME/aqua-maverick-ml](https://github.com/Aqua-Mavericks/ML-Build))

---

## Team
**Aqua Mavericks** — Innovators in Industrial Automation and Smart Water Systems.


