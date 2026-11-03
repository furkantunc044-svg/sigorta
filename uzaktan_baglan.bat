@echo off
title ARTSE Carousel Studio - Uzaktan Erisim (Internet Tüneli)
echo ========================================================
echo    ARTSE CAROUSEL STUDIO - INTERNET ERISIM TUNELI
echo ========================================================
echo.
echo Bu pencere acikken dunya uzerindeki herhangi bir cihazdan
echo asagida verilecek HTTPS linki ile stüdyoya erisebilirsiniz.
echo.
echo NOT: Once 'baslat.bat' ile yerel sunucunun acik oldugundan emin olun.
echo.
echo Baglanti olusturuluyor, lutfen bekleyin...
echo.
call npx.cmd localtunnel --port 5173
pause
