// modal toggle

document.querySelector("#js-modal-open").addEventListener("click", () => {
  document.querySelector("#js-modal").classList.add("is-show");
});
document.querySelector("#js-modal-close").addEventListener("click", () => {
  document.querySelector("#js-modal").classList.remove("is-show");
});

// gallery toss
(function () {
  const images = [
    "./img/chamomiles.jpg",
    "./img/poppy-field.jpg",
    "./img/sunflowers.jpg",
    "./img/tulip.jpg",
    "./img/viburnum.jpg",
  ];
  const stage = document.getElementById("js-gallery");
  if (!stage) return;
  const cards = Array.from(stage.querySelectorAll(".card"));
  if (cards.length < 2) return;

  images.forEach((src) => {
    const i = new Image();
    i.src = src;
  });

  let idx = 0;
  let top = 0;

  function setCard(card, src, role) {
    card.className = "card " + role;
    if (!card.querySelector("img")) {
      const img = document.createElement("img");
      img.src = src;
      card.innerHTML = "";
      card.appendChild(img);
    } else {
      card.querySelector("img").src = src;
    }
  }

  setCard(cards[0], images[idx % images.length], "enter");
  setCard(cards[1], images[(idx + 1) % images.length], "prep");

  function rotate() {
    const outgoing = cards[top];
    const incoming = cards[1 - top];

    incoming.classList.remove("prep");
    void incoming.offsetWidth;
    incoming.classList.add("enter");

    outgoing.classList.remove("enter");
    outgoing.classList.add("exit");

    setTimeout(() => {
      outgoing.classList.remove("exit");
      outgoing.classList.add("prep");
      idx = (idx + 1) % images.length;

      const nextSrc = images[(idx + 1) % images.length];
      setCard(outgoing, nextSrc, "prep");
      top = 1 - top;
    }, 950);
  }

  const interval = 3000;
  let timer = setInterval(rotate, interval);

  stage.addEventListener("mouseenter", () => clearInterval(timer));
  stage.addEventListener(
    "mouseleave",
    () => (timer = setInterval(rotate, interval))
  );
})();

// cal chooser

document.querySelector("#btn-sunflower").addEventListener("click", () => {
  localStorage.setItem("flower", "sunflower");
  renderChosen();
});
document.querySelector("#btn-viburnum").addEventListener("click", () => {
  localStorage.setItem("flower", "viburnum");
  renderChosen();
});
document.querySelector("#btn-tulip").addEventListener("click", () => {
  localStorage.setItem("flower", "tulip");
  renderChosen();
});
document.querySelector("#btn-chamomile").addEventListener("click", () => {
  localStorage.setItem("flower", "chamomile");
  renderChosen();
});
document.querySelector("#btn-poppy").addEventListener("click", () => {
  localStorage.setItem("flower", "poppy");
  renderChosen();
});

const flowerMap = {
  sunflower: "sunflowers.jpg",
  sunflowers: "sunflowers.jpg",
  viburnum: "viburnum.jpg",
  tulip: "tulip.jpg",
  chamomile: "chamomiles.jpg",
  chamomiles: "chamomiles.jpg",
  poppy: "poppy-field.jpg",
};

function renderChosen() {
  const key = localStorage.getItem("flower");
  const chooser = document.getElementById("js-chooser");
  const text = document.getElementById("js-text");
  const chosen = document.getElementById("js-chosen");
  if (!chooser || !chosen) return;

  if (key && flowerMap[key]) {
    chooser.style.display = "none";
    text.style.display = "none";
    const filename = flowerMap[key];
    chosen.innerHTML = `
            <div class="chosen-wrap">
                <img class="chosen-image" src="./img/${filename}" alt="${key}" />
            </div>
        `;
  } else {
    chooser.style.display = "";
    chosen.innerHTML = "";
  }
}

document.addEventListener("DOMContentLoaded", renderChosen);

window.addEventListener("storage", (e) => {
  if (e.key === "flower") renderChosen();
});
