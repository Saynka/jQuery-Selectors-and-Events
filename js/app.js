'use strict';

const animalsArray = [];
$().ready(() => {
  $.ajax('data/page-1.json', { method: 'GET', dataType: 'JSON' }).then((data) => {
    data.forEach(hornedAnimal => {
      var newAnimal = new Animal(hornedAnimal);
      newAnimal.createHTML();
    });
    dropDown();

  });
});
function Animal(object) {
  this.title = object.title;
  this.description = object.description;
  this.keyword = object.keyword;
  this.horns = object.horns;
  this.image_url = object.image_url;
  animalsArray.push(this);
};


Animal.prototype.createHTML = function () {
  let myTemplate = $('#template').html();
  let html = Mustache.render(myTemplate, this);

  $('main').append(html);
};

function dropDown() {

  let keywords = [];
  //grab drop down ID

  animalsArray.forEach((Animal) => {
    let nameOfKey = Animal.keyword;
    // ! - does the opposite
    if (!keywords.includes(nameOfKey)) {
      keywords.push(nameOfKey);
    }
  })
  keywords.forEach(keyword => {
    let option = $(`<option value=${keyword}>${keyword}</option>`)
    $('#dropDown').append(option)
    
  })
  console.log(keywords);
  // .on( events [, selector ] [, data ] )

  // add event listener to dropdown
  $('#dropDown').on('change', function () {
    $('.Animal').remove();
    animalsArray.forEach(Animal => {
      if (Animal.keyword === this.value) {
        Animal.myTemplate();
      }
    })
  })
}
