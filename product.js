const container = document.getElementById("productDetails");

// 1. Get ID from URL
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

if (!productId) {
    container.innerHTML = "<p>Invalid product.</p>";
} else {
    // 2. Fetch single product using ID
    fetch(`https://dummyjson.com/products/${productId}`)
        .then(res => res.json())
        .then(product => {
            displayProduct(product);
            saveRecentlyViewed(product); 
        })
        .catch(err => {
            container.innerHTML = "<p>Error loading product.</p>";
            console.error(err);
        });
}

// 3. Render product


function displayProduct(product) {
    container.innerHTML = `
        <div class="product-detail-card">
            <img src="${product.thumbnail}" alt="${product.title}">

            <div class="details">
                <h2>${product.title}</h2>

                <p><strong>Description:</strong> ${product.description}</p>
                <p><strong>Price:</strong> ₹ ${product.price}</p>
                <p><strong>Discount:</strong> ${product.discountPercentage}%</p>

                <p><strong>Brand:</strong> ${product.brand}</p>
                <p><strong>Category:</strong> ${product.category}</p>

                <p><strong>Rating:</strong> ⭐ ${product.rating}</p>
                <p><strong>Stock:</strong> ${product.stock}</p>
                <p><strong>Availability:</strong> ${product.availabilityStatus}</p>

                <p><strong>SKU:</strong> ${product.sku}</p>
                <p><strong>Weight:</strong> ${product.weight}</p>

                <p><strong>Warranty:</strong> ${product.warrantyInformation}</p>
                <p><strong>Shipping:</strong> ${product.shippingInformation}</p>
                <p><strong>Return Policy:</strong> ${product.returnPolicy}</p>

                <p><strong>Minimum Order Quantity:</strong> ${product.minimumOrderQuantity}</p>
            </div>
        </div>
    `;
}



//view

function saveRecentlyViewed(product) {
    let recent = JSON.parse(localStorage.getItem("recentProducts")) || [];

    // Remove if already exists
    recent = recent.filter(item => item.id !== product.id);

    // Add to beginning
    recent.unshift({
        id: product.id,
        title: product.title,
        thumbnail: product.thumbnail,
        price: product.price,
        time: Date.now()
    });

    // Limit to last 5 products
    if (recent.length > 5) {
        recent = recent.slice(0, 5);
    }

    localStorage.setItem("recentProducts", JSON.stringify(recent));
}
