'use strict';

function getDogImage() {
  fetch(createUrl())
    .then(response => response.json())
    .then(responseJson => displayToDom(responseJson))
    .catch(error => alert('Something went wrong. Try again later.'))
}
//input imageUrl
//output image list html string
function imageHtmlString(urlString) {
  //return a string of the li
  return `<li class="image-container"><img src="${urlString}"></li>`
}

function createUrl() {
  let numberOfImages = $('#numOfImages').val();
  return "https://dog.ceo/api/breeds/image/random/" + numberOfImages;
}

function appendToImageResultsContainer(urlString) {
  $('#img-results-ol').append(imageHtmlString(urlString));
}

function displayToDom(responseJson) {
  console.log(responseJson);
  //get the results array from the json response
  let imageUrlArray = responseJson.message;
  //append each one to the container
  imageUrlArray.forEach(urlString => {
    appendToImageResultsContainer(urlString)
  });
  //display the results section
  $('.results').removeClass('hidden');
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    removeDisplayedImages();
    getDogImage();
  });
}

function removeDisplayedImages() {
  $('.image-container').remove();
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
})