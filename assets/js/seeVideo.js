seeVideoBtn = document.getElementById("see-video-btn");
videoModal = document.querySelector('.video-modal');

seeVideoBtn.addEventListener('click', (e) => {
    e.preventDefault();
    videoModal.classList.replace('d-none','d-flex')
    window.addEventListener('click', outsideClick);
});

function outsideClick(e) {
    if (e.target === videoModal) {
        videoModal.classList.replace('d-flex','d-none')
        window.removeEventListener('click', outsideClick);
    }
}
