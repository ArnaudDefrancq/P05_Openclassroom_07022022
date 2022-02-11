const titleNode = document.getElementById("title");
const priceNode = document.getElementById("price");
const descriptionNode = document.getElementById("description");

const fetchData = async () => {
  await fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then((data) => recepData(data))
    .catch((err) => console.log("Ceci est une erreur", err));
};
