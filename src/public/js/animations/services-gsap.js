document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP Plugins
    gsap.registerPlugin(ScrollTrigger);

    // ==========================================
    // 1. Hero Section Entrance Animation
    // ==========================================
    const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Hero title appearing word by word or sliding up
    heroTimeline.fromTo('.animate-entrance-slide-up h2',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.2 }
    )
    .fromTo('.animate-entrance-slide-up p',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.5"
    )
    .fromTo('.hero-parallax-bg', 
        { scale: 1.1 },
        { scale: 1, duration: 2, ease: 'power2.out' },
        0
    );

    // Hero Parallax on Scroll
    gsap.to('.hero-parallax-bg', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero-parallax-wrapper',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });


    // ==========================================
    // 2. Desarrollos Web (Cards Grid) - Stagger
    // ==========================================
    if(document.querySelector('.cards-grid-wrapper a')) {
    gsap.fromTo('.cards-grid-wrapper a',
        { y: 100, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'back.out(1.2)',
            scrollTrigger: {
                trigger: '.cards-section',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        }
    );


    // ==========================================
    // 3. Methodology Diagram (6 Steps)
    // ==========================================
    const methodologyElements = document.querySelectorAll('.methodology-step');
    
    // Animar la línea conectora principal detrás de los iconos
    if(document.querySelector('.methodology-connector')) {
    gsap.fromTo('.methodology-connector',
        { scaleX: 0, transformOrigin: 'left center' },
        {
            scaleX: 1,
            duration: 1.5,
            ease: 'power2.inOut',
            scrollTrigger: {
                trigger: '.methodology-section',
                start: 'top 75%',
            }
        }
    );

    // Stagger para los pasos
    if(methodologyElements.length) {
    gsap.fromTo(methodologyElements,
        { scale: 0.5, opacity: 0, y: 50 },
        {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'back.out(1.5)',
            scrollTrigger: {
                trigger: '.methodology-section',
                start: 'top 70%',
            }
        }
    );


    // ==========================================
    // 4. Webs Corporativas (Image Reveal)
    // ==========================================
    if(document.querySelector('#webs-corporativas .text-content')) {
    gsap.fromTo('#webs-corporativas .text-content',
        { x: -50, opacity: 0 },
        {
            x: 0, opacity: 1, duration: 1,
            scrollTrigger: {
                trigger: '#webs-corporativas',
                start: 'top 75%'
            }
        }
    );
    if(document.querySelector('#webs-corporativas img')) {
    gsap.fromTo('#webs-corporativas img',
        { x: 50, opacity: 0, clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' },
        {
            x: 0, opacity: 1, clipPath: 'polygon(0% 0, 100% 0, 100% 100%, 0% 100%)', duration: 1.2, ease: 'power3.inOut',
            scrollTrigger: {
                trigger: '#webs-corporativas',
                start: 'top 75%'
            }
        }
    );


    // ==========================================
    // 5. Tiendas Online (E-commerce Showcase)
    // ==========================================
    // Animated UI mockup scaling up
    if(document.querySelector('.ecommerce-mockup')) {
    gsap.fromTo('.ecommerce-mockup',
        { y: 150, scale: 0.9, opacity: 0 },
        {
            y: 0, scale: 1, opacity: 1, duration: 1.2, ease: 'power4.out',
            scrollTrigger: {
                trigger: '#tiendas-online',
                start: 'top 60%'
            }
        }
    );
    
    // Tech platforms floating stagger
    if(document.querySelector('.tech-platform-card')) {
    gsap.fromTo('.tech-platform-card',
        { y: 40, opacity: 0 },
        {
            y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out',
            scrollTrigger: {
                trigger: '.tech-showcase-grid',
                start: 'top 85%'
            }
        }
    );


    // ==========================================
    // 6. Desarrollo a Medida (Terminal Code)
    // ==========================================
    if(document.querySelector('.terminal-code-block')) {
    gsap.fromTo('.terminal-code-block',
        { rotate: 10, y: 50, opacity: 0 },
        {
            rotate: -2, y: 0, opacity: 1, duration: 1, ease: 'back.out(1.2)',
            scrollTrigger: {
                trigger: '#desarrollo-medida',
                start: 'top 75%'
            }
        }
    );

    // ==========================================
    // 7. Automatizaciones (Bento Box)
    // ==========================================
    if(document.querySelector('.bento-item')) {
    gsap.fromTo('.bento-item',
        { y: 60, opacity: 0, scale: 0.95 },
        {
            y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: {
                trigger: '.bento-grid',
                start: 'top 80%'
            }
        }
    );


    // ==========================================
    // 8. Branding Web (Image Moodboard)
    // ==========================================
    gsap.to('.branding-img-1', {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
            trigger: '#branding-web',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });
    gsap.to('.branding-img-2', {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
            trigger: '#branding-web',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });

    // ==========================================
    // 9. Evolución Continua (Floating Cards)
    // ==========================================
    if(document.querySelector('.evolution-card')) {
    gsap.fromTo('.evolution-card',
        { y: 50, opacity: 0 },
        {
            y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power2.out',
            scrollTrigger: {
                trigger: '#evolucion-continua',
                start: 'top 75%'
            }
        }
    );
});
