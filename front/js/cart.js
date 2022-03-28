// récupérartion du localStorage
const getLocalStorageProducts = () =>
  JSON.parse(localStorage.getItem("products"));

if (getLocalStorageProducts() === null) {
  const empty = document.getElementById("cart__items");
  empty.innerText = "Votre panier est vide";
  const totalQuantity = document.getElementById("totalQuantity");
  totalQuantity.textContent = "0";
} else {
  // Je vais chercher les données en fonction de l'ID choisit par l'utilisateur
  const getProductsList = (localProducts) =>
    localProducts.map(async (item) => {
      try {
        const fetchData = await fetch(
          `http://localhost:3000/api/products/${item._id}`
        );
        return fetchData.json();
      } catch (err) {
        console.log("error", err);
      }
    });

  // Je vérifie que l'ID issu de la base de donnée correspond bien a l'ID sélectionné par l'utilisateur
  const getProductFromId = (productList, _id) => {
    return productList.find((product) => product._id === _id);
  };

  // je génére la carte si la fonction getProductFromId est respecté avec comme paramètre localProduct = données issus du localStorage et productList = données issus de l'API.
  const generateCard = (localProduct, productsList) => {
    const product = getProductFromId(productsList, localProduct._id);
    if (product) {
      // j'affiche mon produit
      card(localProduct, product);
    }
  };

  // je génére les autres cartes en fonction de ce qu'il y a dans le panier
  const generateCards = () => {
    const localProducts = getLocalStorageProducts();
    const productsList = getProductsList(localProducts);
    if (productsList) {
      Promise.all(productsList).then((items) => {
        localProducts.forEach((localProduct) => {
          generateCard(localProduct, items);
        });
        // Ici le calcul le nombre total d'article
        totalArticle();
      });
    }
  };

  generateCards();

  // Création de la carte avec comme paramètre localProduct = données issus du localStorage et product = données issus de l'API.
  const cartItem = document.querySelector("#cart__items");

  // Calcul du prix en fonction de la quantitée
  const getPrice = (localProduct, product) => {
    const price = product.price;
    const quantity = localProduct.quantity;
    return quantity * price;
  };

  var arraySumPrice = [];

  // Création des cartes en fonction des articles
  const card = (localProduct, product) => {
    // Calcul du prix
    const cardPrice = getPrice(localProduct, product);
    arraySumPrice.push(cardPrice);
    const totalPrice = document.getElementById("totalPrice");
    const sumPrice = arraySumPrice.reduce((sum, price) => {
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

    const divImg = document.createElement("div");
    divImg.classList.add("cart__item__img");
    articleNode.appendChild(divImg);

    const addImg = document.createElement("img");
    addImg.setAttribute("src", product.imageUrl);
    addImg.setAttribute("alt", product.altTxt);
    divImg.appendChild(addImg);

    const divDescription = document.createElement("div");
    divDescription.classList.add("cart__item__content");
    articleNode.appendChild(divDescription);

    const divContentDescription = document.createElement("div");
    divContentDescription.classList.add("cart__item__content__description");
    divDescription.appendChild(divContentDescription);

    const titleProduct = document.createElement("h2");
    titleProduct.innerText = product.name;
    divContentDescription.appendChild(titleProduct);

    const colorProduct = document.createElement("p");
    colorProduct.innerText = localProduct.option;
    divContentDescription.appendChild(colorProduct);

    const priceProduct = document.createElement("p");
    priceProduct.innerText = `${product.price} €`;
    divContentDescription.appendChild(priceProduct);

    const divSettings = document.createElement("div");
    divSettings.classList.add("cart__item__content__settings");
    articleNode.appendChild(divSettings);

    const divQuantity = document.createElement("div");
    divQuantity.classList.add("cart__item__content__settings__quantity");
    divSettings.appendChild(divQuantity);

    const qte = document.createElement("p");
    qte.innerText = `Qté :`;
    divSettings.appendChild(qte);

    const inputQuantity = document.createElement("input");
    inputQuantity.setAttribute("type", "number");
    inputQuantity.setAttribute("name", "itemQuantity");
    inputQuantity.setAttribute("min", "1");
    inputQuantity.setAttribute("max", "100");
    inputQuantity.setAttribute("value", `${localProduct.quantity}`);
    inputQuantity.classList.add("itemQuantity");
    divSettings.appendChild(inputQuantity);

    // fonction qui permet d'augmenter ou de diminuer la quantitée d'un article
    inputQuantity.addEventListener("input", (e) => {
      const idColor = localProduct.option;
      const id = localProduct._id;
      const newQuantity = e.target.value;
      const arrayStorage = getLocalStorageProducts();
      arrayStorage.forEach((data) => {
        if (idColor === data.option && id === data._id) {
          data.quantity = newQuantity;
        }
      });
      localStorage.setItem("products", JSON.stringify(arrayStorage));
      window.location.reload();
    });

    const divDelete = document.createElement("div");
    divDelete.classList.add("cart__item__content__settings__delete");
    divSettings.appendChild(divDelete);

    const deleteItems = document.createElement("p");
    deleteItems.classList.add("deleteItem");
    deleteItems.innerText = "Supprimer";
    divDelete.appendChild(deleteItems);

    // fonction qui permet de supprimer un article du parnier
    deleteItems.addEventListener("click", () => {
      const idColor = localProduct.option;
      const id = localProduct._id;
      const arrayStorage = getLocalStorageProducts();
      const arrayTest = arrayStorage.filter(
        (el) => el.option !== idColor && id
      );
      localStorage.setItem("products", JSON.stringify(arrayTest));
      window.location.reload();
    });
  };

  const totalArticle = () => {
    const totalQuantity = document.getElementById("totalQuantity");
    const localProducts = getLocalStorageProducts();
    var numberItems = [];
    localProducts.map((data) => {
      numberItems.push(Number(data.quantity));
      return numberItems;
    });
    const sumNumberItem = numberItems.reduce((sum, currentNote) => {
      return (sum += currentNote);
    }, 0);

    totalQuantity.innerText = sumNumberItem;
    if (sumNumberItem === 0) {
      const empty = document.getElementById("cart__items");
      empty.innerText = "Votre panier est vide";
    }
  };
}

// Vérification du formulaire

const form = document.querySelector(".cart__order__form");

const firstNameError = document.querySelector("#firstNameErrorMsg");
const lastNameError = document.querySelector("#lastNameErrorMsg");
const addressError = document.querySelector("#addressErrorMsg");
const cityError = document.querySelector("#cityErrorMsg");
const emailError = document.querySelector("#emailErrorMsg");

const submit = document.getElementById("order");

const inputName = document.getElementById("firstName");
const inputLastName = document.getElementById("lastName");
const inputAddress = document.getElementById("address");
const inputCity = document.getElementById("city");
const inputEmail = document.getElementById("email");

// Vérification du formulaire.
// quand formulaire bon => envoyer les value dans un objet
// Envoyer l'objet avec la methode post à api

form.addEventListener("submit", (e) => {
  if (
    validateString(inputName, firstNameError) &&
    validateString(inputLastName, lastNameError) &&
    validateString(inputCity, cityError) &&
    validateEmail(inputEmail, emailError) &&
    validateAdress(inputAddress, addressError)
  ) {
    const products = getLocalStorageProducts().map(({ _id }) => _id);
    const order = {
      contact: {
        firstName: inputName.value,
        lastName: inputLastName.value,
        address: inputAddress.value,
        city: inputCity.value,
        email: inputEmail.value,
      },
      products,
    };

    const options = {
      method: "POST",
      body: JSON.stringify(order),
      headers: { "Content-Type": "application/json" },
    };

    fetch("http://localhost:3000/api/products/order", options)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          localStorage.setItem("orderId", data.orderId);
          document.location.href = "confirmation.html";
        }
      })
      .catch((err) => console.log("Il y a un problème", err));
  } else {
    alert("Les champs ne sont pas bien remplit");
    e.preventDefault();
  }
});

// fonction de vérification des input
const validateAdress = (node, nodeError) => {
  if (/^[a-zA-Z0-9\s]{2,40}$/.test(node.value)) {
    nodeError.textContent = "";
    return true;
  } else {
    nodeError.textContent = "Veuillez remplire correctement ce champ !";
    return false;
  }
};

const validateEmail = (node, nodeError) => {
  if (/^[\w_.-]+@[\w-]+\.[a-z]{2,4}$/.test(node.value)) {
    nodeError.textContent = "";
    return true;
  } else {
    nodeError.textContent = "Veuillez remplire correctement ce champ !";
    return false;
  }
};

const validateString = (node, nodeError) => {
  if (/^[a-zA-Z\s]{3,20}$/.test(node.value)) {
    nodeError.textContent = "";
    return true;
  } else {
    nodeError.textContent = "Veuillez remplire correctement ce champ !";
    return false;
  }
};
