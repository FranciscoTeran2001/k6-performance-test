import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

// 1. Carga el CSV
const usuarios = new SharedArray('usuarios', function () {
  return open('./data/usuarios.csv')
    .split('\n')
    .slice(1) // quita la cabecera user,passwd
    .filter(line => line.trim() !== '')
    .map(line => {
      const [user, passwd] = line.split(',');
      return { user: user.trim(), passwd: passwd.trim() };
    });
});

// 2. Configuración del escenario
export const options = {
  scenarios: {
    carga: {
      executor: 'constant-arrival-rate',
      rate: 20,        // 20 peticiones por segundo = 20 TPS
      timeUnit: '1s',
      duration: '30s', // duración de la prueba
      preAllocatedVUs: 50,
    },
  },
  thresholds: {
    http_req_duration: ['p(95)<1500'], // 95% de requests bajo 1.5s
    http_req_failed: ['rate<0.03'],    // menos del 3% de errores
  },
};

// 3. Lógica de cada petición
export default function () {
  // Elige un usuario del CSV de forma rotativa
  const usuario = usuarios[__VU % usuarios.length];

  const payload = JSON.stringify({
    username: usuario.user,
    password: usuario.passwd,
  });

  const headers = { 'Content-Type': 'application/json' };

  // Hace el POST de login
  const res = http.post('https://fakestoreapi.com/auth/login', payload, { headers });

  // 4. Validaciones
  check(res, {
    'status es 201': (r) => r.status === 201,
    'respuesta tiene token': (r) => r.json('token') !== undefined,
    'tiempo menor a 1.5s': (r) => r.timings.duration < 1500,
  });

  sleep(0.1);
}

// 5. Reporte automático al finalizar
export function handleSummary(data) {
  return {
    'reports/reporte_resultado.html': htmlReport(data),                           // reporte visual
    'reports/reporte_resultado.txt':  textSummary(data, { enableColors: false }), // thresholds + checks + VUs + network
  };
}