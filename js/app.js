'use strict';

const animalsArray = [];
const animalsArray2 = [];

$().ready(() => {
  $.ajax('data/page-1.json', { method: 'GET', dataType: 'JSON' }).then((data) => {
    data.forEach(hornedAnimal => {
      let page = 1;
      var newAnimal = new Animal(hornedAnimal,page);
      newAnimal.createHTML();
    });


  }).then(() => {
    $.ajax('data/page-2.json', { method: 'GET', dataType: 'JSON' }).then((data) => {
      data.forEach(hornedAnimal => {
        let page2 = 2;
        var newAnimal2 = new Animal(hornedAnimal,page2);
        newAnimal2.createHTML();
      });
    })

  }).then(() => {
    console.log(animalsArray);
    dropDown()
  })

});

function Animal(object, page) {
  this.title = object.title;
  this.description = object.description;
  this.keyword = object.keyword;
  this.horns = object.horns;
  this.image_url = object.image_url;
  this.page = page;
  animalsArray.push(this);
}


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
    console.log(nameOfKey, keywords)
    if (!keywords.includes(nameOfKey)) {
      keywords.push(nameOfKey);
    }
  })
  keywords.forEach(keyword => {
    let option = $(`<option value=${keyword}>${keyword}</option>`)
    $('#dropDown').append(option)

  });


  // add event listener to dropdown
  $('select').on('change', function () {
    $('section').hide();
    animalsArray.forEach(Animal => {
      if (Animal.keyword === this.value) {
        $(`section[class = ${Animal.keyword}]`).show();
      }
    })
  })


}
