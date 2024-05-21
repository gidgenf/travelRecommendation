function search() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();

    fetch("travel_recommendation_api.json")
        .then(response => response.json())
        .then(data => {
            const results = [];

            function searchInputText(text, searchInput) {
                return text.toLowerCase().includes(searchInput);
            }

            data.countries.forEach(country => {
                country.cities.forEach(city => {
                    if (searchInputText(city.name, searchInput) || searchInputText(city.description, searchInput)) {
                        results.push({
                            name: city.name,
                            category: "city",
                            description: city.description,
                            imageUrl: city.imageUrl
                        });
                    }
                });
            });

            data.temples.forEach(temple => {
                if (searchInputText(temple.name, searchInput) || searchInputText(temple.description, searchInput)) {
                    results.push({
                        name: temple.name,
                        category: "temple",
                        description: temple.description,
                        imageUrl: temple.imageUrl
                    });
                }
            });

            data.beaches.forEach(beach => {
                if (searchInputText(beach.name, searchInput) || searchInputText(beach.description, searchInput)) {
                    results.push({
                        name: beach.name,
                        category: "beach",
                        description: beach.description,
                        imageUrl: beach.imageUrl
                    });
                }
            });

            displayResults(results);
        })
        .catch(error => console.error("Error while search", error));
}

function displayResults(results) {
    const resultsDiv = document.createElement("div");
    resultsDiv.classList.add("search-results");

    if (results.length > 0) {
        results.forEach(result => {
            const resultItem = document.createElement("div");
            resultItem.classList.add("search-result");
            resultItem.innerHTML = `
        <div class="container4">
            <img src="${result.imageUrl}" style="max-width: 900px; max-height: 900px;" alt="${result.name}">
              <h3>${result.name}</h3>
              <p>${result.description}</p>
              <button class="bookBtn">Visit</button>
        </div>
        `;
            resultsDiv.appendChild(resultItem);
        });
    } else {
        const noResults = document.createElement("p");
        noResults.textContent = "No results.";
        resultsDiv.appendChild(noResults);
    }

    const containerResults = document.querySelector(".resultsContainer");
    containerResults.innerHTML = "";
    containerResults.appendChild(resultsDiv);
}

function clearSearch() {
    document.getElementById("searchInput").value = "";
    const containerResults = document.querySelector(".resultsContainer");
    containerResults.innerHTML = '';
}