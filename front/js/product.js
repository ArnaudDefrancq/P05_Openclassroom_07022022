let params = new URLSearchParams(document.location.search);
console.log(params);
let id = params.get("id");
console.log(id);

const fetchData = async () => {
  fetch(`http://localhost:3000/api/products/${id}`)
    .then((response) => response.json())
    .then((data) => console.log(data));
};

fetchData();
