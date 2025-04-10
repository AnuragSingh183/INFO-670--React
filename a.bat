@echo off
start "" "C:\Users\<arkha>\AppData\Local\Android\Sdk\emulator\emulator.exe" -avd Pixel_7_Pro_API_35
timeout /t 10
npx expo start
