const historyContainer = document.getElementById("historyContainer");
const clearBtn = document.getElementById("clearHistoryBtn");

function renderHistory() {
    historyContainer.innerHTML = "";

    let history = JSON.parse(localStorage.getItem("searchHistory")) || [];

    if (history.length === 0) {
        historyContainer.innerHTML = "<p>No search history found.</p>";
        return;
    }

    history.reverse().forEach(item => {
        const div = document.createElement("div");
        div.className = "history-card";

        const date = new Date(item.time).toLocaleString();

        div.innerHTML = `
            <p><strong>Search:</strong> ${item.query}</p>
            <p><strong>Time:</strong> ${date}</p>
        `;

        historyContainer.appendChild(div);
    });
}

// Clear history
clearBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to clear all search history?")) {
        localStorage.removeItem("searchHistory");
        renderHistory();
    }
});

// Initial load
renderHistory();
