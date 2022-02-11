const items = document.getElementById("items");

const fetchData = async () => {
  await fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then((data) => createAllCard(data))
    .catch((err) => console.log("Ceci est une erreur", err));
};

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

const createAllCard = (data) => {
  data.forEach((card) => {
    createCard(card);
  });
};

window.addEventListener("DOMContentLoaded", async () => {
  await fetchData();
});
