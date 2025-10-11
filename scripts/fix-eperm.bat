@echo off
echo ============================================
echo 🔧 Solucionando errores EPERM en Windows
echo ============================================
echo.

echo 📁 Eliminando carpeta .next...
if exist ".next" (
    rmdir /s /q ".next" 2>nul
    if %errorlevel% equ 0 (
        echo ✅ Carpeta .next eliminada
    ) else (
        echo ❌ Error al eliminar .next - intentar como administrador
    )
) else (
    echo ✅ Carpeta .next no existe
)

echo.
echo 📦 Eliminando node_modules...
if exist "node_modules" (
    rmdir /s /q "node_modules" 2>nul
    if %errorlevel% equ 0 (
        echo ✅ Carpeta node_modules eliminada
    ) else (
        echo ❌ Error al eliminar node_modules - intentar como administrador
    )
) else (
    echo ✅ Carpeta node_modules no existe
)

echo.
echo 📦 Reinstalando dependencias...
npm install
if %errorlevel% equ 0 (
    echo ✅ Dependencias instaladas correctamente
) else (
    echo ❌ Error al instalar dependencias
    pause
    exit /b 1
)

echo.
echo 🚀 Iniciando servidor de desarrollo...
echo Presiona Ctrl+C para detener el servidor
npm run dev

pause 