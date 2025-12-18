// server.js
const jsonServer = require("json-server");
// const auth = require("json-server-auth");
const cors = require("cors");

const app = jsonServer.create();
const router = jsonServer.router("data.json");

// Bind router db to app (important!)
app.db = router.db;

// Middlewares
app.use(cors());    
app.use(jsonServer.defaults());
// app.use(auth);
app.use(router);

app.listen(3001, () => {
  console.log("JSON Serve is running on http://localhost:3001");
});
