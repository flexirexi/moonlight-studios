const menuIcon = document.getElementById('menuIcon');

document.addEventListener('scroll', function () {
    const navbar = document.getElementById("header_nav");
    if (window.scrollY > 10) { // Wenn mehr als 50px gescrollt wurde
      let value = "#000000" + parseInt(Math.max(10, Math.min(255, window.scrollY / 1.9))).toString(16);
      console.log(value);
      navbar.style.backgroundColor = value;
      

    } else {
      navbar.style.backgroundColor = "#00000000";
    }
  });

menuIcon.addEventListener('click', function () {
  if (menuIcon.classList.contains('fa-bars')) {
    menuIcon.classList.remove('fa-bars');
    menuIcon.classList.add('fa-times');
  } else {
    menuIcon.classList.remove('fa-times');
    menuIcon.classList.add('fa-bars');
  }

  // Füge eine Animation hinzu
  menuIcon.classList.add('animate');

  // Entferne die Animation nach der Dauer (300ms in diesem Fall)
  setTimeout(() => menuIcon.classList.remove('animate'), 300);
});

