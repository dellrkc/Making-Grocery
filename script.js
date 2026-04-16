let items = JSON.parse(localStorage.getItem("currentList")) || [];

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
                </span>
            </div>
            <button onclick="deleteItem(${index})">❌</button>
        `;
        list.appendChild(li);
    });
}

function addItem() {
    const input = document.getElementById("item");
    if (!input.value.trim()) return;
    items.push({ text: input.value.trim(), done: false });
    localStorage.setItem("currentList", JSON.stringify(items));
    input.value = "";
    input.focus();
    updateUI();
}

function deleteItem(index) {
    items.splice(index, 1);
    localStorage.setItem("currentList", JSON.stringify(items));
    updateUI();
}

function toggleItem(index) {
    items[index].done = !items[index].done;
    localStorage.setItem("currentList", JSON.stringify(items));
    updateUI();
}

function saveList() {
    if (items.length === 0) {
        alert("Add items first!");
        return;
    }

    let lists = JSON.parse(localStorage.getItem("lists")) || [];
    let editingIndex = localStorage.getItem("editingIndex");
    const now = new Date().toLocaleString();

    if (editingIndex !== null) {
        lists[editingIndex] = {
            ...lists[editingIndex],
            updatedAt: now,
            items: [...items]
        };
        localStorage.removeItem("editingIndex");
    } else {
        lists.push({
            createdAt: now,
            updatedAt: null,
            items: [...items]
        });
    }

    localStorage.setItem("lists", JSON.stringify(lists));
    items = [];
    localStorage.setItem("currentList", JSON.stringify(items));
    updateUI();
    alert("List saved!");
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("item").addEventListener("keypress", function(e) {
        if (e.key === "Enter") addItem();
    });
});

function toggleDarkMode() {
    document.body.classList.toggle("dark");
}

updateUI();








