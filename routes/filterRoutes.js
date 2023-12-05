import express from 'express'
import { filter, search } from '../controller/filter.js';

const filterRouter = express.Router();

filterRouter.get("/filter", filter);

filterRouter.get("/search", search)

export default filterRouter;