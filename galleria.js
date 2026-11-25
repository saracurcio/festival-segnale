
const galleria = new Swiper(".luoghi-swiper", {
  slidesPerView: 1,
  spaceBetween: 24,
  rewind: true,
  keyboard: {
    enabled: true,
    onlyInViewport: true
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  a11y: {
    prevSlideMessage: "Fotografia precedente",
    nextSlideMessage: "Fotografia successiva"
  }
});
