"use strict";

var key = "f0a7b9e6";

var selector = document.getElementById('Movie');
console.log("clé :", key);
var transformUrl = "https://www.omdbapi.com/?apikey=" + key + '&s=';
console.log(transformUrl);

function showList(selector, poster, name, year, imdbID) {
  console.log(selector);
  selector.innerHTML += "\n\t        <div class=\"column is-one-quarter\">\n\t\t<div class=\"card\">\n\t\t    <div class=\"card-content\">\n\t\t    <p class=\"title\">\n\t\t    \t" + name + "\n\t\t    </p>\n\t\t    <img src=\"" + poster + "\" />\n\t\t    </div>\n\t\t    <footer class=\"card-footer\">\n                    <p class=\"card-footer-item\">\n                    <span>" + year + "</span>\n    \t\t    </p>\n    \t\t    <p class=\"card-footer-item\">\n      \t\t    <button id=\"myBtn\" class=\"button is-primary modal-button\" onclick=\"return moreInfo('" + imdbID + "')\" data-target=\"myModal\" aria-haspopup=\"true\">Plus d'informations</button>\n    \t\t    </p>\n  \t\t    </footer>\n    \t\t</div> \n                </div>\n\t";
};

var movieList = function movieList(selector, transformUrl) {
  var research = document.getElementById('searching').value;
  var url = transformUrl + research;
  selector.innerHTML = '';
  fetch(url).then(function (response) {
    return response.json();
  }).then(function (response) {
    response.Search.forEach(function (film) {
      showList(selector, film.Poster, film.Title, film.Year, film.imdbID);
    });
  }).then(function () {
    return addIntersectionObserver();
  }).catch(function (error) {
    return console.error('problem :', error);
  });
};

var moreInfo = function moreInfo(imdbID) {
  var url = "https://www.omdbapi.com/?i=" + imdbID + "&apikey=" + key;
  fetch(url).then(function (response) {
    return response.json();
  }).then(function (response) {
    return moreVisualisation(response);
  }).catch(function (error) {
    return console.error(error);
  });
  document.getElementById('myModal').classList.add('is-active');
};

var moreVisualisation = function moreVisualisation(movie) {
  var modal = document.getElementById("myModal");
  var movieTitle = document.getElementById("movie-title");
  movieTitle.innerHTML = "" + movie.Title;
  var content = document.getElementById("modal-movie-content");
  content.innerHTML = "\n      <div class=\"d-flex row mb-3\">\n        <img class=\"img-thumbnail m-3\" style=\"max-width: 8rem;\" src=\"" + movie.Poster + "\">\n        <div class=\"card-body text-info\">\n          <p class=\"card-text\">" + movie.Year + "</p>\n          <p class=\"card-text\">" + movie.Plot + "</p>\n        </div>\n      </div>\n    ";

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    };
  };
};

var addIntersectionObserver = function addIntersectionObserver() {
  var observer = new IntersectionObserver(function (observables) {
    observables.forEach(function (observable) {
      if (observable.intersectionRatio > 0.5) {
        observable.target.classList.remove('not-visible');
        console.log('Item visible');
      } else {
        observable.target.classList.add('not-visible');
      }
    });
  }, {
    threshold: [0.5]

  });

  var items = document.querySelectorAll('.row');
  items.forEach(function (item) {
    item.classList.add('not-visible');
    observer.observe(item);
  });
};

// starting fonction
document.getElementById('goSearch').addEventListener('click', function (e) {
  e.preventDefault();
  movieList(selector, transformUrl);
});

document.getElementById('modal-close').addEventListener('click', function (e) {
  e.preventDefault();
  document.getElementById('myModal').classList.remove('is-active');
});