'use strict';

var titles = ['Car Model', 'Model Year', 'Price', 'Manufacturer'];
var allData = [];

function Cars(model, year, price, manufacturer){
    this.model = model;
    this.year = year;
    this.price = price;
    this.manufacturer= manufacturer;
    this.maxPrice = 10000;
    this.minPrice = 7000;
    allData.push(this);

}

Cars.prototype.getRandomPrice = function(){
    this.price = Math.floor(getRandomNumber(this.maxPrice, this.minPrice));
}
function getRandomNumber(max, min){
    return Math.random()*(max - min +1) + min;
}

var formEl = document.getElementById('form');
formEl.addEventListener('submit', addCar);
function addCar(event){
    event.preventDefault();

    var carModel = event.target.carModel.value;
    var modelYear = event.target.modelYear.value;
    var manu = document.getElementById('manufacturer');
    var manuValue = manu.options[manu.selectedIndex].value;

    var allItems = new Cars(carModel, modelYear, 0, manuValue);
    //allItems.getRandomPrice();
    allItems.showData();
    localStorage.setItem('data', JSON.stringify('allData'));

}

var tableEL = document.getElementById('table');

function showHeader ( ){
    var trEl = document.createElement('tr');
    tableEL.appendChild(trEl);
    for(var i = 0 ; i < titles.length; i++){
        var th = document.createElement('th');
        trEl.appendChild(th);
        th.textContent = titles[i];
    }
}
showHeader();

Cars.prototype.showData =function(){
    var trEl1 = document.createElement('tr');
    tableEL.appendChild(trEl1);

    var tdEl = document.createElement('td');
    trEl1.appendChild(tdEl);
    tdEl.textContent = this.model;

    var tdEl1 = document.createElement('td');
    trEl1.appendChild(tdEl1);
    tdEl1.textContent = this.year;

    var tdEl2 = document.createElement('td');
    trEl1.appendChild(tdEl2);
    tdEl2.textContent = this.price;

    var tdEl2 = document.createElement('td');
    trEl1.appendChild(tdEl2);
    tdEl2.textContent = this.manufacturer;
}

if(localStorage.getItem('data')){
    var preData = JSON.parse(localStorage.getItem('data'));
    for(var a=0; a < preData.length; a++){
        new Cars(preData[a].model, preData[a].year, preData[a].price, preData[a].manufacturer);
    }
}

for (var j=0 ; j<allData.length; j++){
    allData[j].getRandomPrice();
    allData[j].showData();
}