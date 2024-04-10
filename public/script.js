function evaluateProduct() {
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
      document.getElementById('score').innerHTML = `Environmental Impact Score: ${data.score}`;
    })
    .catch(error => console.error('Error:', error));
  }
  