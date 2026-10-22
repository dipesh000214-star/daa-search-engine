const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/search', async (req, res) => {
  const q = String(req.query.q || '').trim();
  const type = String(req.query.type || 'web');
  if (!q) return res.status(400).json({ error: 'Enter a search query.' });

  const apiKey = process.env.GOOGLE_CSE_API_KEY;
  const cx = process.env.GOOGLE_CSE_ID;
  if (!apiKey || !cx) {
    return res.status(503).json({
      error: 'Live search is not connected yet. Add GOOGLE_CSE_API_KEY and GOOGLE_CSE_ID as described in README.md.'
    });
  }

  const params = new URLSearchParams({ key: apiKey, cx, q, num: '10' });
  if (type === 'images') params.set('searchType', 'image');
  if (type === 'videos') params.set('q', `${q} video`);
  if (type === 'news') params.set('q', `${q} news`);

  try {
    const upstream = await fetch(`https://www.googleapis.com/customsearch/v1?${params}`);
    const data = await upstream.json();
    if (!upstream.ok) {
      const message = data?.error?.message || 'Search provider returned an error.';
      return res.status(upstream.status).json({ error: message });
    }
    const items = (data.items || []).map(item => ({
      title: item.title,
      link: item.link,
      displayLink: item.displayLink,
      snippet: item.snippet
    }));
    res.json({ items });
  } catch (err) {
    res.status(502).json({ error: 'Could not reach the search provider. Please try again.' });
  }
});

app.listen(PORT, () => console.log(`DAA.com is running at http://localhost:${PORT}`));
