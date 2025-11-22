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
const sortSelect = document.getElementById("sortSelect"); // Add this dropdown in HTML

const cars = [/* your car objects with added category field */];

function renderCars(list) {
  carContainer.innerHTML = "";
  list.forEach((car, index) => {
    const card = document.createElement("div");
    card.className = "car-card";
    card.innerHTML = `<img src="${car.image}" alt="${car.name}" /><h3>${car.name}</h3>`;
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

  colorOptions.innerHTML = "";
  Object.entries(car.colors).forEach(([color, img]) => {
    const btn = document.createElement("button");
    btn.textContent = color;
    btn.onclick = () => {
      carImage.src = img;
    };
    colorOptions.appendChild(btn);
  });

  ratingStars.innerHTML = "";
  const ratings = getRatings(car.name);
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement("i");
    star.className = "fas fa-star";
    if (i <= Math.round(getAverage(ratings))) star.classList.add("active");
    star.onclick = () => {
      saveRating(car.name, i);
      showModal(car, index);
    };
    ratingStars.appendChild(star);
  }
  averageRating.textContent = `Average Rating: ${getAverage(ratings).toFixed(1)} ⭐`;

  addFavorite.onclick = () => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (!favs.includes(car.name)) {
      favs.push(car.name);
      localStorage.setItem("favorites", JSON.stringify(favs));
      alert(`${car.name} added to favorites!`);
    } else {
      alert(`${car.name} is already in favorites.`);
    }
  };

  const shareText = `${car.name} - ${car.price}, ${car.topSpeed}, ${car.horsepower} ${window.location.href}`;
  document.getElementById("whatsapp").onclick = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`);
  };
  document.getElementById("facebook").onclick = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`);
  };
  document.getElementById("twitter").onclick = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`);
  };

  modal.style.display = "flex";
}

function getRatings(name) {
  const ratings = JSON.parse(localStorage.getItem("ratings") || "{}");
  return ratings[name] || [];
}

function saveRating(name, value) {
  const ratings = JSON.parse(localStorage.getItem("ratings") || "{}");
  if (!ratings[name]) ratings[name] = [];
  ratings[name].push(value);
  localStorage.setItem("ratings", JSON.stringify(ratings));
}

function getAverage(arr) {
  return arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;
}

closeModal.onclick = () => {
  modal.style.display = "none";
};

searchInput.oninput = () => {
  const query = searchInput.value.toLowerCase();
  const filtered = cars.filter(car => car.name.toLowerCase().includes(query));
  renderCars(filtered);
};

function sortCars(criteria) {
  const sorted = [...cars].sort((a, b) => {
    if (criteria === "price") {
      return parseInt(a.price.replace(/\D/g, '')) - parseInt(b.price.replace(/\D/g, ''));
    } else if (criteria === "speed") {
      return parseInt(b.topSpeed) - parseInt(a.topSpeed);
    } else if (criteria === "year") {
      return b.year - a.year;
    }
  });
  renderCars(sorted);
}

sortSelect.onchange = () => {
  sortCars(sortSelect.value);
};

// Comparison
function compareModels() {
  const aKey = document.getElementById("compareA").value;
  const bKey = document.getElementById("compareB").value;
  if (!aKey || !bKey || aKey === bKey) return;

  const a = cars.find(c => c.name.includes(aKey));
  const b = cars.find(c => c.name.includes(bKey));

  document.getElementById("comparisonResult").innerHTML = `
    <table>
      <tr><th>Spec</th><th>${a.name}</th><th>${b.name}</th></tr>
      <tr><td>Top Speed</td><td>${a.topSpeed}</td><td>${b.topSpeed}</td></tr>
      <tr><td>0–100 km/h</td><td>${a.acceleration}</td><td>${b.acceleration}</td></tr>
      <tr><td>Horsepower</td><td>${a.horsepower}</td><td>${b.horsepower}</td></tr>
      <tr><td>Price</td><td>${a.price}</td><td>${b.price}</td></tr>
    </table>
  `;
}

// Initial render
renderCars(cars);
