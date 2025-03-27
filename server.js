const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Set proper MIME type for SVG files
express.static.mime.define({'image/svg+xml': ['svg']});

// Serve static files (CSS, JS, images, etc.)
app.use(express.static(__dirname));

// Serve case studies pages
app.get('/case-studies/:page', (req, res) => {
    const page = req.params.page;
    res.sendFile(path.join(__dirname, 'case-studies', page));
});

// Serve case studies index
app.get('/case-studies', (req, res) => {
    res.sendFile(path.join(__dirname, 'case-studies/index.html'));
});

// Serve main index.html for root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle all other routes
app.get('*', (req, res) => {
    res.redirect('/');
});

// Start the server
app.listen(port, () => {
    console.log(`BrainByteLabs website is running at http://localhost:${port}`);
    console.log(`Press Ctrl+C to stop the server`);
});