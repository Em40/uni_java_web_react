import axios from 'axios';
import { createCarQueryClient } from './CarQueryClient';
import { createBrandQueryClient } from './BrandQueryClient';
import { createModelQueryClient } from './ModelQueryClient';
import { createFuelTypeQueryClient } from './FuelTypeQueryClient';
import { createTransmissionQueryClient } from './TransmissionQueryClient';
import { createAuthQueryClient } from './AuthQueryClient';

const Axios = axios.create();
Axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
Axios.defaults.headers.common['Access-Control-Allow-Methods'] =
  'GET, POST, PATCH, PUT, DELETE, OPTIONS';
Axios.defaults.headers.common['Access-Control-Allow-Headers'] =
  'Origin, Content-Type, X-Auth-Token';

export const carQueryClient = createCarQueryClient(Axios);
export const brandQueryClient = createBrandQueryClient(Axios);
export const modelQueryClient = createModelQueryClient(Axios);
export const fuelTypeQueryClient = createFuelTypeQueryClient(Axios);
export const transmissionQueryClient = createTransmissionQueryClient(Axios);
export const authQueryClient = createAuthQueryClient(Axios)