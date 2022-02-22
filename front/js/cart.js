var array = JSON.parse(localStorage.getItem("produit"));
// console.log(array);

const fetchData = async () => {
  for await (let data of array) {
    fetch(`http://localhost:3000/api/products/${data.id}`)
      .then((response) => response.json())
      .then((data2) => array.push(data2))
      .catch((err) => console.log("Ceci est une erreur", err));
  }
};

fetchData();

console.log(array.length);

// array.forEach((data) => {
//   console.log(data.option);
// });

// array.forEach((data) => {
//   console.log(data.quantity);
// });

// array.forEach((data) => {
//   console.log(data[3].name);
// });
// array.forEach((data) => {
//   console.log(data.price);
// });

// array.forEach((data) => {
//   const cartItem = document.querySelector("#cart__items");
//   // console.log(cartItem);

//   const articleNode = document.createElement("article");
//   articleNode.classList.add("cart__item");
//   articleNode.setAttribute("data-id", "{product-ID}");
//   articleNode.setAttribute("data-color", "{product-color}");
//   cartItem.appendChild(articleNode);

//   const addDiv = document.createElement("div");
//   addDiv.classList.add("cart__item__img");
//   articleNode.appendChild(addDiv);

//   const addImg = document.createElement("img");
//   addImg.setAttribute("src", data.imageUrl);
//   addImg.setAttribute("alt", data.altTxt);
//   addDiv.appendChild(addImg);

//   const newDiv = document.createElement("div");
//   newDiv.classList.add("cart__item__content");
//   articleNode.appendChild(newDiv);

//   const division = document.createElement("div");
//   division.classList.add("cart__item__content__description");
//   newDiv.appendChild(division);

//   const titleProd = document.createElement("h2");
//   titleProd.innerText = data.name;
//   division.appendChild(titleProd);

//   const color = document.createElement("p");
//   color.innerText = data.option;
//   division.appendChild(color);

//   const price = document.createElement("p");
//   price.innerText = data.price;
//   division.appendChild(price);

//   const nextDiv = document.createElement("div");
//   nextDiv.classList.add("cart__item__content__settings");
//   articleNode.appendChild(nextDiv);

//   const otherDiv = document.createElement("div");
//   otherDiv.classList.add("cart__item__content__settings__quantity");
//   nextDiv.appendChild(otherDiv);

//   const qte = document.createElement("p");
//   qte.innerText = `Qté :`;
//   otherDiv.appendChild(qte);

//   const input = document.createElement("input");
//   input.setAttribute("type", "number");
//   input.setAttribute("name", "itemQuantity");
//   input.setAttribute("min", "1");
//   input.setAttribute("max", "100");
//   input.setAttribute("value", `${data.quantity}`);
//   input.classList.add("itemQuantity");
//   otherDiv.appendChild(input);

//   const lastDiv = document.createElement("div");
//   lastDiv.classList.add("cart__item__content__settings__delete");
//   nextDiv.appendChild(lastDiv);

//   const p = document.createElement("p");
//   p.classList.add("deleteItem");
//   p.innerText = "Supprimer";
//   lastDiv.appendChild(p);
// });
