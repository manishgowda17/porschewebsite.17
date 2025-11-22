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
