// =====================================
// 1. FUNCIONALIDADES DO SCRIPTS.JS
// (MENU TOGGLE, SCROLL NAVBAR, EFEITO GLITCH)
// =====================================

document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const mainNav = document.querySelector(".main-nav");
  const titleElement = document.querySelector(".hero-title");

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

  // =====================================
  // 2. FUNCIONALIDADES DO CHATBOT.JS
  // =====================================

  const chatToggle = document.getElementById("chatbot-toggle");
  const chatCloseButton = document.getElementById("chatbot-close");
  const chatWindow = document.getElementById("chatbot-window");
  const chatBody = document.getElementById("chatbot-body");
  const chatOptions = document.getElementById("chat-options");
  const chatInput = document.getElementById("chatbot-input");
  const sendButton = document.getElementById("chatbot-send");

  const faq = {
    horário: {
      message:
        "Nosso horário de funcionamento é: Segunda a Sábado, das 09:00h às 22:00h. Domingos: Fechado.",
    },
    endereço: {
      message:
        "A Dom Cortes está localizada na Avenida Guarulhos, 3927 - Ponte Grande - Guarulhos/SP. Você pode nos encontrar no mapa na seção Localização.",
    },
    serviços: {
      message:
        "Oferecemos Corte Clássico e Barba à Navalha, Aparagem e Desenho da Barba, e Tratamento Premium de Cabelo. Veja mais detalhes na seção Serviços ou agende diretamente no link MARQUE SEU CORTE.",
    },
    agendar: {
      message:
        "Para agendar seu horário, por favor, utilize o link MARQUE SEU CORTE. Você será direcionado para nossa página de agendamento no Setmore. Não agendamos por aqui para garantir a pontualidade.",
    },
    default: {
      message:
        "Desculpe, não entendi sua dúvida. Tente selecionar uma das opções acima ou refaça a pergunta com palavras-chave como 'endereço', 'serviços', ou 'horário'.",
    },
  };

  /**
   * ADICIONA UMA MENSAGEM AO CORPO DO CHAT E ROLA PARA O FINAL.
   * @param {string} text
   * @param {string} type
   */
  function addMessage(text, type) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `chat-message ${type}`;
    messageDiv.textContent = text;
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  /**
   * RESPONDE À CONSULTA DO USUÁRIO COM BASE NA CHAVE (query).
   * @param {string} key
   */
  function respondToQuery(key) {
    chatOptions.style.display = "none";

    const responseKey = faq[key] ? key : "default";
    const response = faq[responseKey].message;

    addMessage(response, "bot-message");

    setTimeout(() => {
      chatOptions.style.display = "flex";
    }, 1500);
  }

  if (chatToggle && chatWindow && chatCloseButton) {
    chatToggle.addEventListener("click", () => {
      chatWindow.classList.toggle("hidden");
      if (!chatWindow.classList.contains("hidden")) {
        chatBody.scrollTop = chatBody.scrollHeight;
      }
    });

    chatCloseButton.addEventListener("click", () => {
      chatWindow.classList.add("hidden");
    });
  }

  if (chatOptions) {
    chatOptions.addEventListener("click", (event) => {
      if (event.target.classList.contains("option-btn")) {
        const query = event.target.dataset.query;
        const text = event.target.textContent;

        addMessage(text, "user-message");

        respondToQuery(query);
      }
    });
  }

  function handleSend() {
    const text = chatInput.value.trim();
    if (text === "") return;

    chatInput.value = "";

    addMessage(text, "user-message");

    const lowerText = text.toLowerCase();
    let foundKey = "default";

    if (lowerText.includes("horario") || lowerText.includes("hora")) {
      foundKey = "horário";
    } else if (lowerText.includes("endereco") || lowerText.includes("onde")) {
      foundKey = "endereço";
    } else if (
      lowerText.includes("servicos") ||
      lowerText.includes("corte") ||
      lowerText.includes("barba")
    ) {
      foundKey = "serviços";
    } else if (lowerText.includes("agendar") || lowerText.includes("marcar")) {
      foundKey = "agendar";
    }

    respondToQuery(foundKey);
  }

  if (sendButton && chatInput) {
    sendButton.addEventListener("click", handleSend);
    chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        handleSend();
      }
    });
  }

  // =====================================
  // 3. FUNCIONALIDADES DO LIGHTBOX.JS
  // =====================================

  const lightboxModal = document.getElementById("lightbox-modal");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxDescription = document.getElementById("lightbox-description");
  const closeButton = document.getElementById("lightbox-close");
  const prevButton = document.getElementById("lightbox-prev");
  const nextButton = document.getElementById("lightbox-next");

  let currentGallery = [];
  let currentIndex = 0;

  function openLightbox(item) {
    const imageUrl = item.getAttribute("data-image");
    const description = item.getAttribute("data-description") || item.alt || "";

    lightboxImage.src = imageUrl;
    lightboxImage.alt = item.alt || "Imagem ampliada da Dom Cortes.";
    lightboxDescription.textContent = description;

    lightboxModal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightboxModal.classList.add("hidden");
    document.body.style.overflow = "";
  }

  function navigate(direction) {
    if (currentGallery.length === 0) return;

    currentIndex =
      (currentIndex + direction + currentGallery.length) %
      currentGallery.length;

    const nextItem = currentGallery[currentIndex];

    const imageUrl = nextItem.getAttribute("data-image");
    const description = nextItem.getAttribute("data-description") || "";

    lightboxImage.src = imageUrl;
    lightboxDescription.textContent = description;
  }

  function handleItemClick(event) {
    const item = event.currentTarget;
    const isFerramenta = item.classList.contains("ferramenta");
    const innerCard = item.querySelector(".ferramenta-inner");

    if (isFerramenta) {
      if (innerCard) {
        innerCard.classList.toggle("flipped");
      }
      return;
    }

    currentGallery = Array.from(document.querySelectorAll(".galeria-item"));
    currentIndex = currentGallery.indexOf(item);
    openLightbox(item);
  }

  function handleFerramentaDblClick(event) {
    const item = event.currentTarget;
    currentGallery = Array.from(document.querySelectorAll(".ferramenta"));
    currentIndex = currentGallery.indexOf(item);
    openLightbox(item);
  }

  if (closeButton && prevButton && nextButton && lightboxModal) {
    closeButton.addEventListener("click", closeLightbox);
    prevButton.addEventListener("click", () => navigate(-1));
    nextButton.addEventListener("click", () => navigate(1));

    document.addEventListener("keydown", function (event) {
      if (
        event.key === "Escape" &&
        !lightboxModal.classList.contains("hidden")
      ) {
        closeLightbox();
      }
    });

    lightboxModal.addEventListener("click", (event) => {
      if (event.target === lightboxModal) {
        closeLightbox();
      }
    });
  }

  const galeriaItems = document.querySelectorAll(".galeria-item");
  galeriaItems.forEach((item) => {
    item.addEventListener("click", handleItemClick);
  });

  const ferramentaItems = document.querySelectorAll(".ferramenta");
  ferramentaItems.forEach((item) => {
    item.addEventListener("click", handleItemClick);
    item.addEventListener("dblclick", handleFerramentaDblClick);
  });
});

// =====================================
// FUNCIONALIDADES GLOBAIS FORA DO DOMContentLoaded
// =====================================

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
