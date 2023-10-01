-> iniciar el entorno virtual usando el archivo Activate.ps1, ejecutar vía powershell/cmd

-> se encuentra instalado Django y DjangoRest en el ambiente

-> instalar chocolatey (gestor de paquetes para windows)
    -> abrir powershell como administrador
    -> ejecutar comando: 
        Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

-> para usar chocolatey, abrir CMD como administrador

-> instalar node via chocolatey
    choco install -y nodejs-lts

-> seguir instrucciones de https://reactnative.dev/docs/environment-setup?guide=native&platform=android&os=windows

-> otherwise, instalar usando
    npm i react-native

TAMBIEN INCLUIR 
npm install @react-navigation/native

-> abrir sdk manager de android studio
    -> instalar 
        Android SDK platform 34
        Sources for android 34
        Google APIs Intel x86_64 Atom System Image
        Android SDK command-line tools
        Android Emulator
        Android Emulator hypervisor driver
        Android SDK platform-tools

-> conectar dispositivo android en modo de depuración y conectar por adb
    https://reactnative.dev/docs/running-on-device

-> moverse a carpeta de Clapsfront y ejecutar
    react-native run-android

   para probar la aplicación