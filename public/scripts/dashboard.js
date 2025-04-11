document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('productForm');
  const tableBody = document.getElementById('productTableBody');
  const loadingSpinner = document.querySelector('.loading-spinner');
  const errorMessage = document.querySelector('.error-message');
  const logoutBtn = document.getElementById('logout');
  const menuButton = document.getElementById('menuBtn')

  let isOpen = false;
    menuButton.addEventListener('click',()=>{
      if(isOpen){
        logoutBtn.style.top = '-3rem';
        isOpen = false;
      }else{
        logoutBtn.style.top = '4rem';
        isOpen = true;
      }
    })
  // Fetch products on page load
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

  // Render products in table body
  function renderProducts(products) {
    tableBody.innerHTML = '';
    products.forEach((product, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
          <td>
          ${product.image ? 
            `<img class="product-image" src="${product.image}" alt="${product.title}">` : 
            'No Image'}
        </td>
        <td>${product.title}</td>
        <td>${product.description}</td>
        <td>${product.category}</td>
        <td><button'> <i class="fa fa-trash-o" style="font-size:24px;color:red"></i></button></td>
      
      `;
      tableBody.appendChild(row);
    });
  }

  // Form to add new product
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        body: formData
      });
       
      if (!response.ok) throw new Error('Submission failed');
      alert('New product added')
      
      form.reset();
      await fetchProducts();
    } catch (error) {
      alert('Error adding product: ' + error.message);
    }
  });

  // Logout button
  logoutBtn.addEventListener('click',()=>{
    fetch('http://localhost:3000/api/auth/logout',{
      method:'POST',
    })
    .then(()=>{
      window.location.href = 'http://localhost:3000/api/auth/login'
      alert('Logged out')
    })
    .catch((err)=>{
      alert('Error logging out : ' + err)
    }) 
  })


  // Initial load
  fetchProducts();
});