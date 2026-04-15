let items = JSON.parse(localStorage.getItem("currentList")) || [];
let lists = JSON.parse(localStorage.getItem("lists")) || [];

/* 🔄 UPDATE CURRENT LIST */
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

/* 📜 UPDATE HISTORY */
function updateHistory() {
    const history = document.getElementById("history");

    if (!history) return; // prevents crash if missing

    history.innerHTML = "";

    lists.forEach((listData, index) => {
        const li = document.createElement("li");

        li.innerText = `🗓️ ${listData.date}`;
        li.onclick = () => loadList(index);

        history.appendChild(li);
    });
}

/* ➕ ADD ITEM */
function addItem() {
    const input = document.getElementById("item");

    if (!input.value.trim()) return;

    items.push({
        text: input.value,
        done: false
    });

    localStorage.setItem("currentList", JSON.stringify(items));

    input.value = "";
    input.focus();

    updateUI();
}

/* ❌ DELETE ITEM */
function deleteItem(index) {
    items.splice(index, 1);
    localStorage.setItem("currentList", JSON.stringify(items));
    updateUI();
}

/* ☑️ TOGGLE CHECKBOX */
function toggleItem(index) {
    items[index].done = !items[index].done;
    localStorage.setItem("currentList", JSON.stringify(items));
    updateUI();
}

/* 📦 SAVE LIST */
function saveList() {
    if (items.length === 0) {
        alert("Add items first!");
        return;
    }

    const date = new Date().toLocaleString();

    lists.push({
        date,
        items: [...items]
    });

    localStorage.setItem("lists", JSON.stringify(lists));

    items = [];
    localStorage.setItem("currentList", JSON.stringify(items));

    updateUI();
    updateHistory();
}

/* 📂 LOAD OLD LIST */
function loadList(index) {
    items = [...lists[index].items];
    localStorage.setItem("currentList", JSON.stringify(items));
    updateUI();
}

/* ⌨️ ENTER KEY SUPPORT */
document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("item");

    if (input) {
        input.addEventListener("keypress", function(e) {
            if (e.key === "Enter") addItem();
        });
    }
});

/* 🌙 DARK MODE */
function toggleDarkMode() {
    document.body.classList.toggle("dark");
}

/* 🚀 INIT */
updateUI();
updateHistory();



