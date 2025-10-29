const titleElement = document.querySelector(".hero-title");
const originalText = titleElement.textContent;
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+=-[]{}\\|:;\"',.<>/?";

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
        if (Math.random() < 0.3) {
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

window.addEventListener("load", startGlitchLoop);