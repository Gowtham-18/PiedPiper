/* const express = require('express');
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
}); */

/* const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Example dataset (expand this with all your metrics and products)
const products = [
    { name: 'Ale', emissions: 0.49, landUse: 0.81, waterWithdrawals: 49.40, waterScarcity: 1891.15, eutrophication: 1.63 },
    { name: 'Almond butter', emissions: 0.39, landUse: 7.68, waterWithdrawals: 6846.47, waterScarcity: 402211.96, eutrophication: 18.72 },
    // Add the rest of your products here...
];

// Normalizes a value within a range defined by the min and max values of that metric across all products
function normalize(value, min, max) {
    return (value - min) / (max - min);
}

// Calculates the Environmental Impact Score for a product
function calculateEIS(product) {
    // Get min and max for each metric
    const metrics = ['emissions', 'landUse', 'waterWithdrawals', 'waterScarcity', 'eutrophication'];
    const minMax = metrics.map(metric => {
        return {
            metric,
            min: Math.min(...products.map(p => p[metric])),
            max: Math.max(...products.map(p => p[metric]))
        };
    });

    // Normalize each metric for the product and calculate average
    const normalizedScores = minMax.map(({ metric, min, max }) => normalize(product[metric], min, max));
    const eis = normalizedScores.reduce((acc, score) => acc + score, 0) / normalizedScores.length;

    return eis;
}

app.use(express.static('public'));

app.post('/api/evaluate', (req, res) => {
    const productName = req.body.productName.toLowerCase();
    const product = products.find(p => p.name.toLowerCase() === productName);

    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }

    const eis = calculateEIS(product);

    res.json({ name: product.name, EIS: eis.toFixed(2) }); // Returns the EIS rounded to 2 decimal places
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); */

const path = require('path');
const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.json());

// Serve static files from the root directory or 'public' if your files are in a 'public' directory
app.use(express.static('public')); // or app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/evaluate', async (req, res) => {
    const { productName } = req.body;
  
    try {
      const mlResponse = await axios.post('https://usw5-dsml.dm-us.informaticacloud.com/ml-predict/api/v1/deployment/request/hbjqW07i2QUhLHnCahfgkY/', {
        food_item: productName
      });
  
      const modelOutput = mlResponse.data.model_output;
      res.json({ productName: productName, EIS: modelOutput });
    } catch (error) {
      console.error('Error calling ML model:', error.message);
      res.status(500).json({ error: 'Failed to evaluate product' });
    }
  });
  

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


