document.addEventListener('DOMContentLoaded', function() {

    // --- Page Loader ---
    const loaderWrapper = document.getElementById('loader-wrapper');

    window.addEventListener('load', () => {
        // Wait a minimum of 2 seconds before hiding the loader
        setTimeout(() => {
            loaderWrapper.style.opacity = '0';
            // After the fade-out transition, hide it completely
            loaderWrapper.addEventListener('transitionend', () => {
                loaderWrapper.style.display = 'none';
            });
        }, 2000);
    });

    // --- Mobile Navigation ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    // --- Initialize AOS (Animate On Scroll) ---
    AOS.init({
        duration: 800, // Animation duration in milliseconds
        once: true,    // Whether animation should happen only once - while scrolling down
        easing: 'ease-in-out', // Default easing for AOS animations
    });

    // --- Contact Form Submission ---
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    // Initialize EmailJS with your Public Key
    (function() {
        emailjs.init({
          publicKey: 'OBflJeR30aSR1_qNE', // Replace with your Public Key
        });
    })();

    async function handleSubmit(event) {
        event.preventDefault();

        // These IDs from your EmailJS account
        const serviceID = 'service_6seb3ab';
        const templateID = 'template_euht6ib';

        formStatus.innerHTML = "Sending...";
        
        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                formStatus.innerHTML = "Thanks for your submission!";
                form.reset();
            }, (err) => {
                formStatus.innerHTML = "Oops! There was a problem submitting your form.";
                alert(JSON.stringify(err));
            });
    }
    form.addEventListener("submit", handleSubmit);
});
