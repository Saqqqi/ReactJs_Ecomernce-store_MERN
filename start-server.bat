@echo off
cd C:\Users\Saqqi\Downloads\React_FullStack\backend
start cmd /k "npm run start"

cd C:\Users\Saqqi\Downloads\React_FullStack\frontend
start cmd /k "npm start"

timeout 10   REM Delay for 10 seconds (adjust as needed)

cd C:\Users\Saqqi\Downloads\React_FullStack
code .    REM Opens Visual Studio Code in the current directory