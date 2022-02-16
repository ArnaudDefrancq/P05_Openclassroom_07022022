const items = document.getElementById("items");

// Prendre les données disponibles dans l'API
const fetchData = async () => {
  await fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then((data) => createAllCard(data))
    .catch((err) => console.log("Ceci est une erreur", err));
};

// Fonction de création des cartes
const createCard = ({ name, description, imageUrl, altTxt, _id }) => {
  const linkNode = document.createElement("a");
  linkNode.setAttribute("href", `./product.html?id=${_id}`);
  items.appendChild(linkNode);

  const articleNode = document.createElement("article");
  linkNode.appendChild(articleNode);

  const imgNode = document.createElement("img");
  imgNode.setAttribute("src", imageUrl);
  imgNode.setAttribute("alt", altTxt);

  articleNode.appendChild(imgNode);

  const titleNode = document.createElement("h3");
  titleNode.classList.add("productName");
  titleNode.innerText = name;
  articleNode.appendChild(titleNode);

  const descriptionNode = document.createElement("p");
  descriptionNode.classList.add("productDescription");
  descriptionNode.innerText = description;
  articleNode.appendChild(descriptionNode);
};

// ForEach pour créer toute les cartes en fonction du nombre d'éléments disponible
const createAllCard = (data) => {
  data.forEach((card) => {
    createCard(card);
  });
};

// Pour que la fonction de l'API se lance au chargement de la page
window.addEventListener("DOMContentLoaded", async () => {
  await fetchData();
});
