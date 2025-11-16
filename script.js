const cars = [
  {
    name: "Porsche 911",
    image: "images/911-red.jpg",
    colors: {
      Red: "images/911-red.jpg",
      Black: "images/911-black.jpg",
      Silver: "images/911-silver.jpg"
    },
    year: 2023,
    price: "₹2 Crore",
    topSpeed: "293 km/h",
    horsepower: "473 hp",
    acceleration: "0–100 km/h in 3.5s",
    rating: [1,2,3,4,5]
  },
  {
    name: "Porsche Taycan",
    image: "images/taycan.jpg",
    colors: {},
    year: 2020,
    price: "₹2.69 Crore",
    topSpeed: "260 km/h",
    horsepower: "616 hp",
    acceleration: "0–100 km/h in 3.2s",
    rating: []
  },
  {
    name: "Porsche Macan",
    image: "images/macan.jpg",
    colors: {},
    year: 2023,
    price: "₹1.49 Crore",
    topSpeed: "272 km/h",
    horsepower: "440 hp",
    acceleration: "0–100 km/h in 4.3s",
    rating: []
  },
  {
    name: "Porsche Panamera",
    image: "images/panamera.jpg",
    colors: {},
    year: 2024,
    price: "₹2.76 Crore",
    topSpeed: "315 km/h",
    horsepower: "680 hp",
    acceleration: "0–100 km/h in 3.2s",
    rating: []
  },
  {
    name: "Porsche Cayenne",
    image: "images/cayenne.jpg",
    colors: {},
    year: 2023,
    price: "₹1.36 Crore",
    topSpeed: "273 km/h",
    horsepower: "468 hp",
    acceleration: "0–100 km/h in 4.7s",
    rating: []
  },
  {
    name: "Porsche Carrera GT",
    image: "images/carrera-gt.jpg",
    colors: {},
    year: 2004,
    price: "₹5 Crore",
    topSpeed: "330 km/h",
    horsepower: "612 hp",
    acceleration: "0–100 km/h in 3.5s",
    rating: []
  },
  {
    name: "Porsche 718 Cayman",
    image: "images/718.jpg",
    colors: {},
    year: 2024,
    price: "₹1.48 Crore",
    topSpeed: "275 km/h",
    horsepower: "420 hp",
    acceleration: "0–100 km/h in 4.4s",
    rating: []
  },
  {
    name: "Porsche 959",
    image: "images/959.jpg",
    colors: {},
    year: 1986,
    price: "₹3.5 Crore",
    topSpeed: "317 km/h",
    horsepower: "450 hp",
    acceleration: "0–100 km/h in 3.7s",
    rating: []
  },
  {
    name: "Porsche 356",
    image: "images/356.jpg",
    colors: {},
    year: 1948,
    price: "₹1 Crore",
    topSpeed: "180 km/h",
    horsepower: "60 hp",
    acceleration: "0–100 km/h in 13s",
    rating: []
  }
];

const carContainer = document.getElementById("carContainer");
const searchInput = document.getElementById("searchInput");
const modal = document.getElementById("modal");
const carName = document.getElementById("carName");
const carImage = document.getElementById("carImage");
const carSpecs = document.getElementById("carSpecs");
const ratingStars = document.getElementById("ratingStars");
const averageRating = document.getElementById("averageRating");
const closeModal = document.getElementById("closeModal");
const colorOptions = document.getElementById("colorOptions");
const addFavorite = document.getElementById("addFavorite");

function renderCars(list) {
  carContainer.innerHTML = "";
  list.forEach((car, index) => {
    const card = document.createElement("div");
    card.className = "car-card";
    card.innerHTML = `
      <img src="${car.image}" alt="${car.name}" />
      <h3>${car.name}</h3>
    `;
    card.onclick = () => showModal(car, index);
    carContainer.appendChild(card);
  });
}

