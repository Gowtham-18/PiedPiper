/* function evaluateProduct() {
  const productName = document.getElementById('productName').value;
  fetch('/api/evaluate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productName }),
  })
  .then(response => response.json())
  .then(data => {
    let impactLevel = '';
    switch(data.score) {
      case 1:
        impactLevel = 'Low';
        break;
      case 2:
        impactLevel = 'Medium';
        break;
      case 3:
        impactLevel = 'High';
        break;
      default:
        impactLevel = 'Unknown';
    }
    document.getElementById('score').innerHTML = `Environmental Impact: ${data.score} (${impactLevel})`;
    updateScale(data.score);
  })
  .catch(error => console.error('Error:', error));
} */

const { response } = require("express");

/*function updateScale(score) {
  // Reset scale classes
  document.getElementById('scale-low').classList.remove('active');
  document.getElementById('scale-medium').classList.remove('active');
  document.getElementById('scale-high').classList.remove('active');

  // Arrow adjustment
  const arrow = document.getElementById('scale-arrow');
  arrow.classList.remove('low', 'medium', 'high');

  // Activate the current score
  if(score === 1) {
    document.getElementById('scale-low').classList.add('active');
    arrow.classList.add('low');
  } else if(score === 2) {
    document.getElementById('scale-medium').classList.add('active');
    arrow.classList.add('medium');
  } else if(score === 3) {
    document.getElementById('scale-high').classList.add('active');
    arrow.classList.add('high');
  }
}

function evaluateProduct() {
  const productName = document.getElementById('productName').value;
  
  fetch('/api/evaluate', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productName }),
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Product not found');
      }
      return response.json();
  })
  .then(data => {
      document.getElementById('score').innerHTML = `The Environmental Impact Score for ${data.productName} is: ${data.EIS}`;
  })
  .catch(error => {
      console.error('Error:', error);
      document.getElementById('score').innerHTML = error.toString();
  });
} */

function evaluateProduct() {
  const productName = document.getElementById('productName').value;
  
  fetch('/api/evaluate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productName: productName }),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch prediction from the server');
    }
    return response.json();
  })
  .then(data => {
    document.getElementById('score').innerHTML = `Prediction result: ${data.EIS}`;
  })
  .catch(error => {
    console.error('Error:', error);
    document.getElementById('score').innerHTML = `Error: ${error.message}`;
  });
}


// Optional: Update the scale based on the model output
function updateScale(score) {
  // Reset scale classes
  document.getElementById('scale-low').classList.remove('active');
  document.getElementById('scale-medium').classList.remove('active');
  document.getElementById('scale-high').classList.remove('active');

  // Arrow adjustment
  const arrow = document.getElementById('scale-arrow');
  arrow.classList.remove('low', 'medium', 'high');

  // Activate the current score on the scale
  if(score <= 1) { // Assuming a score of 1 or lower means 'Low'
    document.getElementById('scale-low').classList.add('active');
    arrow.classList.add('low');
  } else if(score <= 2) { // Assuming a score of 2 or lower means 'Medium'
    document.getElementById('scale-medium').classList.add('active');
    arrow.classList.add('medium');
  } else { // Any score above 2 means 'High'
    document.getElementById('scale-high').classList.add('active');
    arrow.classList.add('high');
  }
}
