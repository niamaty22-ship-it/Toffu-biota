
const searchInput = document.querySelector("#species-search");
const speciesCards = document.querySelectorAll(".species-card");
const emptyMessage = document.querySelector("#empty-message");

// Search for a species by name, type, or habitat.
searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  speciesCards.forEach((card) => {
    const searchableText =
      card.textContent.toLowerCase() + " " + card.dataset.search;

    const matches = searchableText.includes(query);
    card.hidden = !matches;

    if (matches) visibleCount++;
  });

  emptyMessage.hidden = visibleCount !== 0;
});

// Show interesting facts in a little popup.
const factDialog = document.querySelector("#fact-dialog");
const dialogFact = document.querySelector("#dialog-fact");

document.querySelectorAll(".learn-button").forEach((button) => {
  button.addEventListener("click", () => {
    dialogFact.textContent = button.dataset.fact;
    factDialog.showModal();
  });
});

document.querySelector("#close-dialog").addEventListener("click", () => {
  factDialog.close();
});

// Random science facts.
const facts = [
  "Fungi are more closely related to animals than to plants.",
  "Octopuses have three hearts.",
  "A group of fungi can form an underground network of thread-like structures called mycelium.",
  "Some desert plants open their stomata at night to help conserve water.",
  "Coral reefs provide habitats for an extraordinary diversity of marine life.",
  "Pollinators such as bees and butterflies help many flowering plants reproduce."
];

const factText = document.querySelector("#fact-text");
const newFactButton = document.querySelector("#new-fact");
let previousFact = -1;

newFactButton.addEventListener("click", () => {
  let nextFact;
  
  do {
    nextFact = Math.floor(Math.random() * facts.length);
  } while (facts.length > 1 && nextFact === previousFact);

  previousFact = nextFact;
  factText.textContent = facts[nextFact];
});

// A tiny observation prompt.
document
  .querySelector("#observation-button")
  .addEventListener("click", () => {
    const message = document.querySelector("#observation-message");

    message.textContent =
      "Your explorer's mission: find one living thing today, " +
      "observe it gently, and write down what you notice. 🌱";
  }); 