const accessKey = "wwkWc2M3KY0DDRMd0XA6CZhJd2PHc-L103pfErzTgQ8";
const searchForm = document.querySelector("form");
const searchInput = document.querySelector(".search-input");
const imageContainer = document.querySelector(".images-container");
const loadMore = document.querySelector(".loadMoreBtn");

// function to fetch images using Unsplash API
const fetchImages = async (query, pageNo) => {
    try {
        if (pageNo === 1) {
            imageContainer.innerHTML = "";
        }
        const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=28&page=${pageNo}&client_id=${accessKey}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.results.length > 0) {
            data.results.forEach((photo) => {
                // creating image div
                const imageElement = document.createElement("div");
                imageElement.classList.add("imageDiv");
                imageElement.innerHTML = `<img src="${photo.urls.regular}"/>`;
                // creating overlay div
                const overlayElement = document.createElement("div");
                overlayElement.classList.add("overlay");
                // adding overlay text
                const overlayText = document.createElement("h3");
                overlayText.innerText = `${photo.alt_description}`;
                // append child html
                overlayElement.appendChild(overlayText);
                imageElement.appendChild(overlayElement);
                imageContainer.appendChild(imageElement);
            });

            if (data.total_pages === pageNo) {
                loadMore.style.display = "none";
            } else {
                loadMore.style.display = "block";
            }
        } else {
            imageContainer.innerHTML = `<h2>No image found.</h2>`;
            if (loadMore.style.display === "block") {
                loadMore.style.display = "none";
            }
        }
    } catch (e) {
        imageContainer.innerHTML = `<h2>Failed to fetch images. Plase try again later.</h2>`;
    }
};

let page = 1;

// add Event-Listner
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputText = searchInput.value.trim();
    // console.log(inputText);
    if (inputText !== "") {
        page = 1;
        fetchImages(inputText, page);
    } else {
        imageContainer.innerHTML = `<h2>Plase enter a search query.</h2>`;
        if (loadMore.style.display === "block") {
            loadMore.style.display = "none";
        }
    }
});

// add event listner to lode more btn
loadMore.addEventListener("click", () => {
    fetchImages(searchInput.value.trim(), ++page);
});
