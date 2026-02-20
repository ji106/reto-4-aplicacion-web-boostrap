const fav = "favs_vg";

function getFavs() {
    return JSON.parse(localStorage.getItem(fav) || "[]");
}

function setFavs(favs) {
    localStorage.setItem(fav, JSON.stringify(favs));
}

function toggleFav(id) {
    const favs = getFavs();
    const index = favs.indexOf(id);

    if (index === -1) favs.push(id);
    else favs.splice(index, 1);

    setFavs(favs);
}

function reorderCards() {
    const favs = getFavs();
    const container = document.querySelector(".container");
    const cards = Array.from(container.children);

    cards.sort((a, b) => {
        const idA = Number(a.querySelector(".card-id").value);
        const idB = Number(b.querySelector(".card-id").value);

        const favA = favs.includes(idA);
        const favB = favs.includes(idB);

        if (favA && !favB) return -1;
        if (!favA && favB) return 1;

        const orderA = Number(a.dataset.order);
        const orderB = Number(b.dataset.order);

        return orderA - orderB;
    });

    cards.forEach(card => container.appendChild(card));
}

function filterByForm() {
    const favs = getFavs();
    const onlyFavs = document.getElementById("onlyFavs").checked;
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        const id = Number(card.querySelector(".card-id").value);
        const isFav = favs.includes(id);

        if (onlyFavs && !isFav) {
            card.style.display = "none";
        } else {
            card.style.display = "";
        }
    });
}

document.getElementById("filter-form").addEventListener("submit", (e) => {
    e.preventDefault();
    filterByForm();
    reorderCards();
})

document.querySelectorAll(".toggle-fav").forEach(btn => {
    const id = Number(btn.dataset.id);

    if (getFavs().includes(id)) {
        btn.classList.add("active");
    }

    btn.addEventListener("click", () => {
        toggleFav(id);
        btn.classList.toggle("active");
        reorderCards();
        filterByForm();
    });
});

reorderCards();
filterByForm();