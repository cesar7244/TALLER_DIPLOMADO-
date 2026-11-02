# Laboratorio Snyk CLI - Diplomado en Ciberseguridad

Este proyecto contiene vulnerabilidades controladas tanto en dependencias (SCA) como en código fuente (SAST) para cumplir con la Práctica N°5.

## Instrucciones:
1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Autenticarse en Snyk:
   ```bash
   snyk auth
   ```
3. Ejecutar análisis de dependencias (SCA):
   ```bash
   snyk test
   ```
4. Ejecutar análisis de código (SAST):
   ```bash
   snyk code test
   ```
