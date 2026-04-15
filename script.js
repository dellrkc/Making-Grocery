let items = JSON.parse(localStorage.getItem("items")) || [];

/* 🔄 Update UI */
function updateUI() {
    const list = document.getElementById("list");
    list.innerHTML = "";

    items.forEach((item, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <div style="display:flex; align-items:center; gap:8px;">
                <input type="checkbox"
                    ${item.done ? "checked" : ""}
                    onchange="toggleItem(${index})">

                <span style="text-decoration:${item.done ? 'line-through' : 'none'}">
                    ${item.text}
                    <small>(${item.category || ""})</small>
                </span>
            </div>

            <button onclick="deleteItem(${index})">❌</button>
        `;

        list.appendChild(li);
    });
}

/* ➕ Add */
function addItem() {
    const input = document.getElementById("item");
    const category = document.getElementById("category").value;

    if (!input.value.trim()) return;

    items.push({
        text: input.value,
        done: false,
        category
    });

    localStorage.setItem("items", JSON.stringify(items));

    input.value = "";
    input.focus();

    updateUI();
}

/* ❌ Delete */
function deleteItem(index) {
    items.splice(index, 1);
    localStorage.setItem("items", JSON.stringify(items));
    updateUI();
}

/* ☑️ Toggle */
function toggleItem(index) {
    items[index].done = !items[index].done;
    localStorage.setItem("items", JSON.stringify(items));
    updateUI();
}

/* ⌨️ Enter Support */
document.getElementById("item").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addItem();
    }
});

/* 🌙 Dark Mode */
function toggleDarkMode() {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("darkMode", isDark);

    document.querySelector(".toggle-btn").textContent = isDark ? "☀️" : "🌙";
}

/* 💾 Load Theme */
if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
    document.querySelector(".toggle-btn").textContent = "☀️";
}

/* 🚀 Init */
updateUI();