function showModal(car, index) {
  carName.textContent = car.name;
  carImage.src = car.image;
  carSpecs.innerHTML = `
    <li><strong>Year:</strong> ${car.year}</li>
    <li><strong>Price:</strong> ${car.price}</li>
    <li><strong>Top Speed:</strong> ${car.topSpeed}</li>
    <li><strong>Horsepower:</strong> ${car.horsepower}</li>
    <li><strong>Acceleration:</strong> ${car.acceleration}</li>
  `;

  // Color options
  colorOptions.innerHTML = "";
  for (const color in car.colors) {
    const btn = document.createElement("button");
    btn.textContent = color;
    btn.onclick = () => {
      car.image = car.colors[color];
      carImage.src = car.image;
    };
    colorOptions.appendChild(btn);
  }

  // Rating
  ratingStars.innerHTML = "";
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement("i");
    star.className = "fas fa-star";
    if (i <= Math.round(getAverage(car.rating))) star.classList.add("active");
    star.onclick = () => {
      car.rating.push(i);
      showModal(car, index);
    };
    ratingStars.appendChild(star);
  }
  averageRating.textContent = `Average Rating: ${getAverage(car.rating).toFixed(1)} ⭐`;

  // Favorites
  addFavorite.onclick = () => {
    let favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (!favs.includes(car.name)) {
      favs.push(car.name);
      localStorage.setItem("favorites", JSON.stringify(favs));
      alert(`${car.name} added to favorites!`);
    } else {
      alert(`${car.name} is already in favorites.`);
    }
  };

  // Sharing
  document.getElementById("whatsapp").onclick = () => {
    const text = `${car.name} - ${car.price}, ${car.topSpeed}, ${car.horsepower} ${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
  };
  document.getElementById("facebook").onclick = () => {
    const url = `${window.location.href}`;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
  };
  document.getElementById("twitter").onclick = () => {
    const text = `${car.name} - ${car.price}, ${car.topSpeed} ${window.location.href}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`);
  };

  modal.style.display = "flex";
}

function getAverage(arr) {
  if (arr.length === 0) return 0;
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

closeModal.onclick = () => {
  modal.style.display = "none";
};

searchInput.oninput = () => {
  const query = searchInput.value.toLowerCase();
  const filtered = cars.filter(car => car.name.toLowerCase().includes(query));
  renderCars(filtered);
};

// Initial render

renderCars(cars);
const porscheModels = {
  "911": { name: "911 Turbo S", category: "coupe", speed: "330 km/h", acceleration: "2.7 s", horsepower: "650 hp", image: "images/911.jpg", description: "Timeless design meets modern performance." },
  "taycan": { name: "Taycan Turbo S", category: "electric", speed: "260 km/h", acceleration: "2.8 s", horsepower: "750 hp", image: "images/taycan.jpg", description: "Electric performance with Porsche DNA." },
  "macan": { name: "Macan S", category: "suv", speed: "254 km/h", acceleration: "5.1 s", horsepower: "380 hp", image: "images/macan.jpg", description: "Compact SUV with Porsche soul." },
  "panamera": { name: "Panamera GTS", category: "sedan", speed: "300 km/h", acceleration: "3.9 s", horsepower: "480 hp", image: "images/panamera.jpg", description: "Luxury and sport in perfect harmony." },
  "cayenne": { name: "Cayenne Turbo GT", category: "suv", speed: "300 km/h", acceleration: "3.3 s", horsepower: "631 hp", image: "images/cayenne.jpg", description: "High-performance luxury SUV." },
  "carrera": { name: "Carrera GT", category: "supercar", speed: "330 km/h", acceleration: "3.9 s", horsepower: "612 hp", image: "images/carrera-gt.jpg", description: "V10-powered analog masterpiece." },
  "718cayman": { name: "718 Cayman GTS 4.0", category: "coupe", speed: "293 km/h", acceleration: "4.5 s", horsepower: "400 hp", image: "images/718cayman.jpg", description: "Mid-engine precision and agility." },
  "959": { name: "Porsche 959", category: "classic", speed: "317 km/h", acceleration: "3.7 s", horsepower: "450 hp", image: "images/959.jpg", description: "1980s supercar and tech pioneer." },
  "356": { name: "Porsche 356 Speedster", category: "classic", speed: "180 km/h", acceleration: "13.0 s", horsepower: "60 hp", image: "images/356.jpg", description: "The original Porsche legacy." }
};

function renderGrid(filter = "all") {
  const grid = document.getElementById("modelGrid");
  grid.innerHTML = "";
  for (const key in porscheModels) {
    const m = porscheModels[key];
    if (filter === "all" || m.category === filter) {
      const card = document.createElement("div");
      card.className = "model-card";
      card.innerHTML = `<img src="${m.image}" alt="${m.name}"><h4>${m.name}</h4>`;
      card.onclick = () => showModel(key);
      grid.appendChild(card);
    }
  }
}

function showModel(key) {
  const m = porscheModels[key];
  const display = document.getElementById("modelDisplay");
  display.innerHTML = `
    <h2>${m.name}</h2>
    <img src="${m.image}" alt="${m.name}">
    <p><strong>Top Speed:</strong> ${m.speed}</p>
    <p><strong>0–100 km/h:</strong> ${m.acceleration}</p>
    <p><strong>Horsepower:</strong> ${m.horsepower}</p>
    <p>${m.description}</p>
  `;
}

function filterModels(category) {
  renderGrid(category);
}

function searchModels(query) {
  const grid = document.getElementById("modelGrid");
  grid.innerHTML = "";
  const lowerQuery = query.toLowerCase();
  for (const key in porscheModels) {
    const m = porscheModels[key];
    if (m.name.toLowerCase().includes(lowerQuery)) {
      const card = document.createElement("div");
      card.className = "model-card";
      card.innerHTML = `<img src="${m.image}" alt="${m.name}"><h4>${m.name}</h4>`;
      card.onclick = () => showModel(key);
      grid.appendChild(card);
    }
  }
}

window.onload = () => renderGrid();
function compareModels() {
  const aKey = document.getElementById("compareA").value;
  const bKey = document.getElementById("compareB").value;
  if (!aKey || !bKey || aKey === bKey) return;

  const a = porscheModels[aKey];
  const b = porscheModels[bKey];

  document.getElementById("comparisonResult").innerHTML = `
    <table>
      <tr><th>Spec</th><th>${a.name}</th><th>${b.name}</th></tr>
      <tr><td>Top Speed</td><td>${a.speed}</td><td>${b.speed}</td></tr>
      <tr><td>0–100 km/h</td><td>${a.acceleration}</td><td>${b.acceleration}</td></tr>
      <tr><td>Horsepower</td><td>${a.horsepower}</td><td>${b.horsepower}</td></tr>
    </table>
  `;
}

