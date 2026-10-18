
const grid = document.querySelector("#asset-grid");
const search = document.querySelector("#asset-search");
const count = document.querySelector("#asset-count");
const error = document.querySelector("#asset-error");

let assets = [];

async function loadAssets() {
  try {
    const response = await fetch("./asset-list.json");

    if (!response.ok) {
      throw new Error("Asset list not found");
    }

    assets = await response.json();
    renderGallery();
  } catch (err) {
    error.hidden = false;
    console.error(err);
  }
}

function renderGallery() {
  const query = search.value.trim().toLowerCase();

  const filtered = assets.filter(path =>
    path.toLowerCase().includes(query)
  );

  count.textContent =
    `${filtered.length} of ${assets.length} images`;

  grid.replaceChildren();

  filtered.forEach(path => {
    const card = document.createElement("article");
    card.className = "asset-card";

    const preview = document.createElement("div");
    preview.className = "asset-preview";

    const img = document.createElement("img");
    img.src = path;
    img.alt = path.split("/").pop();
    img.loading = "lazy";
    img.width = 160;
    img.height = 145;

    const name = document.createElement("p");
    name.className = "asset-name";
    name.textContent = path.split("/").pop();

    const button = document.createElement("button");
    button.className = "asset-copy";
    button.textContent = "Copy path";

    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(path);
        button.textContent = "Copied! ✓";
        setTimeout(() => {
          button.textContent = "Copy path";
        }, 1200);
      } catch {
        window.prompt("Copy this asset path:", path);
      }
    });

    img.addEventListener("error", () => {
      preview.textContent = "Image unavailable";
    });

    preview.append(img);
    card.append(preview, name, button);
    grid.append(card);
  });
}

search.addEventListener("input", renderGallery);

loadAssets();
