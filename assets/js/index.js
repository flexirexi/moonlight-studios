const menuIcon = document.getElementById('menuIcon');
const nav = document.getElementById("header_nav");
const nav_cont = document.getElementById("nav_right_container");
const navbar = document.getElementById("header_nav");

document.addEventListener('scroll', function () {
  if (window.scrollY > 10) { // Wenn mehr als 50px gescrollt wurde
    let value = "#000000" + parseInt(Math.max(10, Math.min(255, window.scrollY / 1.9))).toString(16);
    navbar.style.backgroundColor = value;
    
  } else {
    navbar.style.backgroundColor = "#00000000";
  }
});

menuIcon.addEventListener('click', function () {
  if (menuIcon.classList.contains('fa-bars')) {
    //öffnen
    menuIcon.classList.remove('fa-bars');
    menuIcon.classList.add('fa-times');
    menuIcon.classList.add('animate'); // Drehung hinzufügen
    
    nav.style.backgroundColor = "black";
    //nav.style.webkitBackdropFilter = 'blur(10px)'; //funzt irgendwie nicht - entweder nav oder nav_cont aber nicht beides...
    nav_cont.style.backdropFilter = "blur(10px)";
    nav_cont.style.webkitBackdropFilter = 'blur(10px)';

    document.body.style.overflow = 'hidden'; //scrollen verbieten
    nav_cont.style.overflowY = "auto"; //es gibt smartphones im querformat, bei denen das menu größer als der display ist..
    
  } else {
    //schließen
    menuIcon.classList.remove('fa-times');
    menuIcon.classList.add('fa-bars');
    menuIcon.classList.remove('animate'); // Drehung entfernen

    //nav.style.backdropFilter = "none";
    //nav.style.webkitBackdropFilter = 'none';
    nav_cont.style.backdropFilter = "none";
    nav_cont.style.webkitBackdropFilter = 'none';

    document.body.style.overflow = ''; //scrollen erlauben
    nav_cont.style.overflowY = "hidden"; //rein pro forma wieder rückgängig machen..

    //anstatt die hintergrundfarbe ganz zu löschen, lieber in den zustand bringen, in den sie laut scroll position wäre:
    let value = "#000000" + parseInt(Math.max(10, Math.min(255, window.scrollY / 1.9))).toString(16);
    navbar.style.backgroundColor = value;
  }

  // Füge eine Animation hinzu
  menuIcon.classList.add('animate');

  // Entferne die Animation nach der Dauer (300ms in diesem Fall)
  setTimeout(() => menuIcon.classList.remove('animate'), 300);


  
});

