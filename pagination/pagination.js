let currentPage = 1;
let itemsPerPage = 10;
let allProducts = [];

const container = document.getElementById('productList');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageInfo = document.getElementById('pageInfo');

// 1. Fetch data
fetch('https://dummyjson.com/products?limit=100')
  .then(res => res.json())
  .then(data => {
    allProducts = data.products;
    if (allProducts.length === 0) {
      container.innerHTML = '<p>No Products Available</p>';
      return;
    }
    renderGrid();
  })
  .catch(err => console.error(err));

// 2. Render function for Grid
function renderGrid() {
  container.innerHTML = '';

  // Pagination Math
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageItems = allProducts.slice(start, end);

  pageItems.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.thumbnail}" alt="${product.title}">
      <div>
          <h3>${product.title}</h3>
          <p class="price">₹ ${product.price}</p>
      </div>
    `;

    // Add click listener for product details
    card.onclick = () =>
      (window.location.href = `product.html?id=${product.id}`);
    container.appendChild(card);
  });

  updatePagination();
}

// 3. Update Page Numbers and Buttons
function updatePagination() {
  const totalPages = Math.ceil(allProducts.length / itemsPerPage);
  pageInfo.innerText = `Page ${currentPage} of ${totalPages}`;

  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

// 4. Button Events
prevBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    renderGrid();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

nextBtn.addEventListener('click', () => {
  const totalPages = Math.ceil(allProducts.length / itemsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderGrid();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});