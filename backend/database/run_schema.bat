@echo off
"C:\laragon\bin\mysql\mysql-8.4.3-winx64\bin\mysql.exe" -u root --password= < "%~dp0schema.sql"
echo.
echo Banco de dados criado! Pressione qualquer tecla para fechar.
pause
