const items = document.getElementById("items");
const numberOfArticle = 8;

const couchData = () => {
  fetch(" http://localhost:3000/api/products")
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (value) {
      console.log(value);
    })
    .catch(function (err) {
      console.log("This is a err", err);
    });
};

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

for (let i = 0; i < numberOfArticle; i++) {
  createCard(i);
}
