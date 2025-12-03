// Gallery Carousel Controller
class GalleryCarousel {
  constructor() {
    this.currentIndex = 0;
    this.items = document.querySelectorAll('.carousel-item');
    this.indicators = [];
    this.autoPlayInterval = null;

    if (this.items.length === 0) return;

    this.initializeIndicators();
    this.attachEventListeners();
    this.startAutoPlay();
  }

  initializeIndicators() {
    const indicatorsContainer = document.getElementById('carousel-indicators');
    if (!indicatorsContainer) return;

    this.items.forEach((_, index) => {
      const button = document.createElement('button');
      button.className = 'carousel-indicator';
      if (index === 0) button.classList.add('active');
      button.addEventListener('click', () => this.goToSlide(index));
      indicatorsContainer.appendChild(button);
      this.indicators.push(button);
    });
  }

  attachEventListeners() {
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');

    if (prevBtn) prevBtn.addEventListener('click', () => this.prevSlide());
    if (nextBtn) nextBtn.addEventListener('click', () => this.nextSlide());
  }

  showSlide(index) {
    // Remove active class from all items and indicators
    this.items.forEach(item => item.classList.remove('active'));
    this.indicators.forEach(indicator => indicator.classList.remove('active'));

    // Add active class to current item and indicator
    this.items[index].classList.add('active');
    if (this.indicators[index]) {
      this.indicators[index].classList.add('active');
    }

    this.currentIndex = index;
    this.resetAutoPlay();
  }

  nextSlide() {
    const next = (this.currentIndex + 1) % this.items.length;
    this.showSlide(next);
  }

  prevSlide() {
    const prev = (this.currentIndex - 1 + this.items.length) % this.items.length;
    this.showSlide(prev);
  }

  goToSlide(index) {
    this.showSlide(index);
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => this.nextSlide(), 5000);
  }

  resetAutoPlay() {
    clearInterval(this.autoPlayInterval);
    this.startAutoPlay();
  }
}

// Initialize carousel when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new GalleryCarousel();
});
