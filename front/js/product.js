// Sélection de l'ID du produit sélectionné par l'utilisateur
let params = new URLSearchParams(document.location.search);
console.log(params);
let id = params.get("id");
console.log(id);

// Sélection du bon produit dans l'API
const fetchData = async () => {
  await fetch(`http://localhost:3000/api/products/${id}`)
    .then((response) => response.json())
    .then((data) => createItem(data))
    .catch((err) => console.log("Ceci est une erreur", err));
};

// Création de la carte du produit
const titleNode = document.getElementById("title");
const priceNode = document.getElementById("price");
const descriptionNode = document.getElementById("description");
const itemImgNode = document.getElementById("item__div");
const colorsNode = document.getElementById("colors");

const createItem = ({ imageUrl, altTxt, name, price, description, colors }) => {
  const itemImg = document.createElement("img");
  itemImg.setAttribute("src", imageUrl);
  itemImg.setAttribute("alt", altTxt);
  itemImgNode.appendChild(itemImg);

  titleNode.innerText = name;

  priceNode.innerText = price;

  descriptionNode.innerText = description;

  var array = colors;

  array.forEach((color) => {
    var option = document.createElement("option");
    option.innerText = color;
    colorsNode.appendChild(option);
  });
};

// Pour que la fonction de l'API se lance au chargement de la page
window.addEventListener("DOMContentLoaded", async () => {
  await fetchData();
});

// Enregistrement du produit pour le récuperer pour le mettre dans le panier (localStorage)
const addToCart = document.getElementById("addToCart");
const quantity = document.getElementById("quantity");

addToCart.addEventListener("click", function () {
  // console.log("test");
  const item = {
    _id: id,
    option: colorsNode.value,
    quantity: quantity.value,
  };
  // console.log(item);

  // La key est en format JSON donc il faut passer par JSON.parse => objet JS
  var itemSelect = JSON.parse(localStorage.getItem("produit"));
  // console.log(itemSelect);

  // Si il y a déjà une key dans le local, on rajoute les new items dans le local
  if (itemSelect) {
    itemSelect.push(item);
    localStorage.setItem("produit", JSON.stringify(itemSelect));
    console.log(itemSelect);
  }
  // Si il n'y a pas de key dans le local, on creait la key et on met les données dans le local
  else {
    itemSelect = [];
    itemSelect.push(item);
    localStorage.setItem("produit", JSON.stringify(itemSelect));

    // console.log(itemSelect);
  }
});
