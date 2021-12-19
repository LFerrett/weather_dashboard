var APIKey = "8756b0c1a73cc214da1eeb5ee10ebe91";
var searchBtn = document.querySelector("#submit");
var citySelected = document.querySelector('#searchTerm').value;
var searchURL = "http://api.openweathermap.org/data/2.5/weather?q=" + citySelected + "&appid=" + APIKey;

var containerEl1 = document.querySelector('#container1');
var containerEl2 = document.querySelector('#container2');
var containerEl3 = document.querySelector('#container3');
var containerEl4 = document.querySelector('#container4');
var containerEl5 = document.querySelector('#container5');

function pullWeather() {

    fetch(searchURL)
        // The browser fetches the resource from the remote server without first looking in the cache.
        // The browser will then update the cache with the downloaded resource.
        cache: 'reload',
      
        then(function (response) {
          return response.json();
        })
        then(function (data) {
          console.log(data);
        });
      




    //fetch(searchURL.then(function (response) {
   // if (response.ok) {
     // response.json().then(function (data) {
       //displayWeather(data.items, language);
      // console.log("Contact Made");
    // })
  //  }
//})
}

var displayWeather = function (weather, citySelected) {
    if (repos.length === 0) {
      repoContainerEl.textContent = 'No repositories found.';
      return;
    }
  
    repoSearchTerm.textContent = searchTerm;
  
    for (var i = 0; i < repos.length; i++) {
      var repoName = repos[i].owner.login + '/' + repos[i].name;
  
      var repoEl = document.createElement('a');
      repoEl.classList = 'list-item flex-row justify-space-between align-center';
      repoEl.setAttribute('href', './single-repo.html?repo=' + repoName);
  
      var titleEl = document.createElement('span');
      titleEl.textContent = repoName;
  
      repoEl.appendChild(titleEl);
  
      var statusEl = document.createElement('span');
      statusEl.classList = 'flex-row align-center';
  
      if (repos[i].open_issues_count > 0) {
        statusEl.innerHTML =
          "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + ' issue(s)';
      } else {
        statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
      }
  
      repoEl.appendChild(statusEl);
  
      repoContainerEl.appendChild(repoEl);
    }
  };


searchBtn.addEventListener("click", pullWeather);