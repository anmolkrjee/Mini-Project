let allProducts = [];

fetch("https://dummyjson.com/products")
    .then(response => response.json())
    .then(data => {
        allProducts = data.products;
        displayProducts(allProducts);
    })
    .catch(error => {
        console.log("Error:", error);
    });

function displayProducts(products) {
    const container = document.getElementById("productContainer");
    container.innerHTML = "";

    products.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>₹ ${product.price}</p>
        `;

        container.appendChild(card);
    });
}

function searchProduct() {
    const searchValue = document.getElementById("searchInput").value.toLowerCase();

    const filteredProducts = allProducts.filter(product =>
        product.title.toLowerCase().includes(searchValue)
    );

    displayProducts(filteredProducts);
}
