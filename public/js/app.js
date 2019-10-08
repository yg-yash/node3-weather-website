const weatherForm = document.querySelector("form");
const searchValue = document.querySelector("input");
const p1 = document.querySelector("#p1");
const p2 = document.querySelector("#p2");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  const location = searchValue.value;
  p1.textContent = "Loading...";
  p2.textContent = "";
  fetch(`/weather?address=${location}`).then(response => {
    response.json().then(data => {
      if (data.error) {
        p1.textContent = data.error;
        p2.textContent = "";
      } else {
        p1.textContent = data.forecast;
        p2.textContent = data.location;
      }
    });
  });
});
