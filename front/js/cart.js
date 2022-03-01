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
  // console.log(productsList);
  // console.log(localProduct);
  const product = getProductFromId(productsList, localProduct.id);
  console.log({ localProduct, product });
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
      // console.log(localProduct);
      // console.log(items);
    });
    // Ici le calcul du prix total
  });
};

generateCards();

const cartItem = document.querySelector("#cart__items");

// Création de la carte avec comme paramètre localProduct = données issus du localStorage et product = données issus de l'API.

const card = (localProduct, product) => {
  const cartItem = document.querySelector("#cart__items");
  // console.log(cartItem);

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
  price.innerText = `${product.price} €`;
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

  const lastDiv = document.createElement("div");
  lastDiv.classList.add("cart__item__content__settings__delete");
  nextDiv.appendChild(lastDiv);

  const p = document.createElement("p");
  p.classList.add("deleteItem");
  p.innerText = "Supprimer";
  lastDiv.appendChild(p);

  p.addEventListener("click", () => {
    console.log("test");
    const ID = `${(localProduct.id, product._id)}`;
    // console.log(ID);
    const arrayStorage = getLocalStorageProducts();
    // console.log(arrayStorage);
    const arrayTest = arrayStorage.filter((el) => el.id !== ID);
    console.log(arrayTest);
    localStorage.setItem("produit", JSON.stringify(arrayTest));
    window.location.reload();
  });
};
