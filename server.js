import { createServer } from 'node:http';
import worker from './worker.js';

const PORT = process.env.PORT || 3000;

createServer(async (req, res) => {
  // Glamaのヘルスチェック（点検）用応答
  if (req.url === '/' || req.url === '/ping') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    return res.end('OK');
  }

  let body = '';
  req.on('data', chunk => { body += chunk; });
  req.on('end', async () => {
    try {
      const url = `http://${req.headers.host || 'localhost'}${req.url}`;
      const request = new Request(url, {
        method: req.method,
        headers: req.headers,
        body: ['GET', 'HEAD'].includes(req.method) ? null : body
      });

      const response = await worker.fetch(request, process.env);
      res.writeHead(response.status, Object.fromEntries(response.headers.entries()));
      const resBody = await response.text();
      res.end(resBody);
    } catch (err) {
      res.writeHead(500);
      res.end(JSON.stringify({ error: err.message }));
    }
  });
}).listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});