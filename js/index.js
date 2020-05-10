const xmlhttp = new XMLHttpRequest();
const url = 'https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72';

xmlhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    let myArr = JSON.parse(this.responseText);
    housesCarousel(myArr);
  }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

function housesCarousel(arr) {
  let out = "";
  for (let i = 0; i < arr.length - 21; i++) {
    out += `<div class="card" style="width: 15rem;">
              <img src="${arr[i].photo}" alt="${arr[i].name}" class="card-img-top img-card-offers">
              <div class="card-header">
                <h5>${arr[i].name}</h5>
                <p>${arr[i].property_type}</p>
              </div>
              <div class="card-body">
                <h5 class="card-title">R$ ${arr[i].price}</h5>
                <p class="card-text"></p>
                <p class="card-text"></p>
              </div>
              <div class="card-footer">
                <small class="text-muted">Last updated 3 mins ago</small>
              </div>
            </div>`;
  }
  document.getElementById("ofertas").innerHTML = out;
}