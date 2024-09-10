//calling in dependencies
const express = require("express");
require("dotenv").config();
const depositRoutes = require("./routes/depositRoutes");
const {logger}=require('./config/logger')
const morgan=require('morgan')

//setting up prometheus
const client = require("prom-client");
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ register: client.register });

//middlewares
const app = express();
app.use(express.json());

const morganFormat = ":method :url :status :response-time ms";

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
     skip: (req) => req.url === "/metrics"
  })
);

//connect db
require("./config/db").connect();

//routes
app.use("/api/v1", depositRoutes);

app.get("/", (req, res) => {
  res.send("ETH DEPOSIT TRACKER ON SEPOLIA");
});

app.get("/metrics", async (req, res) => {
  res.setHeader("Content-Type", client.register.contentType);
  const metrics = await client.register.metrics();
  res.send(metrics);
});

//connect to the port and start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
