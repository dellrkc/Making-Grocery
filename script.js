let items = [];
let lists = JSON.parse(localStorage.getItem("lists")) || [];

/* 🔄 Update Current List */
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

/* 📜 Update History */
function updateHistory() {
    const history = document.getElementById("history");
    history.innerHTML = "";

    lists.forEach((listData, index) => {
        const li = document.createElement("li");

        li.innerText = `List from ${listData.date}`;

        li.onclick = () => loadList(index);

        history.appendChild(li);
    });
}

/* ➕ Add Item */
function addItem() {
    const input = document.getElementById("item");
    const category = document.getElementById("category").value;

    if (!input.value.trim()) return;

    items.push({
        text: input.value,
        done: false,
        category
    });

    input.value = "";
    input.focus();

    updateUI();
}

/* ❌ Delete */
function deleteItem(index) {
    items.splice(index, 1);
    updateUI();
}

/* ☑️ Toggle */
function toggleItem(index) {
    items[index].done = !items[index].done;
    updateUI();
}

/* 📦 Save List */
function saveList() {
    if (items.length === 0) return;

    const date = new Date().toLocaleDateString();

    lists.push({
        date,
        items: [...items]
    });

    localStorage.setItem("lists", JSON.stringify(lists));

    items = []; // clear current list

    updateUI();
    updateHistory();
}

/* 📂 Load Old List */
function loadList(index) {
    items = [...lists[index].items];
    updateUI();
}

/* ⌨️ Enter Key */
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
updateHistory();


