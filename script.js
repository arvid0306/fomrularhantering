const radios = document.querySelectorAll('input[type="radio"]');
const persons = document.querySelector('select[name="persons"]');
const addition = document.querySelectorAll('input[name="addition"]');
const nights = document.querySelector('select[name="nights"]');
const totalCost = document.getElementById("totalCost");
let totalPrice = 0;

function init(){
    for(let i = 0; i < radios.length; i++){
        radios[i].addEventListener("click", checkIfFamilyRoom);
        radios[i].addEventListener("click", totalPriceCalculator);
    }
    checkIfFamilyRoom();

    for(let i = 0; i < addition.length; i++){
        addition[i].addEventListener("click", totalPriceCalculator);
    }

    nights.addEventListener("change", totalPriceCalculator);

    totalPriceCalculator();
}

window.onload = init;

function checkIfFamilyRoom(){
    if(radios[2].checked){
        persons.disabled = false;
        persons.parentNode.style.color = '#000';


        addition[2].disabled = true;
        addition[2].checked = false;
        addition[2].parentNode.style.color = '#999';
    }
    else{
        persons.disabled = true;
        persons.parentNode.style.color = '#999';

        addition[2].disabled = false;
        addition[2].parentNode.style.color = '#000';
    }
}

function checkAdditions(){
    let price = 0;

    if(addition[0].checked){
        price = price + 40;
    }
    if(addition[1].checked){
        price = price + 80;
    }
    if(addition[2].checked){
        price = price + 100;
    }

    return price;
}

function totalPriceCalculator(){
    totalPrice = 0;

    if(radios[0].checked){
        totalPrice = totalPrice + 600;
    }
    if(radios[1].checked){
        totalPrice = totalPrice + 800;
    }
    if(radios[2].checked){
        totalPrice = totalPrice + 950;
    }

    totalPrice += checkAdditions();

    let numberOfNights = nights.value;

    totalPrice *= numberOfNights;

    totalCost.textContent = totalPrice;
}