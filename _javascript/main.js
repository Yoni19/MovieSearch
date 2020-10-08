const key = "f0a7b9e6" ;

const selector = document.getElementById('Movie');
console.log("clé :" ,key);
const transformUrl = "https://www.omdbapi.com/?apikey=" + key + '&s=';
console.log(transformUrl);

function showList(selector, poster, name, year, imdbID) {
	console.log(selector);
	selector.innerHTML += `
	        <div class="column is-one-quarter">
		<div class="card">
		    <div class="card-content">
		    <p class="title">
		    	${name}
		    </p>
		    <img src="${poster}" />
		    </div>
		    <footer class="card-footer">
                    <p class="card-footer-item">
                    <span>${year}</span>
    		    </p>
    		    <p class="card-footer-item">
      		    <button id="myBtn" class="button is-primary modal-button" onclick="return moreInfo('${imdbID}')" data-target="myModal" aria-haspopup="true">Plus d'informations</button>
    		    </p>
  		    </footer>
    		</div> 
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
		.catch((error) => console.error('problem :', error))
  };




  const moreInfo = (imdbID) => {
    let url = "https://www.omdbapi.com/?i=" + imdbID + "&apikey=" + key;
    fetch(url)
      .then((response) => response.json())
      .then((response) => moreVisualisation(response))
      .catch((error) => console.error(error));
    document.getElementById('myModal').classList.add('is-active');
  };
  
  const moreVisualisation = (movie) => {
    let modal = document.getElementById("myModal");
    let movieTitle = document.getElementById("movie-title");  
    movieTitle.innerHTML = `${movie.Title}`
    let content = document.getElementById("modal-movie-content");
    content.innerHTML = `
      <div class="d-flex row mb-3">
        <img class="img-thumbnail m-3" style="max-width: 8rem;" src="${movie.Poster}">
        <div class="card-body text-info">
          <p class="card-text">${movie.Year}</p>
          <p class="card-text">${movie.Plot}</p>
        </div>
      </div>
    `;
    

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

document.getElementById('modal-close').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('myModal').classList.remove('is-active'); 
  });

