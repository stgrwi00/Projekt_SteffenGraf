function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  var year = today.getFullYear();
  var month = today.getMonth() + 1;
  var date = today.getDate();
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById('time').innerHTML =
    h + ":" + m + ":" + s;
  document.getElementById('date').innerHTML =
    date + "." + month + "." + year;
  var t = setTimeout(startTime, 500);
}

function checkTime(i) {
  if (i < 10) { i = "0" + i };
  return i;
}


document.getElementById('lock').addEventListener('click', lock);
document.getElementById('unlock').addEventListener('click', unlock);

document.querySelector('footer').addEventListener('click', handlefooterClick);
function handlefooterClick(event) {

  switch (event.target.id) {

    case 'b1':
      displayCar();
      break;

    case 'b2':
      displaySettings();
      break;

    case 'b3':
      displayMultimedia();
      break;

    case 'b4':
      displayMap();
      break;

    case 'b5':
      displayEnvironment();
      break;
  }

}



function lock() {
  document.getElementById("lock").style.display = "none";
  fetch('http://192.168.0.71:5000/action/lock');
  document.getElementById("unlock").style.display = "block";
}

function unlock() {
  document.getElementById("lock").style.display = "block";
  fetch('http://192.168.0.71:5000/action/unlock');
  document.getElementById("unlock").style.display = "none";
}

var main = document.getElementsByClassName("main")

var intervallcar
function displayCar() {

  clearInterval(intervallenvironment);


  main[0].innerHTML = '';
  main[0].style.gridTemplateColumns = '10% 1fr 10% 1fr 10%';
  main[0].style.gridTemplateRows = '1fr 1fr 1fr';
  main[0].style.background = "white";

  intervallcar = setInterval(function () {
    fetch('http://192.168.0.71:5000/status').then(function (response) {
      response.text().then(function (text) {
        console.log(text);

        var array = JSON.parse(text);
        console.log(array.consumption);



        var Div1 = document.createElement("div1");
        Div1.classList.add('speed');
        var Div2 = document.createElement("div2");
        Div2.classList.add('consumption');


        var Text1 = document.createTextNode(array.speed + " km/h");
        var Text2 = document.createTextNode(array.consumption + " l/100km");

        Div1.appendChild(Text1);
        Div2.appendChild(Text2);

        main[0].appendChild(Div1);
        main[0].appendChild(Div2);

      })
    })
  }, 1000)
}

function displaySettings() {

  clearInterval(intervallcar);
  clearInterval(intervallenvironment);

  main[0].innerHTML = '';
  main[0].style.gridTemplateColumns = '10% 1fr 10% 1fr 10% 1fr 10%';
  main[0].style.gridTemplateRows = '10% 35% 10% 35% 10%';
  main[0].style.background = "white";


  var openleft = document.createElement("button");
  openleft.id = 'openleft';
  openleft.innerHTML = "open left";
  main[0].appendChild(openleft);
  openleft.addEventListener("click", left);
  openleft.style.display = "block";

  var closeleft = document.createElement("button");
  closeleft.id = 'closeleft';
  closeleft.innerHTML = "close left";
  main[0].appendChild(closeleft);
  closeleft.addEventListener("click", left);
  closeleft.style.display = "none";


  var openall = document.createElement("button");
  openall.id = 'openall';
  openall.innerHTML = "open all";
  main[0].appendChild(openall);
  openall.addEventListener("click", oall);
  openall.style.display = "block";

  var closeall = document.createElement("button");
  closeall.id = 'closeall';
  closeall.innerHTML = "close all";
  main[0].appendChild(closeall);
  closeall.addEventListener("click", call);
  closeall.style.display = "none";

  var openright = document.createElement("button");
  openright.id = 'openright';
  openright.innerHTML = "open right";
  main[0].appendChild(openright);
  openright.addEventListener("click", right);
  openright.style.display = "block";

  var closeright = document.createElement("button");
  closeright.id = 'closeright';
  closeright.innerHTML = "close right";
  main[0].appendChild(closeright);
  closeright.addEventListener("click", right);
  closeright.style.display = "none";


  function left() {

    if (openleft.style.display == "block") {
      openleft.style.display = "none";
      closeleft.style.display = "block";
      closeall.style.display = "block";
      openall.style.display = "block";
      fetch('http://192.168.0.71:5000/action/open');
    }
    else if (closeleft.style.display == "block") {
      openleft.style.display = "block";
      closeleft.style.display = "none";
      closeall.style.display = "none";
      openall.style.display = "block";
      fetch('http://192.168.0.71:5000/action/close');
    }
    else if (closeright.style.display == "block" && closeleft.style.display == "block" && closeall.style.display == "block") {
      openleft.style.display = "none";
      closeall.style.display = "block";
      openall.style.display = "none";
    }
  }


  function right() {

    if (openright.style.display == "block") {
      openright.style.display = "none"
      closeright.style.display = "block"
      closeall.style.display = "block"
      openall.style.display = "block"
      fetch('http://192.168.0.71:5000/action/open')
    }
    else if (closeright.style.display == "block") {
      openright.style.display = "block"
      closeright.style.display = "none"
      closeall.style.display = "none"
      openall.style.display = "block"
      fetch('http://192.168.0.71:5000/action/close')
    }
    else if (closeright.style.display == "block" && closeleft.style.display == "block" && closeall.style.display == "block") {
      openright.style.display = "none"
      closeall.style.display = "block"
      openall.style.display = "none"
    }
  }


  function oall() {
    openall.style.display = "none"
    openleft.style.display = "none"
    openright.style.display = "none"
    closeall.style.display = "block"
    closeleft.style.display = "block"
    closeright.style.display = "block"
    fetch('http://192.168.0.71:5000/action/openall')
  }

  function call() {
    openall.style.display = "block"
    openleft.style.display = "block"
    openright.style.display = "block"
    closeall.style.display = "none"
    closeleft.style.display = "none"
    closeright.style.display = "none"
    fetch('http://192.168.0.71:5000/action/closeall')
  }


}

