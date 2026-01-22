// Mobile Gallery - Fixed Image Display with Active State
// Uses 5 fixed images, hero displays one of them based on activeIndex

document.addEventListener('DOMContentLoaded', () => {
  // Get the hero/featured image element
  const heroImage = document.getElementById('mobile-gallery-hero');

  // Get all thumbnail images
  const thumbnails = document.querySelectorAll('.mobile-gallery-thumbnail');

  // Check if elements exist (only on pages with mobile gallery)
  if (!heroImage || thumbnails.length === 0) {
    return;
  }

  // Define the 5 gallery images (fixed array)
  const galleryImages = [
    {
      src: 'image/gallery-manicurista/manicura-cencilla-nails.jpg',
      alt: 'Manicura sencilla'
    },
    {
      src: 'image/gallery-manicurista/manicura-cuadrada-fancesa-nails.jpg',
      alt: 'Manicura cuadrada francesa'
    },
    {
      src: 'image/gallery-manicurista/manicura-cuadradas-cortas-nails.jpg',
      alt: 'Manicura cuadradas cortas'
    },
    {
      src: 'image/gallery-manicurista/manicura-fancesa-azul-nails.jpg',
      alt: 'Manicura francesa azul'
    },
    {
      src: 'image/gallery-manicurista/manicura-verde-cuadradas-nails.jpg',
      alt: 'Manicura verde cuadradas'
    }
  ];

  // Track which thumbnail is currently active (starts at 0)
  let activeIndex = 0;

  // Function to update the hero image and active state
  function setActiveImage(index) {
    // Update hero image to show the selected thumbnail
    heroImage.src = galleryImages[index].src;
    heroImage.alt = galleryImages[index].alt;

    // Remove active class from all thumbnails
    thumbnails.forEach(thumb => {
      thumb.classList.remove('gallery-active');
    });

    // Add active class to the clicked thumbnail
    thumbnails[index].classList.add('gallery-active');

    // Update active index
    activeIndex = index;
  }

  // Add click event listener to each thumbnail
  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener('click', () => {
      // Get the index from data-index attribute
      const index = parseInt(thumbnail.getAttribute('data-index'), 10);

      // Update the hero and active state
      setActiveImage(index);
    });
  });

  // Initialize: Set first thumbnail as active on page load
  setActiveImage(0);
});
