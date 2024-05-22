let searchInputEle = document.getElementById("searchInput");
let searchResultsEle = document.getElementById("searchResults");
let spinnerEle = document.getElementById("spinner");

function creatAndAppendSearchResult(result) {
    let {
        title,
        link,
        description
    } = result;
    //Div containr--result-item
    let resultItemEle = document.createElement("div");
    resultItemEle.classList.add("result-item");
    searchResultsEle.appendChild(resultItemEle);
    //Ancher Title--result-title
    let resultTitleEle = document.createElement("a");
    resultTitleEle.classList.add("result-title");
    resultTitleEle.textContent = title;
    resultTitleEle.href = link;
    resultTitleEle.target = "_blank";
    resultItemEle.appendChild(resultTitleEle);

    //line break
    let titleBreakEle = document.createElement("br");

    resultItemEle.appendChild(titleBreakEle);
    //Anchar url 

    let urlEle = document.createElement("a");
    urlEle.classList.add("result-url");
    urlEle.herf = link;
    urlEle.target = "-blank";
    urlEle.textContent = link;
    resultItemEle.appendChild(urlEle);
    //line break
    let urlBreakEle = document.createElement("br");

    resultItemEle.appendChild(urlBreakEle);
    //para discription--

    let disEle = document.createElement("p");
    disEle.classList.add("line-discription");
    disEle.textContent = description;
    resultItemEle.appendChild(disEle);

}

function DisplayResults(searchResults) {
    spinnerEle.classList.toggle("d-none");
    for (let result of searchResults) {
        creatAndAppendSearchResult(result);
    }
}

function searchWiki(event) {
    if (event.key === "Enter") {
        searchResultsEle.textContent = "";
        spinnerEle.classList.toggle("d-none");
        let searchInput = searchInputEle.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                DisplayResults(search_results);
            });
    }
}

searchInputEle.addEventListener("keydown", searchWiki);