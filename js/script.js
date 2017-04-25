
var color = [
  "#5A0000", // rouge
  "#9B0000",
  "#CD0404",
  "#F30C0C",
  "#FF4040",
  "#040C8F", // bleu
  "#0035C1",
  "#0046FF",
  "#008BFF",
  "#37BCFF",
  "#077A00", // vert
  "#09A100",
  "#0BCD00",
  "#4FEC00",
  "#8BFA53",
  "#B9005A", // rose
  "#E0006D",
  "#FF1285",
  "#FE71C2",
  "#FF8FC5"
];



header = document.createElement("header");
header.id = "entete";
header.innerHTML = "<h1>Color picker !</h1>";
document.body.appendChild(header);



popup = document.createElement("div");
popup.id = "popup_copied";
popup.innerHTML = "<h2>Copied !</h2>";
document.body.appendChild(popup);


//Function to convert hex format to a rgb color
function rgb2hex(orig){
 var rgb = orig.replace(/\s/g,'').match(/^rgba?\((\d+),(\d+),(\d+)/i);
 return (rgb && rgb.length === 4) ? "#" +
  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : orig;
}


function fade(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 100);
}

function copy_couleur(){
  console.log(rgb2hex(window.getComputedStyle(this).backgroundColor));
  var btn = document.getElementsByClassName('couleur');
  var clipboard = new Clipboard(btn);

  clipboard.on('success', function(e) {
  });

  clipboard.on('error', function(e) {
  });

  popup.style.display = "table";
  popup.style.opacity = 1;
  popup.style.backgroundColor = rgb2hex(window.getComputedStyle(this).backgroundColor);

  fade(popup);
}





// On créer une liste ul
var ul = document.createElement('ul');
// On lui attribut un id
ul.id = "liste_couleur";
// On l'affiche dans le body
document.querySelector('body').appendChild(ul);

// On boucle 5 fois
for(var i = 0; i < 20;i++){
  // la création du li
  var li = document.createElement('li');
  li.classList.add("couleur"); // on ajoute la class couleur
  li.style.backgroundColor = color[i]; // pour chaque couleur du tableau red_color[0] = i[0]

  li.setAttribute("data-clipboard-text", color[i])

  // on ajoute le contenu dans le li
  li.innerHTML = color[i];

  // on l'intègre dans le ul avec id liste_couleur_red
  document.getElementById('liste_couleur').appendChild(li);


  li.onclick = copy_couleur;
}

// on initialise une div clear à la fin de liste_couleur_red
var clear = document.createElement('div');
clear.classList.add("clear");
document.getElementById('liste_couleur').appendChild(clear);
