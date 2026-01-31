const container = document.getElementById("viewHistoryContainer");
const clearBtn = document.getElementById("clearHistoryBtn");

function loadHistory() {
    let history = JSON.parse(localStorage.getItem("recentProducts")) || [];
    container.innerHTML = "";

    if (history.length === 0) {
        container.innerHTML = "<p>No viewed products found.</p>";
        return;
    }

    history.forEach(item => {
        const card = document.createElement("div");
        card.className = "view-history-card";

        const time = new Date(item.time).toLocaleString();

        card.innerHTML = `
            <div class="view-history-content">
                <img src="${item.thumbnail}">
                <div>
                    <p><strong>${item.title}</strong></p>
                    <p>₹ ${item.price}</p>
                    <p>Viewed: ${time}</p>
                </div>
            </div>
        `;

        card.addEventListener("click", () => {
            window.location.href = `product.html?id=${item.id}`;
        });

        container.appendChild(card);
    });
}

clearBtn.addEventListener("click", () => {
    if (confirm("Clear all viewed products?")) {
        localStorage.removeItem("recentProducts");
        loadHistory();
    }
});

loadHistory();
