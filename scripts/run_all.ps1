Start-Process powershell -ArgumentList '-NoExit','-Command','cd ..\admin_panel\backend; uvicorn app:app --host 127.0.0.1 --port 7070'
Start-Process powershell -ArgumentList '-NoExit','-Command','cd ..\admin_panel\frontend; npm run dev'
