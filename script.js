let items = JSON.parse(localStorage.getItem("currentList")) || [];

function calcTotal() {
    return items.reduce((sum, i) => sum + (parseFloat(i.price) || 0), 0).toFixed(2);
}

function updateUI() {
    const list = document.getElementById("list");
    if (!list) return;
    list.innerHTML = "";

    items.forEach((item, index) => {
        const li = document.createElement("li");
        const priceDisplay = item.price ? `<span class="item-price">$${parseFloat(item.price).toFixed(2)}</span>` : "";
        const linkDisplay = item.link ? `<a href="${item.link}" target="_blank" class="item-link">🔗</a>` : "";

        li.innerHTML = `
            <div class="li-left">
                <input type="checkbox" ${item.done ? "checked" : ""} onchange="toggleItem(${index})">
                <span style="text-decoration:${item.done ? 'line-through' : 'none'}; flex:1;">
                    ${item.text}
                </span>
                ${priceDisplay}
                ${linkDisplay}
            </div>
            <button class="del-btn" onclick="deleteItem(${index})">✕</button>
        `;
        list.appendChild(li);
    });

    const totalEl = document.getElementById("totalPrice");
    if (totalEl) totalEl.textContent = "$" + calcTotal();
}

function addItem() {
    const input = document.getElementById("item");
    const priceInput = document.getElementById("itemPrice");
    const linkInput = document.getElementById("itemLink");

    if (!input.value.trim()) return;

    items.push({
        text: input.value.trim(),
        price: priceInput.value.trim(),
        link: linkInput.value.trim(),
        done: false
    });

    localStorage.setItem("currentList", JSON.stringify(items));

    input.value = "";
    priceInput.value = "";
    linkInput.value = "";
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
    if (items.length === 0) { alert("Add items first!"); return; }

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
        lists.push({ createdAt: now, updatedAt: null, items: [...items] });
    }

    localStorage.setItem("lists", JSON.stringify(lists));
    items = [];
    localStorage.setItem("currentList", JSON.stringify(items));
    updateUI();
    alert("List saved! ✅");
}

document.addEventListener("DOMContentLoaded", () => {
    const itemInput = document.getElementById("item");
    if (itemInput) {
        itemInput.addEventListener("keypress", e => { if (e.key === "Enter") addItem(); });
    }
});

function toggleDarkMode() {
    document.body.classList.toggle("dark");
    localStorage.setItem("darkMode", document.body.classList.contains("dark"));
}

if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
}

updateUI();






