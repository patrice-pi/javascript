compteur = 200;

document.onkeydown = function(e) {
  var key = e.keyCode;



  if (key === 37 || key === 81) { //left arrow pressed
    console.log('left');
  } else if (key === 39 || key === 68) { //right arrow pressed
    console.log('right');
  } else if (key === 38 || key === 90) {
    console.log('avancer');
    compteur++;
  } else if (key === 40 || key === 83) {
    console.log('stabiliser');
  }

  console.log(compteur);
}


function deplace()
{
  $('.fond').animate({
    top: '-=360'
  },
  1000,
  'linear',
  function(){
    $('.fond').css('top', 0);
    deplace();
  });
}


function deplace()
{
  $('#vj').animate({top: '-=600'}, 2500, 'linear', function(){
    var vrX = Math.floor(Math.random()*194)+70;
    var vrY = 400;
    $('#vj').css('top',vrY);
    $('#vj').css('left',vrX);
  });
  // Ici se trouve l'appel à la méthode animate()
  // pour animer la route
  deplace();
};


$(document).keydown(function(e){
  if (e.which == 39)
  {
    vjX = parseInt($('#vr').css('left'));
    if (vjX < 280)
      $('#vr').css('left', vjX+30);
  }

  if (e.which == 37)
  {
    vjX = parseInt($('#vr').css('left'));
    if (vjX > 70)
      $('#vr').css('left', vjX-30);
  }
});


function collision()
{
  vjX = parseInt($('#vj').css('left'));
  vrX = parseInt($('#vr').css('left'));
  vjY = 10;
  vrY = parseInt($('#vr').css('top'));
  if (((vrX > vjX) && (vrX < (vjX+66)) && (vrY > vjY) && (vrY < (vjY+150)) &&(ok == 1))
  || ((vjX > vrX) && (vjX < (vrX+66)) && (vrY > vjY) && (vrY < (vjY+150)) && (ok == 1)))
  {
    collision = parseInt($('#info').text()) + 1;
    $('#info').text(collision);
    ok = 0;
  }
}
