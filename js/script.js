// Initialize Lenis
const lenis = new Lenis({
  autoRaf: true,
});


const ctaButtons = document.querySelectorAll('.cta-circle.btn-active');

ctaButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        ctaButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
})