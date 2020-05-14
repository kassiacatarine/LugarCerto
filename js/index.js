let xmlhttp = new XMLHttpRequest();
const url = 'https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72';

xmlhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    let myArr = JSON.parse(this.responseText);
    housesCarousel(myArr);
  }
};
xmlhttp.open('GET', url, true);
xmlhttp.send();

function housesCarousel(arr) {
  let out = "";
  for (let i = 0; i < arr.length; i++) {
    out += `<div class="card">
              <img src="${arr[i].photo}" alt="${arr[i].name}" class="card-img">
              <div class="card-header">
                <div class="property-type">${arr[i].property_type}</div>
                <div class="name">${arr[i].name}</div>
                <div class="card-title"><strong>R$ ${arr[i].price}</strong>/noite</div>
              </div>
            </div>`;
  }
  document.getElementById('cards-container').innerHTML = out;
}