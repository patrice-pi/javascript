var color = [
  "#CF000F", "#F22613", "#DC3023", // rouge
  "#BFBFBF", "#ECF0F1", "#ABB7B7", // gris
  "#8E44AD", "#9B59B6", "#763568", // violet
  "#26C281", "#4DAF7C", "#87D37C", // vert
  "#22A7F0", "#1F4788", "#4B77BE", // bleu
  "#F62459", "#C93756", "#F47983", // rose
  "#F7CA18", "#FFB61E", "#FFA400", // jaune
  "#6C7A89", "#BFBFBF", "#95A5A6", // gris 2
  "#003171", "#89C4F4", "#044F67", // bleu 2
  "#8F1D21", "#9D2933", "#C91F37", // rouge 2
  "#000000", "#3C3C3C", "#9E9E9E", // sombre
  "#B3B3B3", "#C9C9C9", "#FDFDFD"  // clair
];



function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
       xobj.overrideMimeType("application/json");
   xobj.open('GET', 'data.json', true);
   xobj.onreadystatechange = function () {
         if (xobj.readyState == 4 && xobj.status == "200") {
           callback(xobj.responseText);
         }
   };
   xobj.send(null);
  }
  loadJSON(function(response) {
     couleur = JSON.parse(response);
     console.log(couleur['couleur']);
  });






var button = document.getElementById("submit");
var form = document.getElementById("popup_connect");
var masque = document.getElementById("masque");
var user = document.getElementById("user");
var deconnect = document.getElementById("deconnect");
var menu = document.getElementById("menu");


deconnect.onclick = function(){
  localStorage.removeItem("pseudo");
  form.style.display = "block";
  masque.style.display = "block";
  form.style.opacity = "1";
  masque.style.opacity = "1";
  fade(menu);
}


form.onsubmit = connect;
button.onclick = connect;


function connect(){
  localStorage.setItem('pseudo', form.elements["name"].value);
  fade(form);
  fade(masque);
  user.innerHTML = localStorage.getItem("pseudo");
  menu.style.display = "block";
  menu.style.opacity = "1";
}


// Si un utilisateur est présent en localstorage, on masque la popup connect
if (localStorage.getItem("pseudo") === null) {
  form.style.display = "block";
  masque.style.display = "block";
} else { // sinon on affiche la popup
  fade(form);
  fade(masque);
  menu.style.display = "block";
  user.innerHTML = "Hello " + localStorage.getItem("pseudo")+ " !";

  if(localStorage.getItem("pseudo") == "patrice"){

  }
}



header = document.createElement("header"); // On créer un élément avec la balise header et on le stock dans la variable header
header.id = "entete"; // on ajoute l'id entete au header
header.innerHTML = "<h1>Color picker !</h1>"; // On ajouter du html a l'intérieur : une balise h1
document.body.appendChild(header); // on défini header comme enfant de body



popup = document.createElement("div"); // On créer un élément avec la balise div et on le stock dans la variable popup
popup.id = "popup_copied"; // on ajoute l'id popup_copied au popup
popup.innerHTML = "<h2>Copy Success !</h2>"; // On ajouter du html a l'intérieur : une balise h2
document.body.appendChild(popup); // on défini popup comme enfant de body


// Fonction pour convertir les résultats de couleur RGB en HEXA
function rgb2hex(orig){
 var rgb = orig.replace(/\s/g,'').match(/^rgba?\((\d+),(\d+),(\d+)/i);
 return (rgb && rgb.length === 4) ? "#" +
  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : orig;
}


// Fonction qui fait disparaitre l'élément en parametre
function fade(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.001){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 10);
}



tab_favori = "";

// Fonction qui copy la couleur au click
function copy_couleur(){
  console.log(rgb2hex(window.getComputedStyle(this).backgroundColor));
  var btn = document.getElementsByClassName('couleur');
  var clipboard = new Clipboard(btn);
  tab_favori = rgb2hex(window.getComputedStyle(this).backgroundColor);
  add_favori(this,tab_favori);
  clipboard.on('success', function(e) {
  });

  clipboard.on('error', function(e) {
  });

  popup.style.display = "table";
  popup.style.opacity = 1;
  popup.style.backgroundColor = rgb2hex(window.getComputedStyle(this).backgroundColor);

  var delayMillis = 300; //1 second

  setTimeout(function() {
    fade(popup);
  }, delayMillis);

  document.getElementById('entete').style.backgroundColor = rgb2hex(window.getComputedStyle(this).backgroundColor);
}

function add_favori(tile,fav){
  tab.push(fav);
  // console.log(tab);
}

var tab = new Array();


var ul = document.createElement('ul'); // On créer un élément de type liste ul
ul.id = "liste_couleur"; // On lui attribut un id
document.querySelector('body').appendChild(ul); // On l'affiche dans le body

// On boucle autant de fois qu'on a de couleur dans le tableau color
for(var i = 0; i < color.length; i++){

  var li = document.createElement('li'); // la création du li
  li.classList.add("couleur"); // on ajoute la class couleur au li
  li.style.backgroundColor = color[i]; // pour chaque couleur du tableau color[0] = i[0]

  li.setAttribute("data-clipboard-text", color[i]); // pour chaque couleur, on rajoute un attribut data-clipboard-text avec la couleur en parametre

  li.innerHTML = "<span class='text-color'>"+color[i]+"</span>"; // on ajoute la couleur correspondante au li dans un span

  var favori = document.createElement('i');
  favori.classList.add("fa");
  favori.classList.add("fa-heart");
  favori.classList.add("favori_color_"+(i+1));

  document.getElementById('liste_couleur').appendChild(li); // on l'intègre dans le ul avec id liste_couleur

  li.appendChild(favori);

  li.onclick = copy_couleur; // au click sur un li, on execute la fonction copy_couleur

  favori.onclick = function(){
    add_favori;
    this.style.opacity = "1";
  }
}

// on initialise une div clear à la fin de liste_couleur_red
var clear = document.createElement('div');
clear.classList.add("clear");
document.getElementById('liste_couleur').appendChild(clear);
