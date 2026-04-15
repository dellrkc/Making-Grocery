let items = JSON.parse(localStorage.getItem("items")) || [];

/* 🔄 Update UI */
function updateUI() {
    const list = document.getElementById("list");
    list.innerHTML = "";

    items.forEach((item, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <span onclick="toggleItem(${index})" style="cursor:pointer; text-decoration:${item.done ? 'line-through' : 'none'}">
                ${item.text}
            </span>
            <button onclick="deleteItem(${index})">❌</button>
        `;

        list.appendChild(li);
    });
}

/* ➕ Add Item */
function addItem() {
    const input = document.getElementById("item");

    if (!input.value.trim()) return;

    items.push({ text: input.value, done: false });

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

/* ✅ Toggle Complete */
function toggleItem(index) {
    items[index].done = !items[index].done;

    localStorage.setItem("items", JSON.stringify(items));

    updateUI();
}

/* ⌨️ Enter Key Support */
document.getElementById("item").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addItem();
    }
});

/* 🌙 Dark Mode Toggle */
function toggleDarkMode() {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("darkMode", isDark);

    document.querySelector(".toggle-btn").textContent = isDark ? "☀️" : "🌙";
}

/* 💾 Load saved theme */
if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
    document.querySelector(".toggle-btn").textContent = "☀️";
}

/* 🚀 Initialize */
updateUI();