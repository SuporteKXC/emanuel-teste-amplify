import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
// Your static pre-build assets folder
app.use(express.static(join(__dirname, '..', 'dist')));
// Root Redirects to the pre-build assets
app.get('/', function (req, res) {
  res.sendFile(join(__dirname, '..', 'dist'));
});
// Any Page Redirects to the pre-build assets folder index.html that // will load the react app
app.get('*', function (req, res) {
  res.sendFile(join(__dirname, '..', 'dist/index.html'));
});

app.listen(port, () => {
  console.log('Server is running on port: ', port);
});
