# Prueba de Rendimiento - Login con k6 y FakeStore API

## Descripción
Este proyecto contiene la automatización de una prueba de rendimiento sobre el endpoint de login de la API pública [FakeStore API](https://fakestoreapi.com/).
El objetivo es validar que el servicio de autenticación soporte una carga de **20 TPS (transacciones por segundo)** durante 30 segundos, cumpliendo los criterios de aceptación definidos en los umbrales (thresholds): tiempo de respuesta en el percentil 95 menor a 1500 ms y tasa de errores HTTP menor al 3%.

## Tecnologías y Herramientas Utilizadas
* **Lenguaje:** JavaScript
* **Herramienta de performance:** k6
* **Executor:** `constant-arrival-rate` (tasa de llegada constante)
* **Gestión de datos:** CSV
* **Reporte:** k6-reporter (HTML) + k6-summary (TXT)

## Pre-requisitos
Para ejecutar este proyecto de forma local, debe tener instalado y configurado lo siguiente:

1. **k6:** La herramienta de pruebas de rendimiento debe estar instalada en su sistema.
   Para verificar ejecute:
```
k6 version
```
   Si no lo tiene instalado, puede descargarlo desde: https://grafana.com/docs/k6/latest/set-up/install-k6/



## Instrucciones paso a paso para la ejecución

**Paso 1: Clonar el repositorio**
Clone el repositorio en su máquina local ejecutando el siguiente comando:
```
git clone https://github.com/FranciscoTeran2001/k6-performance-test.git
```

**Paso 2: Navegar a la carpeta del proyecto**
Una vez clonado, abra su terminal y sitúese dentro de la carpeta específica de este ejercicio:
```
cd k6-performance-test
```

**Paso 3: Ejecutar la prueba**
Para correr la prueba de rendimiento y generar los reportes automáticamente, ejecute el siguiente comando en la terminal:
```
k6 run script.js
```

**Paso 4: Visualizar los resultados**
Durante la ejecución, k6 mostrará en consola las métricas en tiempo real. Al finalizar, se generarán automáticamente dos reportes en la carpeta `reports/`:

- **Reporte visual (HTML):** Navegue a la siguiente ruta en su explorador de archivos:
```
reports/reporte_resultado.html
```
Haga doble clic en el archivo `reporte_resultado.html` para abrirlo en su navegador.

- **Reporte en texto (TXT):** Puede abrirlo con cualquier editor de texto:
```
reports/reporte_resultado.txt
```

De igual manera se encuentra el reporte de las pruebas que se realizaron con anterioridad en la carpeta `reports/`.

