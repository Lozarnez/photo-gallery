import {connect} from 'mongoose';

export async function connection() {
  await connect('mongodb://localhost/photo-gallery-db');
  console.log('Connected to MongoDB');
}