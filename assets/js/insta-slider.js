
//insta slider
// Otomatik oynatma için JavaScript kodu
const slideTrack = document.querySelector('.slide-track');

function autoplaySlider() {
    let currentPosition = 0;
    const slideWidth = 250;
    const totalSlides = document.querySelectorAll('.slide').length;
    const slideInterval = 2000;
    const transitionDuration = 1000;

    setInterval(() => {
        currentPosition -= slideWidth;
        if (currentPosition <= -slideWidth * (totalSlides - 5)) {
            currentPosition = 0;
        }
        slideTrack.style.transition = `transform ${transitionDuration / 1000}s ease-in-out`;
        slideTrack.style.transform = `translateX(${currentPosition}px)`;
        
        setTimeout(() => {
            slideTrack.style.transition = 'none';
        }, transitionDuration);
    }, slideInterval);
}

autoplaySlider();
