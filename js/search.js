let xmlhttp = new XMLHttpRequest();
const url = 'https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72';

xmlhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    let adverts = JSON.parse(this.responseText);
    console.log(adverts);
    housesCarousel(adverts);
  }
};
xmlhttp.open('GET', url, true);
xmlhttp.send();

function housesCarousel(arr) {
  let out = '';
  for (let i = 0; i < arr.length; i++) {
    out += `<div class="col mb-4">
              <div class="card h-100">
                <img src="${arr[i].photo}" class="card-img-top" alt="${arr[i].name}">
                <div class="card-body">
                  <h5 class="card-title">${arr[i].name}</h5>
                  <p class="card-text">${arr[i].property_type}</p>
                  <h6 class="card-text">R$ ${arr[i].price}</h6>
                </div>
              </div>
            </div>`;
  }
  document.getElementById('cards').innerHTML = out;
}