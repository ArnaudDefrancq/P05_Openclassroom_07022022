let params = new URLSearchParams(document.location.search);
console.log(params);
let id = params.get("id");
console.log(id);

const fetchData = async () => {
  fetch(`http://localhost:3000/api/products/${id}`)
    .then((response) => response.json())
    .then((data) => createItem(data))
    .catch((err) => console.log("Ceci est une erreur", err));
};

fetchData();

const titleNode = document.getElementById("title");
const priceNode = document.getElementById("price");
const descriptionNode = document.getElementById("description");
const itemImgNode = document.getElementById("item__div");
const colorsNode = document.getElementById("colors");

const createItem = (data) => {
  const itemImg = document.createElement("img");
  itemImg.setAttribute("src", data.imageUrl);
  itemImg.setAttribute("alt", data.altTxt);
  itemImgNode.appendChild(itemImg);

  titleNode.innerText = data.name;

  priceNode.innerText = data.price;

  descriptionNode.innerText = data.description;

  var array = data.colors;
  console.log(array);

  array.forEach((color) => {
    var option = document.createElement("option");
    option.innerText = color;
    colorsNode.appendChild(option);
  });
};
