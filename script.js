const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let initialLoad = true;
let count = 5;
const apiKey = "VBnzH9Z7mF74YogReUzDX_pPsNtQoR2RMcbNvGP7s_o";
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

let photosArray = [];

//Get photos from unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    //Handle Error
    console.log("error", error);
  }
}

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    initialLoad = false;
    count = 30;
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
  }
}

// Helper funtion to set attributes on DOM elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

//Display photos
async function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  photosArray.forEach((photos) => {
    //Create <a> to link to Unsplash
    const item = document.createElement("a");
    setAttributes(item, {
      href: photos.links.html,
      target: "_blank",
    });
    //Create img for photo
    const image = document.createElement("img");
    setAttributes(image, {
      src: photos.urls.regular,
      alt: photos.alt_description,
      title: photos.alt_description,
    });
    // Add event listener, check if each is finished loading
    image.addEventListener("load", imageLoaded);

    //Put <img> inside <a> and put <a> inside image conatiner
    item.appendChild(image);
    imageContainer.appendChild(item);
  });
}

//Load more photos when reaches bottom
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

getPhotos();
