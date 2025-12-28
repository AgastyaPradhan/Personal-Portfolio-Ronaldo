const counters = document.querySelectorAll(".counter span");

counters.forEach(counter => {
  let current = 0;
  const target = Number(counter.dataset.target);
  const step = target / 80;

  function animate() {
    current += step;
    if (current < target) {
      counter.textContent = Math.floor(current);
      requestAnimationFrame(animate);
    } else {
      counter.textContent = target;
    }
  }

  animate();
});

document.querySelectorAll(".club-card").forEach(card => {
  let animated = false;

  card.addEventListener("mouseenter", () => {
    if (animated) return;
    animated = true;

    card.querySelectorAll(".stat").forEach(stat => {
      let value = 0;
      const target = Number(stat.dataset.target);
      const step = target / 40;
      const ongoing = stat.classList.contains("ongoing");

      function run() {
        value += step;
        if (value < target) {
          stat.textContent = Math.floor(value);
          requestAnimationFrame(run);
        } else {
          stat.textContent = ongoing ? target + "*" : target;
        }
      }

      stat.textContent = "0";
      run();
    });
  });
});

const filterButtons = document.querySelectorAll(".media-filters button");
const mediaItems = document.querySelectorAll(".media-item");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;

    mediaItems.forEach(item => {
      item.style.display =
        filter === "all" || item.classList.contains(filter)
          ? "block"
          : "none";
    });
  });
});

const modal = document.getElementById("media-modal");
const modalContent = modal.querySelector(".modal-content");
const closeModal = document.querySelector(".close-modal");

mediaItems.forEach(item => {
  item.addEventListener("click", () => {
    modalContent.innerHTML = "";

    const media = item.querySelector("img, video").cloneNode(true);

    if (media.tagName === "VIDEO") {
      media.controls = true;
      media.muted = false;
      media.play();
    }

    modalContent.appendChild(media);
    modal.style.display = "flex";
  });
});

closeModal.addEventListener("click", () => {
  const video = modalContent.querySelector("video");
  if (video) video.pause();

  modal.style.display = "none";
  modalContent.innerHTML = "";
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape" && modal.style.display === "flex") {
    const video = modalContent.querySelector("video");
    if (video) video.pause();
    modal.style.display = "none";
    modalContent.innerHTML = "";
  }
});

const fanForm = document.getElementById("fan-form");
const responseText = document.getElementById("fan-response");

fanForm.addEventListener("submit", e => {
  e.preventDefault();

  const name = document.getElementById("fan-name").value.trim();
  const message = document.getElementById("fan-message").value.trim();

  if (!name || !message) return;

  responseText.textContent = `Thank you, ${name}! Your message has been received.`;

  fanForm.reset();
});
const themeSwitch = document.getElementById("theme-switch");

themeSwitch.addEventListener("change", () => {
  document.body.classList.toggle("light", themeSwitch.checked);
});
