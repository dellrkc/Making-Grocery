let items = JSON.parse(localStorage.getItem("items")) || [];

/* UPDATE UI */
function updateUI() {
    const list = document.getElementById("list");
    list.innerHTML = "";

    items.forEach((item, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <span style="text-decoration:${item.done ? 'line-through' : 'none'}">
                ${item.text}
            </span>
            <button onclick="deleteItem(${index})">❌</button>
        `;

        li.onclick = () => toggleItem(index);

        list.appendChild(li);
    });
}

/* ADD ITEM */
function addItem() {
    const input = document.getElementById("item");

    if (!input.value.trim()) return;

    items.push({ text: input.value, done: false });

    localStorage.setItem("items", JSON.stringify(items));

    input.value = "";
    input.focus();

    updateUI();
}

/* DELETE */
function deleteItem(index) {
    items.splice(index, 1);
    localStorage.setItem("items", JSON.stringify(items));
    updateUI();
}

/* TOGGLE */
function toggleItem(index) {
    items[index].done = !items[index].done;
    localStorage.setItem("items", JSON.stringify(items));
    updateUI();
}

/* ENTER KEY */
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("item").addEventListener("keypress", function(e) {
        if (e.key === "Enter") addItem();
    });
});

/* DARK MODE */
function toggleDarkMode() {
    document.body.classList.toggle("dark");
}

/* INIT */
updateUI();
