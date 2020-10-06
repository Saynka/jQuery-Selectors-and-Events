'use strict';

const animalsArray = [];
const animalsArray2 = [];

$().ready(() => {
  $.ajax('data/page-1.json', { method: 'GET', dataType: 'JSON' })
    .then((data) => {
      data.forEach(hornedAnimal => {
        let page = 1;
        var newAnimal = new Animal(hornedAnimal, page);
        newAnimal.createHTML();
      });
    })
    .then(() => {
      $.ajax('data/page-2.json', { method: 'GET', dataType: 'JSON' })
        .then((data) => {
          data.forEach(hornedAnimal => {
            let page2 = 2;
            var newAnimal2 = new Animal(hornedAnimal, page2);
            newAnimal2.createHTML();

          });
          console.log(animalsArray);
          dropDown()
          $(".2").hide()
        })

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

  animalsArray.forEach((Animal) => {
    let nameOfKey = Animal.keyword;
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

$('#1').on('click', () => {
  $('.2').hide()
  $('.1').show()
})

$('#2').on('click', () => {
  $('.1').hide()
  $('.2').show()
})
