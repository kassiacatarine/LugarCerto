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

const renderPaginationMenu = (placesArraySize) => {
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = '';
  if (currentPage !== 1)
    pagination.appendChild(getPaginationPrevious());

  pagination.appendChild(getPaginationCurrent());

  if (currentPage * ITEMS_PER_PAGE < placesArraySize)
    pagination.appendChild(getPaginationNext());
  renderPaginationInfo(placesArraySize);
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

const renderPaginationInfo = (placesArraySize) => {
  const paginationInfo = document.getElementById('pagination-info');
  const pageTotal = currentPage * ITEMS_PER_PAGE;
  paginationInfo.innerHTML = `${pageTotal - ITEMS_PER_PAGE + 1} – ${pageTotal <= placesArraySize ? pageTotal : placesArraySize} de mais de ${placesArraySize} acomodações`
}

const changePage = (pageToChange) => {
  currentPage = pageToChange;
  renderPage(this.places);
}

const filterPlaces = (places) => {
  const text = document.getElementById('filter').value;
  return places.filter(place =>
    place.name.toLowerCase().indexOf(text.toLowerCase()) !== -1 ||
    place.property_type.toLowerCase().indexOf(text.toLowerCase()) !== -1);
}

const setEventFilter = () => {
  const searchButton = document.getElementById('search-button');
  searchButton.addEventListener('click', () => {
    currentPage = 1;
    renderPage(this.places);
  });
  const inputFilter = document.getElementById('filter');
  inputFilter.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      currentPage = 1;
      renderPage(this.places);
    }
  });
}

function initMap() {
  const locations = [
    ['Brasília, DF', -15.7215857, -48.0073976, 1],
    ['St. Hab. Vicente Pires', -15.8039749, -48.0393341, 2],
    ['Taguatinga Norte', -15.8016346, -48.0674421, 3],
    ['Samambaia Norte', -15.8859553, -48.1471659, 4],
    ['Recanto das Emas', -15.9207827, -48.0615657, 5]
  ];

  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: new google.maps.LatLng(-15.7215857, -48.0073976),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  const infowindow = new google.maps.InfoWindow();

  let marker, i;

  for (i = 0; i < locations.length; i++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][1], locations[i][2]),
      map: map
    });

    google.maps.event.addListener(marker, 'click', (function (marker, i) {
      return function () {
        infowindow.setContent(locations[i][0]);
        infowindow.open(map, marker);
      }
    })(marker, i));
  }
}

const renderPage = (places) => {
  this.places = places;
  const placesFiltered = filterPlaces(places);
  const paginetedData = paginate(placesFiltered, currentPage);
  placesCarousel(paginetedData);
  renderPaginationMenu(placesFiltered.length);
}

getPlaces();
setEventFilter();