@echo off
title ARTSE Carousel Studio
echo ARTSE Carousel Studio Baslatiliyor...
echo.
echo Bu bilgisayardan erisim: http://localhost:5173
echo Diger bilgisayarlardan/telefonlardan erisim: http://192.168.1.106:5173
echo.
echo Kapatmak icin bu pencereyi kapatabilirsiniz.
echo.
call npm.cmd run dev -- --host 0.0.0.0 --port 5173
pause
