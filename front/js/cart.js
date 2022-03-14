// récupérartion du localStorage
const getLocalStorageProducts = () =>
  JSON.parse(localStorage.getItem("produit"));

// var arrayLocalStorage = getLocalStorageProducts();
// console.log(arrayLocalStorage);

// Je vais chercher les données en fonction de l'ID choisit par l'utilisateur
const getProductsList = (localProducts) =>
  localProducts.map(async (item) => {
    try {
      const fetchData = await fetch(
        `http://localhost:3000/api/products/${item.id}`
      );
      return fetchData.json();
    } catch (err) {
      console.log("error", err);
    }
  });

// Je vérifie que l'ID issu de la base de donnée correspond bien a l'ID sélectionné par l'utilisateur
const getProductFromId = (productList, id) => {
  return productList.find((product) => product._id === id);
};

// je génére la carte si la fonction getProductFromId est respecté avec comme paramètre localProduct = données issus du localStorage et productList = données issus de l'API.
const generateCard = (localProduct, productsList) => {
  const product = getProductFromId(productsList, localProduct.id);
  if (product) {
    // j'affiche mon produit
    card(localProduct, product);
  }
};

// je génére les autres cartes en fonction de ce qu'il y a dans le panier
const generateCards = () => {
  const localProducts = getLocalStorageProducts();
  const productsList = getProductsList(localProducts);
  Promise.all(productsList).then((items) => {
    localProducts.forEach((localProduct) => {
      generateCard(localProduct, items);
    });
    // Ici le calcul du prix total
    totalArticle();
  });
};

generateCards();

const cartItem = document.querySelector("#cart__items");

// Création de la carte avec comme paramètre localProduct = données issus du localStorage et product = données issus de l'API.

const getPrice = (localProduct, product) => {
  const price = product.price;
  const quantity = localProduct.quantity;
  return quantity * price;
};

var arrayAllPrice = [];

const card = (localProduct, product) => {
  const cardPrice = getPrice(localProduct, product);
  // console.log(cardPrice);

  arrayAllPrice.push(cardPrice);
  const totalPrice = document.getElementById("totalPrice");
  const sumPrice = arrayAllPrice.reduce((sum, price) => {
    return (sum += price);
  });
  totalPrice.innerText = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(sumPrice);

  const articleNode = document.createElement("article");
  articleNode.classList.add("cart__item");
  articleNode.setAttribute("data-id", "{product-ID}");
  articleNode.setAttribute("data-color", "{product-color}");
  cartItem.appendChild(articleNode);

  const addDiv = document.createElement("div");
  addDiv.classList.add("cart__item__img");
  articleNode.appendChild(addDiv);

  const addImg = document.createElement("img");
  addImg.setAttribute("src", product.imageUrl);
  addImg.setAttribute("alt", product.altTxt);
  addDiv.appendChild(addImg);

  const newDiv = document.createElement("div");
  newDiv.classList.add("cart__item__content");
  articleNode.appendChild(newDiv);

  const division = document.createElement("div");
  division.classList.add("cart__item__content__description");
  newDiv.appendChild(division);

  const titleProd = document.createElement("h2");
  titleProd.innerText = product.name;
  division.appendChild(titleProd);

  const color = document.createElement("p");
  color.innerText = localProduct.option;
  division.appendChild(color);

  const price = document.createElement("p");
  price.innerText = product.price;
  division.appendChild(price);

  const nextDiv = document.createElement("div");
  nextDiv.classList.add("cart__item__content__settings");
  articleNode.appendChild(nextDiv);

  const otherDiv = document.createElement("div");
  otherDiv.classList.add("cart__item__content__settings__quantity");
  nextDiv.appendChild(otherDiv);

  const qte = document.createElement("p");
  qte.innerText = `Qté :`;
  otherDiv.appendChild(qte);

  const input = document.createElement("input");
  input.setAttribute("type", "number");
  input.setAttribute("name", "itemQuantity");
  input.setAttribute("min", "1");
  input.setAttribute("max", "100");
  input.setAttribute("value", `${localProduct.quantity}`);
  input.classList.add("itemQuantity");
  otherDiv.appendChild(input);

  // mettre dans fx
  input.addEventListener("input", (e) => {
    const idColor = localProduct.option;
    const id = localProduct.id;
    // console.log(idColor);
    // console.log(e.target.value);
    const newQuantity = e.target.value;
    // console.log(newQuantity);
    const arrayStorage = getLocalStorageProducts();
    // rajouter ID
    arrayStorage.forEach((data) => {
      if (idColor === data.option && id === data.id) {
        data.quantity = newQuantity;
      }
    });
    // console.log(arrayStorage);
    localStorage.setItem("produit", JSON.stringify(arrayStorage));
    window.location.reload();
  });

  const lastDiv = document.createElement("div");
  lastDiv.classList.add("cart__item__content__settings__delete");
  nextDiv.appendChild(lastDiv);

  const deleteItems = document.createElement("p");
  deleteItems.classList.add("deleteItem");
  deleteItems.innerText = "Supprimer";
  lastDiv.appendChild(deleteItems);

  // mettre dans fx
  deleteItems.addEventListener("click", () => {
    console.log("test");
    const idColor = localProduct.option;
    const id = localProduct.id;
    // console.log(ID);
    const arrayStorage = getLocalStorageProducts();
    // console.log(arrayStorage);
    // ajouter ID
    const arrayTest = arrayStorage.filter((el) => el.option !== idColor && id);
    // console.log(arrayTest);
    localStorage.setItem("produit", JSON.stringify(arrayTest));
    window.location.reload();
  });
};

