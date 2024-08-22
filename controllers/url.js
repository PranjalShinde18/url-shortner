import { nanoid } from 'nanoid';
import URL from '../models/url.js'; // Ensure URL model supports ES module import

export async function handleGenerateShortURL(req, res) {
    const body = req.body;

    if (!body.url) return res.status(400).json({ error: "URL is required" });

    const shortId = nanoid(8);
    await URL.create({
        shortId: shortId,
        redirectUrl: body.url,
        visitHistory: [],
    });

    return res.json({ id: shortId });
}


export async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
}


export async function handleRedirectURL(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                },
            },
        }
    );
    res.redirect(entry.redirectUrl);
};


export default {
    handleGenerateShortURL,
    handleRedirectURL,
    handleGetAnalytics,
}