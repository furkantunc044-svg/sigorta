@echo off
chcp 65001 > nul
echo ========================================================
echo  Artse Sigorta - GitHub Yukleme ve Canliya Alma Islemi
echo ========================================================
echo.
echo Kodlar GitHub'a gonderiliyor...
echo Eger tarayici acilirsa "Authorize" / "Sign in" tusuna basin.
echo.

cd /d "%~dp0"
git push -u origin main

echo.
if %errorlevel% equ 0 (
    echo ========================================================
    echo  ISLEM BASARILI! Kodlar GitHub'a yuklendi.
    echo  Vercel su an sitenizi otomatik olarak derleyip yayina aliyor.
    echo  1-2 dakika icinde linkiniz aktif olacaktir.
    echo ========================================================
) else (
    echo Hata olustu! Lutfen ekrandaki hatayi kontrol edin.
)

echo.
pause
