const items = document.getElementById("items");
const numberOfArticle = 8;
let array = [];

const couchData = async () => {
  await fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then((data) => (array = data))
    .catch((err) => console.log("Ceci est une erreur", err));
};

couchData();

// const createCard = async () => {
//   await couchData();

//   console.log(array);

//   const link = document.createElement("a");
//   items.appendChild(link);

//   const article = document.createElement("article");
//   link.appendChild(article);

//   const img = document.createElement("img");
//   article.appendChild(img);

//   const title = document.createElement("h3");
//   title.classList.add("productName");
//   title.innerText = array.forEach((test) => test.name);
//   article.appendChild(title);

//   const description = document.createElement("p");
//   description.classList.add("productDescription");
//   description.innerText = array[length].description;
//   article.appendChild(description);
// };

// for (let i = 0; i < numberOfArticle; i++) {
//   createCard(i);
// }

const createCard = () => {
  const link = document.createElement("a");
  items.appendChild(link);

  const article = document.createElement("article");
  link.appendChild(article);

  const img = document.createElement("img");
  article.appendChild(img);

  const title = document.createElement("h3");
  title.classList.add("productName");
  article.appendChild(title);

  const description = document.createElement("p");
  description.classList.add("productDescription");
  article.appendChild(description);
};

const createAllCard = () => {
  for (let i = 0; i < numberOfArticle; i++) {
    createCard(i);
  }
};

createAllCard();
