# Prueba de Rendimiento - Login con k6 y FakeStore API

## Descripción
Este proyecto contiene la automatización de una prueba de rendimiento sobre el endpoint de login de la API pública [FakeStore API](https://fakestoreapi.com/).
El objetivo es validar que el servicio de autenticación soporte una carga de **20 TPS (transacciones por segundo)** durante 30 segundos, cumpliendo los criterios de aceptación definidos en los umbrales (thresholds): tiempo de respuesta en el percentil 95 menor a 1500 ms y tasa de errores HTTP menor al 3%.

## Tecnologías y Herramientas Utilizadas
* **Lenguaje:** JavaScript
* **Herramienta de performance:** k6
* **Tipo de prueba:** Prueba de carga (Load Test)
* **Executor:** `constant-arrival-rate` (tasa de llegada constante)
* **Gestión de datos:** CSV con `SharedArray` de k6
* **Reporte:** k6-reporter (HTML) + k6-summary (TXT)

## Pre-requisitos
Para ejecutar este proyecto de forma local, debe tener instalado y configurado lo siguiente:

1. **k6:** La herramienta de pruebas de rendimiento debe estar instalada en su sistema.
   Para verificar ejecute:
```
k6 version
```
   Si no lo tiene instalado, puede descargarlo desde: https://k6.io/docs/getting-started/installation/

2. **Conexión a Internet:** El script descarga las librerías de reporte automáticamente desde GitHub y jslib.k6.io al momento de la ejecución, por lo que se requiere acceso a internet.

## Estructura del Proyecto
```
ejercicio_rendimiento_k6/
│
├── data/
│   └── usuarios.csv         # Credenciales de los 5 usuarios de prueba
│
├── reports/
│   ├── reporte_resultado.html  # Reporte visual generado por k6-reporter
│   └── reporte_resultado.txt   # Resumen en texto con thresholds, checks y métricas
│
├── script.js                # Script principal de k6
├── conclusiones.txt         # Hallazgos y conclusiones del ejercicio
├── .gitignore
└── README.md
```

## Instrucciones paso a paso para la ejecución

**Paso 1: Navegar a la carpeta del proyecto**
Asegúrese de abrir su terminal y situese dentro de la carpeta específica de este ejercicio:
```
cd ejercicio_rendimiento_k6
```

**Paso 2: Ejecutar la prueba**
Para correr la prueba de rendimiento y generar los reportes automáticamente, ejecute el siguiente comando en la terminal:
```
k6 run script.js
```

**Paso 3: Visualizar los resultados**
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

## Configuración de la Prueba

| Parámetro | Valor |
|-----------|-------|
| Executor | `constant-arrival-rate` |
| Tasa de carga (TPS) | 20 peticiones/segundo |
| Duración | 30 segundos |
| VUs pre-asignados | 50 |
| Endpoint | `POST https://fakestoreapi.com/auth/login` |
| Usuarios de prueba | 5 (cargados desde CSV, rotación circular) |

## Criterios de Aceptación (Thresholds)

| Métrica | Umbral definido | Resultado obtenido |
|---------|----------------|--------------------|
| `http_req_duration` p(95) | < 1500 ms | ✅ 414 ms |
| `http_req_failed` rate | < 3% | ✅ 0.00% |
