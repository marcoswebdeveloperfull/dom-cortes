document.addEventListener("DOMContentLoaded", function () {
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

  closeButton.addEventListener("click", closeLightbox);
  prevButton.addEventListener("click", () => navigate(-1));
  nextButton.addEventListener("click", () => navigate(1));

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !lightboxModal.classList.contains("hidden")) {
      closeLightbox();
    }
  });

  lightboxModal.addEventListener("click", (event) => {
    if (event.target === lightboxModal) {
      closeLightbox();
    }
  });

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
