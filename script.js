//globala variabler som är kopplade mot HTML-taggar
const radios = document.querySelectorAll('input[type="radio"]');
const persons = document.querySelector('select[name="persons"]');
const addition = document.querySelectorAll('input[name="addition"]');
const nights = document.querySelector('select[name="nights"]');
const campaigncode = document.querySelector('input[name="campaigncode"]');
const city = document.getElementById("city");
const zipcode = document.getElementById("zipcode")
const telephone = document.getElementById("telephone");
const email = document.getElementById("email");
const booking = document.getElementById("booking");
const totalCost = document.getElementById("totalCost");

//funktionen körs när sidan laddas in
//kontrollerar först vilken radioknapp som är ifylld för att sedan andropa funktionen checkIfFamilyRoom och funiktionen totalPriceCalculator
//övervakar när man ändrar antalet nätter och anropar funktionen totalPriceCalculator isåfall
//anropar totalPriceCalculator oavsett
//övervakar när man fyller i symboler på inputen city och ändrar till stora bokstäver
//övervakar när formuläret skickas, kontrollerar då om postnummer och telefonummer stämmer enligt reglerna
//övervakar när man fyller i symboler på inputen campaigncode och ändrar bakgrundsfärgen utifrån om man fyllt rätt eller fel enligt kampanjkodens regler
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

    city.addEventListener("input", e =>{
        city.value = city.value.toUpperCase();
    })

    booking.addEventListener("submit", e =>{
        const phone = telephone.value;
        const digits = phone.replace(/[ \-/]/g, "");

        const patternZipcode = /^\d{5}$/;

        const patternTelephoneFormat = /^0\d*(?:[ \-/]\d+)?$/.test(phone);
        const patternTelephoneLength = /^0\d{6,11}$/.test(digits);

        if(zipcode.value !== "" && !patternZipcode.test(zipcode.value)){
            e.preventDefault();
            alert("Postnummret får bara innehålla siffor (exakt 5 siffror)");
        }

        if(phone !== "" && (!patternTelephoneFormat || !patternTelephoneLength)){
            e.preventDefault();
            alert("Ange telefonnummer som börjar med 0 och följs av 6-11 siffror");
        }
    })
    campaigncode.addEventListener("input", e =>{
        const patternCampaigncode = /^[a-zA-Z]{3}-\d{2}-[a-zA-Z]\d$/.test(campaigncode.value);

        if(patternCampaigncode){
            campaigncode.style.backgroundColor = "lightgreen";
        }
        else{
            campaigncode.style.backgroundColor = "red";
        }
    })
}

window.onload = init;

//funktionen kollar om familjerummet är ifyllt och isåfall disablar den tredje checboxen för tillägg ("Sjöutsikt") samt byter färg på texterna
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

//funktionen kollar vilka tillägg som är ifyllda och adderar det till priset som sedan returneras
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

//funktionen kontrollerar vilket rum som är valt och adderar det till totalpriset
//sedan adderas returvärdet från funktionen checkAdditions (priset för tilläggen).
//därefter multipliceras totalen med antalet nätter
//sedan byts 0 ut mot totalPrice inuti span-taggarna i HTML-koden
function totalPriceCalculator(){
    let totalPrice = 0;

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