const fs = require('fs');
const cors = require('cors');
const path = require('path');
const jsonServer = require('json-server');
const auth = require('json-server-auth');
const middlewares = jsonServer.defaults()

const app = jsonServer.create();

// Middleware to add CORS headers manually
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Origin', 'https://bqac-greysmpich.vercel.app/');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
const router = jsonServer.router(path.join(__dirname, 'db.json'));

const port = process.env.PORT || 8080;

const rules = auth.rewriter(JSON.parse(fs.readFileSync(path.join(__dirname, 'routes.json'))));

// /!\ Bind the router db to the app
app.db = router.db

// You must apply the auth middleware before the router
app.use(middlewares);
app.use(rules);
app.use(auth);
app.use(router);
app.listen(port, () => {
    console.log(`JSON Server is running in ${port}`);
});