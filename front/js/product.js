// Sélection de l'ID du produit sélectionné par l'utilisateur
let params = new URLSearchParams(document.location.search);

let id = params.get("id");

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
  const item = {
    _id: id,
    option: colorsNode.value,
    quantity: Number(quantity.value),
  };

  // si l'utilisateur ne sélectionne pas de couleur
  if (colorsNode.value == "") {
    alert("Veuillez choisir une couleur");
    return;
  }

  // Si l'utilisateur ne sélectionne pas de quantité
  if (quantity.value == "0") {
    alert("Veuillez choisir une quantitée");
    return;
  }

  // Si les 2 conditions sont remplits alors j'envoie le produit dans le local storage

  // La key est en format JSON donc il faut passer par JSON.parse => objet JS
  var itemSelect = JSON.parse(localStorage.getItem("products"));

  // Si il y a déjà une key dans le local, on rajoute les new items dans le local
  if (itemSelect) {
    const existingItemIndex = itemSelect.findIndex(
      ({ _id }) => item._id === _id
    );
    console.log({ existingItemIndex });

    // Si il y a déjà ce produit dans mon panier, je ne fais qu'augmenter la quantité
    if (existingItemIndex !== undefined) {
      itemSelect[existingItemIndex] = {
        ...item,
        quantity: itemSelect[existingItemIndex].quantity + item.quantity,
      };
    } else {
      // Sinon je l'ajoute à mon panier
      itemSelect.push(item);
    }

    localStorage.setItem("products", JSON.stringify(itemSelect));
    console.log(itemSelect);
    alert("Votre article a bien été ajouté au panier");
  } else {
    // Si il n'y a pas de key dans le local, on creait la key et on met les données dans le local
    itemSelect = [];
    itemSelect.push(item);
    localStorage.setItem("products", JSON.stringify(itemSelect));
    alert("Votre article a bien été ajouté au panier");
  }
});
