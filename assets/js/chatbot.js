document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("chatbot-toggle");
  const closeButton = document.getElementById("chatbot-close");
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
   *
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
   * 
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

  toggleButton.addEventListener("click", () => {
    chatWindow.classList.toggle("hidden");
    if (!chatWindow.classList.contains("hidden")) {
      chatBody.scrollTop = chatBody.scrollHeight;
    }
  });

  closeButton.addEventListener("click", () => {
    chatWindow.classList.add("hidden");
  });

  chatOptions.addEventListener("click", (event) => {
    if (event.target.classList.contains("option-btn")) {
      const query = event.target.dataset.query;
      const text = event.target.textContent;

      addMessage(text, "user-message");

      respondToQuery(query);
    }
  });

  // 6. Lógica de Interação (Envio de Texto)
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

  sendButton.addEventListener("click", handleSend);
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  });
});