const totalArticle = () => {
  const totalQuantity = document.getElementById("totalQuantity");
  const localProducts = getLocalStorageProducts();
  var numberItem = [];
  // console.log(localProducts);
  localProducts.map((data) => {
    numberItem.push(Number(data.quantity));
    return numberItem;
  });
  // console.log(numberItem);

  const sumNumberItem = numberItem.reduce((sum, currentNote) => {
    return (sum += currentNote);
  });
  // console.log(sumNumberItem);
  totalQuantity.innerText = sumNumberItem;
};

// Vérification du formulaire

const form = document.querySelector(".cart__order__form");

const firstNameError = document.querySelector("#firstNameErrorMsg");
const lastNameError = document.querySelector("#lastNameErrorMsg");
const adressError = document.querySelector("#addressErrorMsg");
const cityError = document.querySelector("#cityErrorMsg");
const emailError = document.querySelector("#emailErrorMsg");

const submit = document.getElementById("order");

const inputName = document.getElementById("firstName");
const inputLastName = document.getElementById("lastName");
const inputAdress = document.getElementById("address");
const inputCity = document.getElementById("city");
const inputEmail = document.getElementById("email");

// console.log(lastNameError);

// Vérification du formulaire.
// quand formulaire bon => envoyer les value dans un objet
// Envoyer l'objet avec la methode post à api
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    validateString(inputName, firstNameError) &&
    validateString(inputLastName, lastNameError) &&
    validateString(inputCity, cityError) &&
    validateEmail(inputEmail, emailError) &&
    validateAdress(inputAdress, adressError)
  ) {
    // console.log(newOrder);
    order();
    // Appel api avec newOrder
    // newOrder();
    // console.log(newOrderData);
  }
  apiData();
  // console.log(e);
});

const validateAdress = (node, nodeError) => {
  if (/^[a-zA-Z0-9\s]{2,40}$/.test(inputAdress.value)) {
    // console.log("Bien bon");
    node.textContent = "";
  } else {
    nodeError.textContent = "Veuillez remplire correctement ce champ !";
  }
  return true;
};

const validateEmail = (node, nodeError) => {
  if (/^[\w_.-]+@[\w-]+\.[a-z]{2,4}$/.test(inputEmail.value)) {
    // console.log("tout est ok");
    node.textContent = "";
  } else {
    nodeError.textContent = "Veuillez remplire correctement ce champ !";
  }
  return true;
};

const validateString = (node, nodeError) => {
  if (/^[a-zA-Z\s]{3,20}$/.test(node.value)) {
    // console.log("bon");
    nodeError.textContent = "";
    return true;
  } else {
    nodeError.textContent = "Veuillez remplire correctement ce champ !";
    return false;
  }
};

const order = () => {
  const newOrder = {
    contact: {
      firstName: inputName.value,
      lastName: inputLastName.value,
      city: inputCity.value,
      address: inputAdress.value,
      email: inputEmail.value,
    },
    products: getLocalStorageProducts(),
  };
  // console.log(newOrder);
  return newOrder;
};

const newOrder = () => {
  const newOrderData = {
    method: "POST",
    body: JSON.stringify(order()),
    headers: {
      "Content-Type": "application/json",
    },
  };
  console.log(newOrderData);
  return newOrderData;
};

const apiData = () => {
  fetch("http://localhost:3000/api/products/order", newOrder()).then(
    (response) => response.json()
  );
  // .then((data) => console.log(data));
};
