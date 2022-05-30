import express from 'express';
import morgan from 'morgan';
import path from 'path';

import indexRoutes from './routes/index';

const app = express();

// settings
app.set('port', process.env.PORT || 3080);
app.use(express.json());
app.use(morgan('dev'));
app.use('/api', indexRoutes);
app.use('/uploads', express.static(path.resolve('public'))); // server can access public folder

export default app;