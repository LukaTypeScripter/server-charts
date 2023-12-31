import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import kpiRoute from './routes/kpi.js'
import productRoutes from './routes/product.js'
import transactionRoutes from './routes/transaction.js'
import  Transaction  from './models/Transaction.js';
import Product from './models/Product.js'
import KPI from './models/KPI.js' 
import {kpis,products,transactions} from './data/data.js'
import { log } from 'console';
/** CONFIGURATIONS */
dotenv.config({ path: fileURLToPath(new URL('./.env', import.meta.url)) });

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
//**ROUTES */
app.use("/kpi",kpiRoute)
app.use("/product", productRoutes);
app.use("/transaction", transactionRoutes);
/** MONGO SETUP */
const PORT = process.env.PORT || 9000;

mongoose.Promise = global.Promise;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName:"Cluster0"
  })
  .then(async() => {
    app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
    try {
      //**ADDED DATA ONE TIME */
      // await mongoose.connection.db.dropDatabase();
      // await KPI.insertMany(kpis);
      // console.log('Data inserted successfully.');
      // await Transaction.insertMany(transactions);
      // await Product.insertMany(products);
    } catch (error) {
      console.error('Error inserting data into MongoDB:', error);
    }
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
