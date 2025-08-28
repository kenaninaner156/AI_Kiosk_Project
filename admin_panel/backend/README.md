
Admin Panel Backend
Setup
powershell
Kodu kopyala
cd C:\Users\kenan\Documents\GitHub\hotel-assistant\AI_Kiosk_Project\admin_panel\backend
py -3.13 -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Run
powershell
Kodu kopyala
uvicorn app:app --host 127.0.0.1 --port 7070
