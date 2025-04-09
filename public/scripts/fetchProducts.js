const spinner = document.getElementById('spinner');
async function fetchProducts() {
  spinner.classList.remove('hidden');
  try {
    const res = await fetch("http://localhost:3000/api/products"); 
    const data = await res.json();
    const { products } = data.data;

    let container = document.getElementById("product-container");
    let h1 = document.createElement("h1");
    if (products.length === 0) {
      h1.style.color = "red";
      h1.style.fontSize = "24px";
      h1.textContent = "No products found";
      container.append(h1);
    }
    // Insert new products after the existing one (groundnut)
    products.forEach((product) => {
      const div = document.createElement("div");
      div.classList.add("product-card");
      div.innerHTML = `
                <div class="image-container">
                    <img src="${product.image}" alt="${product.title}" class="product-image">
                </div>
                <h3 class="product-title">${product.title}</h3>
            `;
            div.addEventListener('click', () => {
              window.location.href = `/api/products/${product._id}`;
            });
      container.appendChild(div); // this appends just after "groundnut"
    });
  } catch (error) {
    console.error("Error fetching products:", error);
  }
  finally {
    spinner.classList.add('hidden');
}
}

window.addEventListener("DOMContentLoaded", fetchProducts);
