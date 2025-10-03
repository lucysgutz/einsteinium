let games = [];
let currentIndex = 0;
let autoSlideInterval;

async function loadGames() {
  try {
    const response = await fetch("scripts/games.json");
    games = await response.json();

    games = games.sort(() => 0.5 - Math.random()).slice(0, 5);

    renderCarousel();
    startAutoSlide();
  } catch (err) {
    console.error("Failed to load games.json", err);
  }
}

function renderCarousel() {
  const carousel = document.getElementById("game-carousel");
  carousel.innerHTML = "";

  games.forEach((game, index) => {
    const slide = document.createElement("div");
    slide.className = "carousel-slide";
    if (index === 0) slide.classList.add("active");

    slide.innerHTML = `
      <a href="../pages/games.html?game=${encodeURIComponent(game.id)}" class="carousel-link">
        <div class="carousel-image-container">
          <img src="${game.image}" alt="${game.title}">
          <div class="carousel-title">${game.title}</div>
        </div>
      </a>
    `;
    carousel.appendChild(slide);
  });
}

function showSlide(index) {
  const slides = document.querySelectorAll(".carousel-slide");
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + games.length) % games.length;
  showSlide(currentIndex);
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % games.length;
  showSlide(currentIndex);
}

function startAutoSlide() {
  if (autoSlideInterval) clearInterval(autoSlideInterval);
  autoSlideInterval = setInterval(nextSlide, 5000); 
}

document.addEventListener("DOMContentLoaded", loadGames);
