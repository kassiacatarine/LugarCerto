let currentPage = 1;
const ITEMS_PER_PAGE = 8;
let places = [];

const getPlaces = () => {
  let xmlhttp = new XMLHttpRequest();
  const url = 'https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72';

  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let places = JSON.parse(this.responseText);
      renderPage(places);
    }
  };
  xmlhttp.open('GET', url, true);
  xmlhttp.send();
}

const placesCarousel = (arr) => {
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

const paginate = (array, page_number) => {
  return array.slice((page_number - 1) * ITEMS_PER_PAGE, page_number * ITEMS_PER_PAGE);
}

const renderPaginationMenu = () => {
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = '';
  if (currentPage !== 1)
    pagination.appendChild(getPaginationPrevious());

  pagination.appendChild(getPaginationCurrent());

  if (currentPage * ITEMS_PER_PAGE < this.places.length)
    pagination.appendChild(getPaginationNext());
  renderPaginationInfo();
}

const getPaginationCurrent = () => {
  const current = document.createElement('a');
  current.classList.add('paginate-active');
  current.classList.add('paginate-item');
  current.innerHTML = `${currentPage}`;
  return current;
}

const getPaginationPrevious = () => {
  const previous = document.createElement('a');
  previous.classList.add('paginate-buttom');
  previous.classList.add('paginate-item');
  previous.innerHTML = `<svg aria-hidden="true" role="presentation" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"
                          style="display: block; fill: none; height: 16px; width: 16px; stroke: currentcolor; stroke-width: 4; overflow: visible;">
                          <g fill="none">
                            <path
                              d="m20 28-11.29289322-11.2928932c-.39052429-.3905243-.39052429-1.0236893 0-1.4142136l11.29289322-11.2928932">
                            </path>
                          </g>
                        </svg>`
  previous.addEventListener('click', () => {
    currentPage <= 1 ? () => {} : changePage(currentPage - 1);
  })
  return previous;
}

const getPaginationNext = () => {
  const next = document.createElement('a');
  next.classList.add('paginate-buttom');
  next.classList.add('paginate-item');
  next.innerHTML = `<svg aria-hidden="true" role="presentation" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"
                      style="display: block; fill: none; height: 16px; width: 16px; stroke: currentcolor; stroke-width: 4; overflow: visible;">
                      <g fill="none">
                        <path
                          d="m12 4 11.2928932 11.2928932c.3905243.3905243.3905243 1.0236893 0 1.4142136l-11.2928932 11.2928932">
                        </path>
                      </g>
                    </svg>`
  next.addEventListener('click', () => {
    currentPage * ITEMS_PER_PAGE > this.places.length ? () => {} : changePage(currentPage + 1);
  })
  return next;
}

const renderPaginationInfo = () => {
  const paginationInfo = document.getElementById('pagination-info');
  const pageTotal = currentPage * ITEMS_PER_PAGE;
  paginationInfo.innerHTML = `${pageTotal - ITEMS_PER_PAGE + 1} – ${pageTotal <= this.places.length ? pageTotal : this.places.length} de mais de ${this.places.length} acomodações`
}

const changePage = (pageToChange) => {
  currentPage = pageToChange;
  renderPage(this.places);
}

const filterPlaces = (text, places) => {
  return places.filter(place => place.name.toLowerCase().includes(text.toLowerCase()));
}

const renderPage = (places) => {
  this.places = places;
  const paginetedData = paginate(places, currentPage);
  placesCarousel(paginetedData);
  renderPaginationMenu();
}

getPlaces();