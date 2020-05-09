var xmlhttp = new XMLHttpRequest();
var url = 'https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72';

xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var myArr = JSON.parse(this.responseText);
    console.log(myArr);
    
    housesCarousel(myArr);
  }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

function housesCarousel(arr) {
    let out = "";
    for(let i = 0; i < arr.length - 19; i++) {
      out += `<a href="/details.html" class="item">
                <img src="${arr[i].photo}" alt="${arr[i].name}" >
                <p class="type">${arr[i].property_type}</p>
                <p class="name">${arr[i].name}</p>
                <p class="price">R$ ${arr[i].price}</p>
              </a>`;
    }
    document.getElementById("houses").innerHTML = out;
}