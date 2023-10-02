// import { initiaApp } from "./src/utiles/initiatapp.js";
// app.use(cors());
// const cors = require('cors');
// import cors from cors
// app.user cors()
import cors from 'cors';

import express from 'express'

import { config } from "dotenv";
import path from 'path';

// config({path:'../pro/config'})
config({ path: path.resolve('config/.env')})
import initiaApp from './src/utiles/initiatapp.js';

const app = express()
app.use(cors());

initiaApp(app , express)