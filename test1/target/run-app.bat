@echo off

if not defined JAVA_HOME (
    echo JAVA_HOME is not set. Please set the JAVA_HOME environment variable.
    exit /b 1
)

start java -jar test1-0.0.1-SNAPSHOT.jar

timeout /t 7 /nobreak

start http://localhost:8080