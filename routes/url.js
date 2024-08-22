import express from "express";

import { handleGenerateShortURL, handleGetAnalytics, handleRedirectURL } from '../controllers/url.js';

const router = express.Router()

router.post('/', handleGenerateShortURL)

router.get('/:shortId', handleRedirectURL)

router.get("/analytics/:shortId", handleGetAnalytics);

export default router;