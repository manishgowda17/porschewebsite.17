  const cars = [
  {
    name: "Porsche 911",
    image: "911-red.jpg",
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
    rating: [5, 4, 5],
    category: "coupe",
    description: "The iconic Porsche 911 blends timeless design with cutting-edge performance and precision engineering."
  },
  {
    name: "Porsche Taycan",
    image: "taycan.jpg",
    colors: {},
    year: 2020,
    price: "₹2.69 Crore",
    topSpeed: "260 km/h",
    horsepower: "616 hp",
    acceleration: "0–100 km/h in 3.2s",
    rating: [],
    category: "electric",
    description: "The Taycan is Porsche’s first all-electric sports car, delivering instant torque and futuristic luxury."
  },
  {
    name: "Porsche Macan",
    image: "macan.jpg",
    colors: {},
    year: 2023,
    price: "₹1.49 Crore",
    topSpeed: "272 km/h",
    horsepower: "440 hp",
    acceleration: "0–100 km/h in 4.3s",
    rating: [],
    category: "suv",
    description: "A compact SUV with the soul of a sports car—agile, powerful, and unmistakably Porsche."
  },
  {
    name: "Porsche Panamera",
    image: "panamera.jpg",
    colors: {},
    year: 2024,
    price: "₹2.76 Crore",
    topSpeed: "315 km/h",
    horsepower: "680 hp",
    acceleration: "0–100 km/h in 3.2s",
    rating: [],
    category: "sedan",
    description: "The Panamera combines luxury and performance in a sleek four-door coupe silhouette."
  },
  {
    name: "Porsche Cayenne",
    image: "cayenne.jpg",
    colors: {},
    year: 2023,
    price: "₹1.36 Crore",
    topSpeed: "273 km/h",
    horsepower: "468 hp",
    acceleration: "0–100 km/h in 4.7s",
    rating: [],
    category: "suv",
    description: "A high-performance SUV that offers both comfort and the thrill of a true Porsche."
  },
  {
    name: "Porsche Carrera GT",
    image: "carrera-gt.jpg",
    colors: {},
    year: 2004,
    price: "₹5 Crore",
    topSpeed: "330 km/h",
    horsepower: "612 hp",
    acceleration: "0–100 km/h in 3.5s",
    rating: [],
    category: "supercar",
    description: "A V10-powered analog masterpiece, the Carrera GT is a legend in Porsche’s performance lineage."
  },
  {
    name: "Porsche 718 Cayman",
    image: "718.jpg",
    colors: {},
    year: 2024,
    price: "₹1.48 Crore",
    topSpeed: "275 km/h",
    horsepower: "420 hp",
    acceleration: "0–100 km/h in 4.4s",
    rating: [],
    category: "coupe",
    description: "The 718 Cayman delivers mid-engine balance and razor-sharp handling for pure driving pleasure."
  },
  {
    name: "Porsche 959",
    image: "959.jpg",
    colors: {},
    year: 1986,
    price: "₹3.5 Crore",
    topSpeed: "317 km/h",
    horsepower: "450 hp",
    acceleration: "0–100 km/h in 3.7s",
    rating: [],
    category: "classic",
    description: "A technological marvel of the 1980s, the 959 set the benchmark for modern supercars."
  },
  {
    name: "Porsche 356",
    image: "356.jpg",
    colors: {},
    year: 1948,
    price: "₹1 Crore",
    topSpeed: "180 km/h",
    horsepower: "60 hp",
    acceleration: "0–100 km/h in 13s",
    rating: [],
    category: "classic",
    description: "The original Porsche—lightweight, elegant, and the foundation of a legendary legacy."
  }
];

const carContainer = document.getElementById("models");
const searchInput = document.getElementById("searchInput");
const modal = document.getElementById("modal");
const carName = document.getElementById("carName");
const carImage = document.getElementById("carImage");
const carSpecs = document.getElementById("carSpecs");
const carDescription = document.getElementById("carDescription");
const ratingStars = document.getElementById("ratingStars");
const averageRating = document.getElementById("averageRating");
const closeModal = document.getElementById("closeModal");
const colorOptions = document.getElementById("colorOptions");
const addFavorite = document.getElementById("addFavorite");
const sortSelect = document.getElementById("sortSelect");
const compareA = document.getElementById("compareA");
const compareB = document.getElementById("compareB");
const comparisonResult = document.getElementById("comparisonResult");

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

