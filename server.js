const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

app.post('/api/evaluate', (req, res) => {
    const productName = req.body.productName;
    // Here, integrate your ML model API to get the score based on productName
    // Mock response:
    const score = Math.floor(Math.random() * 3) + 1; // Replace with actual API call
    res.json({ score });
});

app.listen(port, () => {
  console.log(`PiedPiper app listening at http://localhost:${port}`);
});
