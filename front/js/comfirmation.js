const textId = document.getElementById("orderId");

const displayId = () => {
  textId.innerText = localStorage.getItem("orderId");
};

displayId();

localStorage.clear();
