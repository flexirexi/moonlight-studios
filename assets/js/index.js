document.addEventListener('scroll', function () {
    const navbar = document.getElementById("header_nav");
    if (window.scrollY > 10) { // Wenn mehr als 50px gescrollt wurde
      let value = "#000000" + parseInt(Math.max(10, Math.min(255, window.scrollY / 2.7))).toString(16);
      console.log(value);
      navbar.style.backgroundColor = value;
      

    } else {
      navbar.style.backgroundColor = "#00000000";
    }
  });

