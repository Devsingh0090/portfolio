// ================== Preloader ==================
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.classList.add('fade-out');
        setTimeout(() => preloader.style.display = 'none', 500);
    }
});

// ================== Mobile menu toggle ==================
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// ================== Smooth scroll ==================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

// ================== Back to top button ==================
const backToTop = document.querySelector('.back-to-top');
if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
}

// ================== Animate on scroll ==================
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight - 50) {
            element.classList.add('animated');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// ================== Contact Form Submission (FIXED) ==================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn ? submitBtn.innerHTML : '';

        if (submitBtn) {
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
        }

        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };

        try {
            const response = await fetch('/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            let result = {};
            try {
                result = await response.json();
            } catch (err) {
                // response body empty or not JSON
            }

            if (response.ok && result.success) {
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
            } else {
                console.error('Server response:', response.status, result);
                alert(result.error || 'Something went wrong. Please try again later.');
            }

        } catch (error) {
            console.error('Network error:', error);
            alert('Network error. Please check your internet connection.');
        } finally {
            if (submitBtn) {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        }
    });
}

// ================== Project horizontal scroll ==================
const projectContainer = document.querySelector('.projects-container');

if (projectContainer) {
    let isScrolling = false;
    let startX = 0;
    let scrollLeft = 0;

    projectContainer.addEventListener('mousedown', (e) => {
        isScrolling = true;
        startX = e.pageX - projectContainer.offsetLeft;
        scrollLeft = projectContainer.scrollLeft;
    });

    projectContainer.addEventListener('mouseleave', () => isScrolling = false);
    projectContainer.addEventListener('mouseup', () => isScrolling = false);

    projectContainer.addEventListener('mousemove', (e) => {
        if (!isScrolling) return;
        e.preventDefault();
        const x = e.pageX - projectContainer.offsetLeft;
        const walk = (x - startX) * 2;
        projectContainer.scrollLeft = scrollLeft - walk;
    });

    projectContainer.style.overflowX = 'scroll';
    projectContainer.style.scrollBehavior = 'smooth';
    projectContainer.style.webkitOverflowScrolling = 'touch';
}

// ================== Skill hover effect ==================
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        item.style.setProperty('--x', `${x}%`);
        item.style.setProperty('--y', `${y}%`);
    });
});

// ================== Auto-close mobile menu ==================
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (!navLinks) return;
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            if (menuToggle) {
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        }
    });
});
