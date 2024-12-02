const menuIcon = document.getElementById('menuIcon');
const nav = document.getElementById("header_nav");
const nav_cont = document.getElementById("nav_right_container");
const navbar = document.getElementById("header_nav");
const nav_checkbox = document.getElementById("nav_dropdown");
const links = document.getElementsByTagName("a");

let wasSmallScreen = window.innerWidth < 768; // Initial prüfen, ob der Bildschirm klein ist
const isSafari = CSS.supports("(-webkit-backdrop-filter: blur(10px))");


function menuClick() {
  // if (checkbox.checked) {
  //   console.log('Checkbox ist aktiviert!');
  // } else {
  //   console.log('Checkbox ist deaktiviert!');
  // }
  if (nav_checkbox.checked) {
    //öffnen
    menuIcon.classList.remove('fa-bars');
    menuIcon.classList.add('fa-times');
    menuIcon.classList.add('animate'); // Drehung hinzufügen
    
    nav.style.backgroundColor = "black";
    //nav.style.webkitBackdropFilter = 'blur(10px)'; //funzt irgendwie nicht - entweder nav oder nav_cont aber nicht beides...
    
    if(isSafari) {
      // nav_cont.style.backgroundColor = "#000000B0"; simple method
      nav_cont.style.background = 'linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.82), rgba(0, 0, 0, 0.5))'; //cool method
    } else {
      nav_cont.style.backdropFilter = "blur(10px)";
      nav_cont.style.webkitBackdropFilter = 'blur(10px)';

    }
    
    document.body.style.overflow = 'hidden'; //scrollen verbieten
    nav_cont.style.overflowY = "auto"; //es gibt smartphones im querformat, bei denen das menu größer als der display ist..
    document.body.style.overscrollBehavior = "none" //kein neu laden durch runterziehen
    
  } else {
    //schließen
    menuIcon.classList.remove('fa-times');
    menuIcon.classList.add('fa-bars');
    menuIcon.classList.remove('animate'); // Drehung entfernen
    
    nav_cont.style.backdropFilter = "none";
    nav_cont.style.webkitBackdropFilter = 'none';
    nav_cont.style.backgroundColor = "none";
    
    document.body.style.overflow = ''; //scrollen erlauben
    document.body.style.overscrollBehavior = "none" //kein neu laden durch runterziehen
    nav_cont.style.overflowY = "hidden"; //rein pro forma wieder rückgängig machen..
    
    
    
    //anstatt die hintergrundfarbe ganz zu löschen, lieber in den zustand bringen, in den sie laut scroll position wäre:
    let value = "#000000" + parseInt(Math.max(10, Math.min(255, window.scrollY / 1.9))).toString(16);
    navbar.style.backgroundColor = value;
  }
  
  // Füge eine Animation hinzu
  menuIcon.classList.add('animate');
  
  // Entferne die Animation nach der Dauer (300ms in diesem Fall)
  setTimeout(() => menuIcon.classList.remove('animate'), 300);
}

for(let i = 0; i <links.length; i++) {
  links[i].addEventListener("click", function() {
    nav_checkbox.checked = false;
    menuClick();
  })
};

document.addEventListener('scroll', function () {
  if (window.scrollY > 10) { // Wenn mehr als 50px gescrollt wurde
    let value = "#000000" + parseInt(Math.max(10, Math.min(255, window.scrollY / 1.9))).toString(16);
    navbar.style.backgroundColor = value;
    
  } else {
    navbar.style.backgroundColor = "#00000000";
  }
});

//menuIcon.addEventListener('click', menuClick); //unten ist replacement
nav_checkbox.addEventListener('change', function () {
  menuClick();
});


document.addEventListener('touchmove', function (e) {
  // Prüfen, ob die Seite ganz oben ist und der Benutzer nach unten scrollt
  if (window.scrollY === 0 && e.touches[0].clientY > e.touches[0].pageY) {
    e.preventDefault(); // Nur Pull-to-Refresh blockieren
  }
}, { passive: false });


window.addEventListener("resize", function () {
  const isSmallScreen = window.innerWidth < 758;

  // Prüfen, ob vorher kleiner als 768px und jetzt größer ist
  if (wasSmallScreen && !isSmallScreen) {
    if (menuIcon.classList.contains('fa-times')) {
      console.log("Der Bildschirm ist jetzt größer als 768px!");
      nav_checkbox.checked = false;
      menuClick();
    }
  }

  // Aktuellen Zustand speichern
  wasSmallScreen = isSmallScreen;
});

window.addEventListener('DOMContentLoaded', () => {
  let audios = document.getElementsByTagName('audio');
  for (let i = 0; i < audios.length; i++) {
    
    audios[i].volume = 0.5; // Lautstärke auf 50% setzen
  }
});