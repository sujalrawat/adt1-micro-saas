import express from 'express';
import cors from 'cors';
import fs from 'fs';
import generateDoc from "./routes/generateDocs.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

if(!fs.existsSync("output")){
  fs.mkdirSync("output")
}

app.use('/api',generateDoc);


app.listen(PORT,(err) => {
  if(err) console.log(err.message);
  else console.log("Server listening on port "+PORT);
})