// equire("dotenv").config();

// console.log(process.env.APIKEY);

// Delete key if and only if .env works!
const key = "f0a7b9e6" ;

const selector = document.getElementById('Movie');
console.log("clé :" ,key);
const transformUrl = "https://www.omdbapi.com/?apikey=" + key + '&s=';
console.log(transformUrl);

function showList(selector, poster, name, year, imdbID) {
	selector.innerHTML += `
  <div class="wrapper">

<hr style="color:white";>

	<div class="cards">

		<figure class="card">

			<img src="${poster}" />

      <figcaption>${name}<br>${year}</figcaption>
     
    </figure>
 
</div>
<button id="myBtn" type="button" class="btn btn-outline-info" onclick="return moreInfo('${imdbID}')">Plus d'informations</button>
</div>
      
	`;
};

    





const movieList = (selector,transformUrl) => {
    const research = document.getElementById('searching').value;
    let url = transformUrl + research;
    selector.innerHTML = '';
    fetch(url)
    .then((response) => response.json())
    .then((response) => {response.Search.forEach(film => {
      showList(selector,
        film.Poster,
        film.Title,
        film.Year,
        film.imdbID
      
        );
    })
    })
    .then(() => addIntersectionObserver())
		.catch((error) => console.error('Houston, we have a problem :', error))
  };




  const moreInfo = (imdbID) => {
    let url = "https://www.omdbapi.com/?i=" + imdbID + "&apikey=" + key;
    fetch(url)
      .then((response) => response.json())
      .then((response) => moreVisualisation(response))
      .catch((error) => console.error(error));
  };
  
  const moreVisualisation = (movie) => {
    let modal = document.getElementById("myModal");
    let span = document.getElementsByClassName("close")[0];
  
    modal.style.display = "block";
  
    let content = document.getElementsByClassName("content")[0];
    content.innerHTML = `
      <div class="d-flex row mb-3">
        <img class="img-thumbnail m-3" style="max-width: 8rem;" src="${movie.Poster}">
        <div class="card-body text-info">
          <h2 class="card-title">${movie.Title}</h2>
          <p class="card-text">${movie.Year}</p>
          <p class="card-text">${movie.Plot}</p>
        </div>
      </div>
    `;
  
    span.onclick = function() {
      modal.style.display = "none";
    }
  
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      };
    };
  };

  

  const addIntersectionObserver = () => {
    let observer = new IntersectionObserver(function (observables) {
      observables.forEach(function (observable) {
        if (observable.intersectionRatio > 0.5) {
          observable.target.classList.remove('not-visible')
          console.log('Item visible')
        } else {
          observable.target.classList.add('not-visible')
        }
      })
    }, {
      threshold: [0.5]
  
    })
  
    let items = document.querySelectorAll('.row')
    items.forEach(function (item) {
      item.classList.add('not-visible')
      observer.observe(item)
    })
  };



// starting fonction
  document.getElementById('goSearch').addEventListener('click', (e) => {
    e.preventDefault();
    movieList(selector, transformUrl);
  });