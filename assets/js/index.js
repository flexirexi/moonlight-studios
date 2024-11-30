document.addEventListener('scroll', function () {
    const navbar = document.getElementById("header_nav");
    if (window.scrollY > 50) { // Wenn mehr als 50px gescrollt wurde
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });