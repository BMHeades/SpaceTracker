import express from 'express'
import { getHorizonsData } from './utils/horizons.js';
import { extractData } from './utils/extract.js';

const majorBodyID = -143205 // TESLA ROADSTER
const data = await getHorizonsData(majorBodyID);
console.log(extractData(data))