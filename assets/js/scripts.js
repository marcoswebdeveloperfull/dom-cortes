document.addEventListener("DOMContentLoaded", function () {

  const toggleButton = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const mainNav = document.querySelector(".main-nav");

  if (toggleButton && navLinks && mainNav) {
    toggleButton.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      mainNav.classList.toggle("menu-open");

      const icon = toggleButton.querySelector("i");
      if (icon) {
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-times");
      }
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        mainNav.classList.remove("menu-open");
        const icon = toggleButton.querySelector("i");
        if (icon) {
          icon.classList.remove("fa-times");
          icon.classList.add("fa-bars");
        }
      });
    });
  }

  const titleElement = document.querySelector(".hero-title");

  if (titleElement) {
    const originalText = titleElement.textContent;
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+=-[]{}\\|:;\"',.<>/?";

    function generateRandomChar() {
      return chars[Math.floor(Math.random() * chars.length)];
    }

    function glitchText(element, originalText) {
      const textLength = originalText.length;
      let glitchCount = 0;

      const glitchInterval = setInterval(() => {
        let newText = "";
        const glitchDuration = 4;

        if (glitchCount < glitchDuration) {
          for (let i = 0; i < textLength; i++) {
            if (Math.random() < 0.4) {
              newText += generateRandomChar();
            } else {
              newText += originalText[i];
            }
          }

          glitchCount++;
        } else {
          newText = originalText;
          clearInterval(glitchInterval);
        }

        element.textContent = newText;
      }, 50);
    }

    function startGlitchLoop() {
      glitchText(titleElement, originalText);

      setInterval(() => {
        glitchText(titleElement, originalText);
      }, 7000);
    }

    startGlitchLoop();
  }
});

function handleScroll() {
  const nav = document.querySelector(".main-nav");
  if (nav) {
    if (window.scrollY > 100) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  }
}

window.addEventListener("scroll", handleScroll);
