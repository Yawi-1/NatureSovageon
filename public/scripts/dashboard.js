document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('productForm');
  const tableBody = document.getElementById('productTableBody');
  const loadingSpinner = document.querySelector('.loading-spinner');
  const errorMessage = document.querySelector('.error-message');

  async function fetchProducts() {
    try {
      loadingSpinner.style.display = 'block';
      errorMessage.style.display = 'none';
      
      const res = await fetch('/api/products');
      if (!res.ok) throw new Error('Failed to fetch');
      
      const data = await res.json();
      const {products} = data.data
      renderProducts(products);
    } catch (error) {
      errorMessage.style.display = 'block';
      console.error('Fetch error:', error);
    } finally {
      loadingSpinner.style.display = 'none';
    }
  }

  function renderProducts(products) {
    tableBody.innerHTML = '';
    products.forEach((product, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${product.title}</td>
        <td>${product.description}</td>
        <td>${product.category}</td>
        <td>
          ${product.image ? 
            `<img class="product-image" src="${product.image}" alt="${product.title}">` : 
            'No Image'}
        </td>
      `;
      tableBody.appendChild(row);
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) throw new Error('Submission failed');
      
      form.reset();
      await fetchProducts();
    } catch (error) {
      alert('Error adding product: ' + error.message);
    }
  });

  // Initial load
  fetchProducts();
});