function displayMap() {

  clearInterval(intervallcar)
  clearInterval(intervallenvironment)

  main[0].innerHTML = ''
  main[0].style.gridTemplateColumns = '1fr';
  main[0].style.gridTemplateRows = '1fr';
  main[0].innerHTML = '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d32490.890023311204!2d9.621400180869733!3d48.69655303806867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sde!2sde!4v1575800240562!5m2!1sde!2sde" width="100%" height="100%" frameborder="0" style="border:0" allowfullscreen=""></iframe>'

}
var musiclist;
function displayMultimedia() {

  clearInterval(intervallcar);
  clearInterval(intervallenvironment);

  main[0].innerHTML = '';

  fetch('http://192.168.0.71:5000/music')
    .then(function (response) {
      response.text().then(function (text) {
        musiclist = JSON.parse(text);
        console.log(musiclist);
        MusicTable();

      })
    })
}

var playnow;
function MusicTable() {

  main[0].style.gridTemplateColumns = '10% 1fr 10% 1fr 10% 1fr 10%';
  main[0].style.gridTemplateRows = '10% 50% 10% 5% 20% 10%';
  main[0].style.background = "white";

  var play = document.createElement("button");
  play.id = 'play';
  main[0].appendChild(play);
  play.addEventListener("click", playit);
  play.style.display = "block";

  var pause = document.createElement("button");
  pause.id = 'pause';
  main[0].appendChild(pause);
  pause.addEventListener("click", pauseit);
  pause.style.display = "none";

  var forward = document.createElement("button");
  forward.id = 'forward';
  main[0].appendChild(forward);
  forward.addEventListener("click", forwardit);

  var backward = document.createElement("button");
  backward.id = 'backward';
  main[0].appendChild(backward);
  backward.addEventListener("click", backwardit);



  var table = document.createElement('ul');
  table.id = 'list';


  for (i = 0; i < musiclist.length; i++) {
    var list = document.createElement("li");
    list.id = i;
    let newListNode = document.createTextNode(musiclist[i].artist + ' - ' + musiclist[i].title);
    console.log(newListNode);
    list.appendChild(newListNode);
    table.appendChild(list);
    main[0].appendChild(table);
  }

  playnow = document.createElement('div');
  playnow.id = 'playnow';
  main[0].appendChild(playnow);

  document.getElementById('list').addEventListener('click', playMusic);
}

var songID;
function playMusic() {

  var song = document.getElementById(event.target.id);
  songID = song.id;
  console.log(songID);
  console.log(musiclist[songID].title);
  playnow.innerHTML = musiclist[songID].artist + " - " + musiclist[songID].title;
}

function forwardit() {
  if (songID < parseInt(musiclist.length) - 1) {
    songID = parseInt(songID) + 1;
    console.log(songID);
    playnow.innerHTML = musiclist[songID].artist + " - " + musiclist[songID].title;
  }
  else {
    songID = 0;
    console.log(songID);
    playnow.innerHTML = musiclist[songID].artist + " - " + musiclist[songID].title;
  }
}

function backwardit() {
  if (parseInt(songID) > 0) {
    songID = parseInt(songID) - 1;
    console.log(songID);
    playnow.innerHTML = musiclist[songID].artist + " - " + musiclist[songID].title;
  }
  else {
    songID = parseInt(musiclist.length) - 1;
    console.log(songID);
    playnow.innerHTML = musiclist[songID].artist + " - " + musiclist[songID].title;
  }
}

function playit() {
  document.getElementById("play").style.display = "none";
  document.getElementById("pause").style.display = "block";
}

function pauseit() {
  document.getElementById("pause").style.display = "none";
  document.getElementById("play").style.display = "block";
}

var intervallenvironment
function displayEnvironment() {

  clearInterval(intervallcar);

  main[0].innerHTML = '';
  main[0].style.gridTemplateRows = '10% 1fr 10% 1fr 10% 1fr 10%';
  main[0].style.gridTemplateColumns = '10% 1fr 10%';
  main[0].style.background = "white";

  intervallenvironment = setInterval(function () {
    fetch('http://192.168.0.71:5000/status').then(function (response) {
      response.text().then(function (text) {
        console.log(text);

        var array = JSON.parse(text);

        var Div1 = document.createElement("div1");
        Div1.classList.add('pressure');
        var Div2 = document.createElement("div2");
        Div2.classList.add('humidity');
        var Div3 = document.createElement("div3");
        Div3.classList.add('temperatur');




        var Text1 = document.createTextNode("pressure" + ": " + Math.round(array.pressure * 100) / 100 + " mbar");
        var Text2 = document.createTextNode("humidity" + ": " + Math.round(array.humidity * 100) / 100 + " %");
        var Text3 = document.createTextNode("temperature" + ": " + Math.round(array.temp * 100) / 100 + "°C");

        Div1.appendChild(Text1);
        Div2.appendChild(Text2);
        Div3.appendChild(Text3);

        main[0].appendChild(Div1);
        main[0].appendChild(Div2);
        main[0].appendChild(Div3);

      })
    })
  }, 1000)
}

