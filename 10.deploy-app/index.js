import express from 'express';
import { config } from "dotenv";
config({path: "./k8s/.env"});
const app = express();
const port = 4010


app.get('/', (req, res) => {
 res.json({...process.env})
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});