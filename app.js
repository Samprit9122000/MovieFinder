
const API_URL= "http://www.omdbapi.com/?apikey=ad92f34&s=";
const API_URL_SEARCH="http://www.omdbapi.com/?apikey=ad92f34&i=";

var search_input=document.getElementById("search-input");
var card=document.getElementsByClassName("movie-cards")[0];

document.getElementsByClassName("search")[0].addEventListener("click",function(){
    console.log(search_input.value);
    const query=search_input.value;
    if(query){
        getMovies(API_URL+query);
    }
});

async function getMovies(url){
    const resp=await fetch(url,{
        mode: 'cors',
        header: {
            'Access-Control-Allow-Origin':'*'
        }
    });
    const respData= await resp.json();
    // console.log(respData);
    showMovies(respData.Search);
};

function showMovies(movies){
    card.innerHTML="";
    // console.log(movies); // /////////////////////////////////////
    movies.forEach(async function(movie){
        // console.log(movie);  // /////////////////////////////////
        const movieData= await fetch(API_URL_SEARCH+movie.imdbID);
        const movieDataobj= await movieData.json() ;          //movieData.json()
        // console.log(movieDataobj);
        movie_display(movieDataobj);
    })
}

function movie_display(imovie){
    // console.log(imovie);
    const movieElm= document.createElement("div");
    movieElm.classList.add("movie-card");
    movieElm.innerHTML=`
    <div class="card">

    <img src="${imovie.Poster}" alt="Poster" width="200rem" height="270rem" />
    <br>
    <div class="movie-description">
    <span class="movie-title"><b>Title:</b><span class="value">${imovie.Title}</span></span>
    <span class="movie-title"><b>Rating:</b><span class="value">${imovie.imdbRating}</span></span>
    <span class="movie-title"><b>Director:</b><span class="value">${imovie.Director}</span></span>
    <span class="movie-title"><b>Released:</b><span class="value">${imovie.Released}</span></span>
    <span class="movie-title"><b>Genre:</b><span class="value">${imovie.Genre}</span></span>
    <span class="movie-title"><b>Cast:</b><span class="value">${imovie.Actors}</span></span>
    </div>
    
 </div>
    `;

    card.appendChild(movieElm);
}

