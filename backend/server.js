// server.js
const Fastify = require('fastify');
const app = Fastify({ logger: true });

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');


const dataFilePath = path.join(__dirname, 'data.yml');

app.register(require('@fastify/cors'), {
  origin: (origin, cb) => {
    // Разрешаем запросы из localhost
    if (!origin || /localhost/.test(origin)) {
      cb(null, true);
      return;
    }
    // Запрещаем остальные запросы
    cb(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST'],
})

// Ручка для сохранения верстки и стилей
app.post('/api/saveSettings', async (request, reply) => {
  try {
    const { layout, styles } = request.body;
    const data = { layout, styles };
    fs.writeFileSync(dataFilePath, yaml.dump(data));
    reply.send({ success: true });
  } catch (error) {
    reply.status(500).send({ success: false, error: error.message });
  }
});

// Ручка для сохранения верстки и стилей
app.get('/', async (request, reply) => {
  reply.send({ ok: true });
});

// Ручка для получения данных для компонента
app.get('/api/getData', async (request, reply) => {
  try {
    const rawData = fs.readFileSync(dataFilePath, 'utf8');
    const data = yaml.load(rawData);
    reply.send(data);
  } catch (error) {
    reply.status(500).send({ error: error.message });
  }
});

const port = process.env.APP_PORT || 5001;
const host = process.env.APP_HOST || '0.0.0.0';

// Start listening.
app.listen({port, host}, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`Server listening on ${address}`);
});

