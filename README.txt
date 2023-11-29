/---------------------------------------------------------------------------------------------------------------------------/

-> Iniciar el entorno virtual usando el archivo Activate.ps1, ejecutar vía powershell/cmd

-> Se encuentra instalado Django y DjangoRest en el ambiente

-> Instalar chocolatey (gestor de paquetes para windows)
    -> Abrir powershell como administrador
    -> Ejecutar comando: 
        Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

-> Para usar chocolatey, abrir CMD como administrador

-> Instalar node via chocolatey
    choco install -y nodejs-lts

-> Seguir instrucciones de https://reactnative.dev/docs/environment-setup?guide=native&platform=android&os=windows

-> Otherwise, instalar usando
    npm i react-native

/---------------------------------------------------------------------------------------------------------------------------/
Cosas Que deben instalar para FrontEnd:
Antes:
    npm install @react-navigation/native
    npm install @react-navigation/bottom-tabs
    npm install react-native-screens react-native-safe-area-context
    npm install @react-navigation/stack
    npm install @react-navigation/native-stack
10/11/2023:
    npm install react-native-date-picker
    npm i @react-native-async-storage/async-storage
13/11/2023:
    npm install react-native-webview
    npm install react-native-youtube-iframe
15/11/2023:
    npm i @react-native-community/geolocation

/---------------------------------------------------------------------------------------------------------------------------/

-> Abrir SDK Manager de android studio
    -> Instalar 
        Android SDK platform 34
        Sources for android 34
        Google APIs Intel x86_64 Atom System Image
        Android SDK command-line tools
        Android Emulator
        Android Emulator hypervisor driver
        Android SDK platform-tools

-> Conectar dispositivo android en modo de depuración y conectar por adb
    https://reactnative.dev/docs/running-on-device

-> Moverse a carpeta de Clapsfront y ejecutar
    npx react-native run-android

    para probar la aplicación

Django Dependencies:
    pip install django
    pip install djangorestframework
    pip install djangorestframework-simplejwt
    pip install django-cors-headers


/---------------------------------------------------------------------------------------------------------------------------/