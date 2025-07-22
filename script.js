// 
// navbar (hamberger)
// 

document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });
    }

    navItems.forEach(item => {
        item.addEventListener('click', function () {
            if (window.innerWidth <= 1024) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth > 1024) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    const dropdown = document.querySelector('.dropdown');
    const dropdownToggle = document.querySelector('.dropdown-toggle');

    if (dropdown && dropdownToggle) {
        dropdownToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            dropdown.classList.toggle('open');
        });

        document.addEventListener('click', function () {
            dropdown.classList.remove('open');
        });
    }
});

// 
// index slider (animation)
// 

document.addEventListener('DOMContentLoaded', function () {
    const section = document.querySelector('.exhibition-section');
    const colors = ['rgba(230, 82, 44, 0.3)', 'rgba(51, 51, 51, 0.2)', 'rgba(85, 85, 85, 0.2)'];

    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = Math.random() * 10 + 5;
        const posX = Math.random() * 100;
        const delay = Math.random() * 15;
        const duration = Math.random() * 10 + 10;
        const color = colors[Math.floor(Math.random() * colors.length)];

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.bottom = `-${size}px`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.backgroundColor = color;

        section.appendChild(particle);
    }
});

// 
// index gallery (animation)
// 

document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.gallery-section-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const x = e.clientX - card.getBoundingClientRect().left;
            const y = e.clientY - card.getBoundingClientRect().top;

            const centerX = card.offsetWidth / 2;
            const centerY = card.offsetHeight / 2;

            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;

            card.style.transform = `translateY(-15px) scale(1.02) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
            card.querySelector('.section-image').style.transform = `scale(1.15) rotate(1deg) translateX(${(x - centerX) / 30}px) translateY(${(y - centerY) / 30}px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(-15px) scale(1.02)';
            card.querySelector('.section-image').style.transform = 'scale(1.15) rotate(1deg)';
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        observer.observe(card);
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY < 100) {
            cards.forEach(card => {
                card.classList.remove('scroll-animate');
                observer.observe(card);
            });
        }
    });
});

// 
// about animation
// 

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.welcome-section').classList.add('active');

    const sections = document.querySelectorAll('.page-section');
    const mainNavLinks = document.querySelectorAll('.main-nav .nav-link');
    const collectionNavLinks = document.querySelectorAll('.collection-nav .nav-link');
    const allNavLinks = [...mainNavLinks, ...collectionNavLinks];
    const sideNavToggle = document.querySelector('.side-nav-toggle');
    const rightNav = document.getElementById('rightNav');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    function toggleSideNav() {
        rightNav.classList.toggle('open');
        const icon = sideNavToggle.querySelector('i');
        icon.classList.toggle('fa-chevron-left');
        icon.classList.toggle('fa-chevron-right');
    }

    function toggleMobileMenu() {
        mainNav.classList.toggle('active');
        const icon = mobileMenuToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    }

    if (sideNavToggle) {
        sideNavToggle.addEventListener('click', toggleSideNav);
    }

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                const targetId = `#${entry.target.id}`;
                allNavLinks.forEach(link => {
                    link.parentElement.classList.remove('active');
                    if (link.getAttribute('href') === targetId) {
                        link.parentElement.classList.add('active');

                        link.parentElement.style.animation = 'bounce 0.5s';
                        setTimeout(() => {
                            link.parentElement.style.animation = '';
                        }, 500);
                    }
                });
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -150px 0px'
    });

    sections.forEach((section, index) => {
        sectionObserver.observe(section);
        section.style.transitionDelay = `${index * 0.1}s`;
    });

    allNavLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                e.preventDefault();

                allNavLinks.forEach(l => l.parentElement.classList.remove('active'));
                this.parentElement.classList.add('active');

                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                if (window.innerWidth <= 992) {
                    toggleSideNav();
                }

                if (mainNav.classList.contains('active')) {
                    toggleMobileMenu();
                }
            }
        });
    });

    document.addEventListener('click', function (e) {
        if (window.innerWidth <= 992 &&
            rightNav.classList.contains('open') &&
            !e.target.closest('.right-nav') &&
            !e.target.closest('.side-nav-toggle')) {
            toggleSideNav();
        }
    });

    const style = document.createElement('style');
    style.textContent
});

// 
// emergingtelent slider (animation)
// 

document.addEventListener('DOMContentLoaded', () => {
    const sliderImage = document.getElementById('emerging-slider-image');
    const prevArrow = document.querySelector('.emerging-slider-arrow.prev-arrow');
    const nextArrow = document.querySelector('.emerging-slider-arrow.next-arrow');
    const sliderContainer = document.querySelector('.emerging-slider');

    const images = [
        'images/e1.png',
        'images/e2.png',
        'images/e3.png',
        'images/e4.png',
        'images/e5.png',
        'images/e6.png',
    ];

    let currentIndex = 0;
    let autoSlideInterval;
    let isAnimating = false;

    function preloadImages() {
        images.forEach(img => {
            const image = new Image();
            image.src = img;
        });
    }

    function showImage(index) {
        if (isAnimating) return;
        isAnimating = true;

        if (images.length === 0) {
            console.warn("No images found in the slider array.");
            sliderImage.src = '';
            sliderImage.style.opacity = 0;
            clearInterval(autoSlideInterval);
            isAnimating = false;
            return;
        }

        if (index >= images.length) {
            index = 0;
        } else if (index < 0) {
            index = images.length - 1;
        }
        currentIndex = index;

        const animationDuration = 600;
        const fadeDuration = 300;

        sliderImage.style.transition = `opacity ${fadeDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        sliderImage.style.opacity = 0;

        setTimeout(() => {
            sliderImage.src = images[currentIndex];

            sliderContainer.style.transition = `transform ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`;

            const direction = index > currentIndex ? 'right' : 'left';
            if (direction === 'right') {
                sliderContainer.style.transform = 'translateX(-20px)';
            } else {
                sliderContainer.style.transform = 'translateX(20px)';
            }

            setTimeout(() => {
                sliderImage.style.opacity = 1;
                sliderContainer.style.transform = 'translateX(0)';

                setTimeout(() => {
                    sliderContainer.style.transition = 'none';
                    isAnimating = false;
                }, animationDuration);
            }, 50);
        }, fadeDuration);
    }

    function startAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
        if (images.length > 1) {
            autoSlideInterval = setInterval(() => {
                showImage(currentIndex + 1);
            }, 3000);
        }
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            showImage(currentIndex - 1);
            resetAutoSlide();
        } else if (e.key === 'ArrowRight') {
            showImage(currentIndex + 1);
            resetAutoSlide();
        }
    });

    let touchStartX = 0;
    let touchEndX = 0;

    sliderContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    sliderContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            showImage(currentIndex + 1);
            resetAutoSlide();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            showImage(currentIndex - 1);
            resetAutoSlide();
        }
    }

    preloadImages();
    showImage(currentIndex);
    startAutoSlide();

    prevArrow.addEventListener('click', () => {
        showImage(currentIndex - 1);
        resetAutoSlide();
    });

    nextArrow.addEventListener('click', () => {
        showImage(currentIndex + 1);
        resetAutoSlide();
    });

    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    sliderContainer.addEventListener('mouseleave', () => {
        startAutoSlide();
    });
});

// 
// emergingtelent text (animation)
// 

document.addEventListener('DOMContentLoaded', function () {
    const columnContainer = document.querySelector('.columncontainer');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                const textBlocks = entry.target.querySelectorAll('.text-block');
                textBlocks.forEach((block, index) => {
                    setTimeout(() => {
                        block.style.boxShadow = '0 10px 30px rgba(230, 82, 44, 0.15)';
                        setTimeout(() => {
                            block.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
                        }, 500);
                    }, index * 200 + 300);
                });
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    if (columnContainer) {
        observer.observe(columnContainer);
    }
});

// 
// emerging gallery (animation)
// 

document.addEventListener('DOMContentLoaded', function () {
    const galleryContainer = document.querySelector('.emerging-gallery-sections-container');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                const cards = entry.target.querySelectorAll('.emerging-gallery-section-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.boxShadow = '0 40px 60px -20px rgba(230, 82, 44, 0.3)';
                        setTimeout(() => {
                            card.style.boxShadow = '0 30px 50px -20px rgba(0, 0, 0, 0.2)';
                        }, 800);
                    }, index * 200 + 300);
                });
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    if (galleryContainer) {
        observer.observe(galleryContainer);
    }

    const cards = document.querySelectorAll('.emerging-gallery-section-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const title = card.querySelector('.emerging-section-title');
            const desc = card.querySelector('.emerging-section-description');

            if (title) {
                title.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.1)';
                title.style.transform = 'translateY(0)';
                title.style.opacity = '1';
            }

            if (desc) {
                setTimeout(() => {
                    desc.style.transition = 'all 0.8s cubic-bezier(0.19, 1, 0.22, 1)';
                    desc.style.opacity = '1';
                    desc.style.maxHeight = '200px';
                    desc.style.marginTop = '20px';
                    desc.style.transform = 'translateY(0)';
                }, 150);
            }
        });

        card.addEventListener('mouseleave', () => {
            const title = card.querySelector('.emerging-section-title');
            const desc = card.querySelector('.emerging-section-description');

            if (title) {
                title.style.transform = 'translateY(20px)';
                title.style.opacity = '0';
            }

            if (desc) {
                desc.style.opacity = '0';
                desc.style.maxHeight = '0';
                desc.style.marginTop = '0';
                desc.style.transform = 'translateY(10px)';
            }
        });
    });
});

// 
// artist (animation)
// 

const artistCards = document.querySelectorAll('.artist-card:not(.artist-empty-card)');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('artist-card-visible');

            entry.target.style.boxShadow = '0 0 20px rgba(255,255,255,0.6)';
            setTimeout(() => {
                entry.target.style.boxShadow = 'none';
            }, 1000);
        }
    });
}, { threshold: 0.1 });

artistCards.forEach(card => {
    observer.observe(card);

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const angleX = (y - centerY) / 20;
        const angleY = (centerX - x) / 20;

        card.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateX(0) rotateY(0)';
    });
});

// 
// exhibition (animation)
// 

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.header-clone').style.animationPlayState = 'running';

    const sections = document.querySelectorAll('.exhib-section, .past-exhib-header, .past-exhib-section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                if (entry.target.classList.contains('exhib-section')) {
                    entry.target.querySelector('.exhib-image').style.transform = 'rotateY(0deg)';
                }
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });

    const pastTitles = document.querySelectorAll('.past-exhib-title');
    pastTitles.forEach(title => {
        title.addEventListener('mouseenter', () => {
            title.style.transform = 'scale(1.02)';
        });
        title.addEventListener('mouseleave', () => {
            title.style.transform = 'scale(1)';
        });
    });
});

// 
// press and media slider (animation)
// 

document.addEventListener('DOMContentLoaded', function () {
    const pressContainer = document.querySelector('.press-container');
    const leftPanel = document.querySelector('.press-left-panel');
    const rightPanel = document.querySelector('.press-right-panel');

    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.75 &&
            rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) * 0.25
        );
    }

    function handleScroll() {
        if (isInViewport(pressContainer)) {
            leftPanel.classList.add('animate');
            rightPanel.classList.add('animate');
            window.removeEventListener('scroll', handleScroll);
        }
    }

    if (isInViewport(pressContainer)) {
        leftPanel.classList.add('animate');
        rightPanel.classList.add('animate');
    } else {
        window.addEventListener('scroll', handleScroll);
    }

    const readMoreLink = document.querySelector('.press-read-more');
    readMoreLink.addEventListener('mouseenter', function () {
        this.style.transform = 'translateX(5px)';
    });

    readMoreLink.addEventListener('mouseleave', function () {
        this.style.transform = 'translateX(0)';
    });
});

// 
// press and media gallery (animation)
// 

document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.press-gallery-item');

    galleryItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    galleryItems.forEach(item => {
        observer.observe(item);

        item.addEventListener('click', function () {
            console.log('Viewing artwork:', this.querySelector('h3').textContent);
        });
    });
});

// 
// space top slider
// 

document.addEventListener('DOMContentLoaded', () => {
    const sliderImage = document.getElementById('space-slider-image');
    const prevArrow = document.querySelector('.space-slider-arrow.prev-arrow');
    const nextArrow = document.querySelector('.space-slider-arrow.next-arrow');
    const sliderContainer = document.querySelector('.space-slider');

    const images = [
        'images/space1.png',
        'images/space2.png',
        'images/space3.png',
        'images/space4.png',
        'images/space5.png',
        'images/space6.png',
    ];

    let currentIndex = 0;
    let autoSlideInterval;
    let isAnimating = false;

    function preloadImages() {
        images.forEach(img => {
            const image = new Image();
            image.src = img;
        });
    }

    function showImage(index) {
        if (isAnimating) return;
        isAnimating = true;

        if (images.length === 0) {
            console.warn("No images found in the slider array.");
            sliderImage.src = '';
            sliderImage.style.opacity = 0;
            clearInterval(autoSlideInterval);
            isAnimating = false;
            return;
        }

        if (index >= images.length) {
            index = 0;
        } else if (index < 0) {
            index = images.length - 1;
        }
        currentIndex = index;

        const animationDuration = 600;
        const fadeDuration = 300;

        sliderImage.style.transition = `opacity ${fadeDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        sliderImage.style.opacity = 0;

        setTimeout(() => {
            sliderImage.src = images[currentIndex];

            sliderContainer.style.transition = `transform ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`;

            const direction = index > currentIndex ? 'right' : 'left';
            if (direction === 'right') {
                sliderContainer.style.transform = 'translateX(-20px)';
            } else {
                sliderContainer.style.transform = 'translateX(20px)';
            }

            setTimeout(() => {
                sliderImage.style.opacity = 1;
                sliderContainer.style.transform = 'translateX(0)';

                setTimeout(() => {
                    sliderContainer.style.transition = 'none';
                    isAnimating = false;
                }, animationDuration);
            }, 50);
        }, fadeDuration);
    }

    function startAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
        if (images.length > 1) {
            autoSlideInterval = setInterval(() => {
                showImage(currentIndex + 1);
            }, 3000);
        }
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            showImage(currentIndex - 1);
            resetAutoSlide();
        } else if (e.key === 'ArrowRight') {
            showImage(currentIndex + 1);
            resetAutoSlide();
        }
    });

    let touchStartX = 0;
    let touchEndX = 0;

    sliderContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    sliderContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            showImage(currentIndex + 1);
            resetAutoSlide();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            showImage(currentIndex - 1);
            resetAutoSlide();
        }
    }

    preloadImages();
    showImage(currentIndex);
    startAutoSlide();

    prevArrow.addEventListener('click', () => {
        showImage(currentIndex - 1);
        resetAutoSlide();
    });

    nextArrow.addEventListener('click', () => {
        showImage(currentIndex + 1);
        resetAutoSlide();
    });

    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    sliderContainer.addEventListener('mouseleave', () => {
        startAutoSlide();
    });

    const spaceSection = document.querySelector('.space-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                startAutoSlide();
            } else {
                clearInterval(autoSlideInterval);
            }
        });
    }, {
        threshold: 0.5
    });

    if (spaceSection) {
        observer.observe(spaceSection);
    }
});

// 
// space second slider 
// 

document.addEventListener('DOMContentLoaded', function () {
    const slider = document.getElementById('space-gallery-slider');
    const slides = document.querySelectorAll('.space-gallery-slide');
    const prevArrow = document.querySelector('.space-gallery-arrow-left');
    const nextArrow = document.querySelector('.space-gallery-arrow-right');
    const pagination = document.getElementById('space-gallery-pagination');
    let currentIndex = 0;
    let autoSlideInterval;
    let isAnimating = false;
    let dots = [];

    function initSlider() {
        pagination.innerHTML = '';

        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('space-gallery-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            pagination.appendChild(dot);
        });

        dots = document.querySelectorAll('.space-gallery-dot');

        updateSlider();
        startAutoSlide();
        setupIntersectionObserver();
    }

    function goToSlide(index) {
        if (isAnimating || index === currentIndex) return;
        isAnimating = true;
        currentIndex = index;
        updateSlider();

        setTimeout(() => {
            isAnimating = false;
        }, 600);
    }

    function changeSlide(direction) {
        if (isAnimating) return;
        isAnimating = true;

        currentIndex += direction;

        if (currentIndex < 0) {
            currentIndex = slides.length - 1;
        } else if (currentIndex >= slides.length) {
            currentIndex = 0;
        }

        updateSlider();
        resetAutoSlide();

        setTimeout(() => {
            isAnimating = false;
        }, 600);
    }

    function updateSlider() {
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function startAutoSlide() {
        if (slides.length <= 1) return;
        autoSlideInterval = setInterval(() => {
            changeSlide(1);
        }, 5000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    function setupIntersectionObserver() {
        const galleryWrapper = document.querySelector('.space-gallery-wrapper');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    startAutoSlide();
                } else {
                    clearInterval(autoSlideInterval);
                }
            });
        }, {
            threshold: 0.2
        });

        observer.observe(galleryWrapper);
    }

    prevArrow.addEventListener('click', () => changeSlide(-1));
    nextArrow.addEventListener('click', () => changeSlide(1));

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            changeSlide(-1);
        } else if (e.key === 'ArrowRight') {
            changeSlide(1);
        }
    });

    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            changeSlide(1);
        } else if (touchEndX > touchStartX + swipeThreshold) {
            changeSlide(-1);
        }
    }

    slider.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    slider.addEventListener('mouseleave', () => {
        startAutoSlide();
    });

    initSlider();
});


// 
// space gallery A . B . C
// 

document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.space-gallery-slider-slide');
    const tabs = document.querySelectorAll('.space-gallery-slider-tab');
    const prevArrow = document.querySelector('.space-gallery-slider-arrow-left');
    const nextArrow = document.querySelector('.space-gallery-slider-arrow-right');
    const galleryWrapper = document.querySelector('.space-gallery-slider-wrapper');
    let currentIndex = 0;
    let autoSlideInterval;
    let isAnimating = false;

    function initSlider() {
        showSlide(currentIndex);
        startAutoSlide();
        setupIntersectionObserver();
    }

    function showSlide(index) {
        if (isAnimating || index === currentIndex) return;
        isAnimating = true;

        slides[currentIndex].classList.remove('active');
        tabs[currentIndex].classList.remove('active');

        currentIndex = index;

        slides[currentIndex].classList.add('active');
        tabs[currentIndex].classList.add('active');

        setTimeout(() => {
            isAnimating = false;
        }, 800);
    }

    function changeSlide(direction) {
        let newIndex = currentIndex + direction;

        if (newIndex < 0) {
            newIndex = slides.length - 1;
        } else if (newIndex >= slides.length) {
            newIndex = 0;
        }

        showSlide(newIndex);
        resetAutoSlide();
    }

    function startAutoSlide() {
        if (slides.length <= 1) return;
        autoSlideInterval = setInterval(() => {
            changeSlide(1);
        }, 5000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    function setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    startAutoSlide();
                } else {
                    clearInterval(autoSlideInterval);
                }
            });
        }, {
            threshold: 0.2
        });

        observer.observe(galleryWrapper);
    }

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            showSlide(index);
            resetAutoSlide();
        });
    });

    prevArrow.addEventListener('click', () => changeSlide(-1));
    nextArrow.addEventListener('click', () => changeSlide(1));

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            changeSlide(-1);
        } else if (e.key === 'ArrowRight') {
            changeSlide(1);
        }
    });

    let touchStartX = 0;
    let touchEndX = 0;

    galleryWrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    galleryWrapper.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            changeSlide(1);
        } else if (touchEndX > touchStartX + swipeThreshold) {
            changeSlide(-1);
        }
    }

    galleryWrapper.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    galleryWrapper.addEventListener('mouseleave', () => {
        startAutoSlide();
    });

    initSlider();
});

// 
// space specification
// 

document.addEventListener('DOMContentLoaded', function () {
    const specsSection = document.querySelector('.space-gallery-specs');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.2
    });

    if (specsSection) {
        observer.observe(specsSection);
    }
});

// 
// space offered / Apply button
// 

document.addEventListener('DOMContentLoaded', function () {
    const spaceOfferedSection = document.querySelector('.space-offered-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    if (spaceOfferedSection) {
        observer.observe(spaceOfferedSection);
    }

    const spaceApplyBtn = document.getElementById('space-apply-btn');
    const spaceApplicationForm = document.getElementById('space-application-form');

    if (spaceApplyBtn && spaceApplicationForm) {
        spaceApplyBtn.addEventListener('click', function (e) {
            e.preventDefault();

            const isFormVisible = spaceApplicationForm.classList.contains('active');

            if (isFormVisible) {
                spaceApplicationForm.classList.remove('active');
                spaceApplyBtn.textContent = 'APPLY TO EXHIBIT YOUR WORK';
            } else {
                spaceApplicationForm.classList.add('active');
                spaceApplyBtn.textContent = 'HIDE APPLICATION FORM';

                setTimeout(() => {
                    spaceApplicationForm.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 50);
            }
        });
    }

    const loginBtn = document.getElementById('space-login-btn');
    const registerBtn = document.getElementById('space-register-btn');
    const loginForm = document.getElementById('space-login-form');
    const registerForm = document.getElementById('space-register-form');
    const showRegister = document.getElementById('show-register');
    const showLogin = document.getElementById('show-login');

    function switchToLogin() {
        loginBtn.classList.add('active');
        registerBtn.classList.remove('active');
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
    }

    function switchToRegister() {
        registerBtn.classList.add('active');
        loginBtn.classList.remove('active');
        registerForm.classList.add('active');
        loginForm.classList.remove('active');
    }

    if (loginBtn && registerBtn && loginForm && registerForm) {
        loginBtn.addEventListener('click', function (e) {
            e.preventDefault();
            switchToLogin();
        });

        registerBtn.addEventListener('click', function (e) {
            e.preventDefault();
            switchToRegister();
        });

        if (showRegister) {
            showRegister.addEventListener('click', function (e) {
                e.preventDefault();
                switchToRegister();
            });
        }

        if (showLogin) {
            showLogin.addEventListener('click', function (e) {
                e.preventDefault();
                switchToLogin();
            });
        }
    }

    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast-notification ${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
        }, 10);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 5000);
    }

    const loginFormEl = document.getElementById('space-login-form');
    if (loginFormEl) {
        loginFormEl.addEventListener('submit', function (e) {
            e.preventDefault();

            const email = document.getElementById('login-email');
            const password = document.getElementById('login-password');
            let isValid = true;

            email.parentElement.classList.remove('has-error');
            password.parentElement.classList.remove('has-error');

            if (!email.value.trim()) {
                email.parentElement.classList.add('has-error');
                isValid = false;
            }

            if (!password.value.trim()) {
                password.parentElement.classList.add('has-error');
                isValid = false;
            }

            if (isValid) {
                const submitBtn = loginFormEl.querySelector('.space-submit-btn');
                const originalText = submitBtn.textContent;
                submitBtn.disabled = true;
                submitBtn.textContent = 'Logging in...';

                setTimeout(() => {
                    showToast('Login successful!');
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                    loginFormEl.reset();
                }, 1500);
            } else {
                showToast('Please fill all required fields', 'error');
            }
        });
    }

    const registerFormEl = document.getElementById('space-register-form');
    if (registerFormEl) {
        registerFormEl.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('register-name');
            const email = document.getElementById('register-email');
            const password = document.getElementById('register-password');
            const confirm = document.getElementById('register-confirm');
            const terms = document.getElementById('register-terms');
            let isValid = true;

            name.parentElement.classList.remove('has-error');
            email.parentElement.classList.remove('has-error');
            password.parentElement.classList.remove('has-error');
            confirm.parentElement.classList.remove('has-error');
            terms.parentElement.classList.remove('has-error');

            if (!name.value.trim()) {
                name.parentElement.classList.add('has-error');
                isValid = false;
            }

            if (!email.value.trim()) {
                email.parentElement.classList.add('has-error');
                isValid = false;
            }

            if (!password.value.trim()) {
                password.parentElement.classList.add('has-error');
                isValid = false;
            }

            if (!confirm.value.trim() || confirm.value !== password.value) {
                confirm.parentElement.classList.add('has-error');
                isValid = false;
            }

            if (!terms.checked) {
                terms.parentElement.classList.add('has-error');
                isValid = false;
            }

            if (isValid) {
                const submitBtn = registerFormEl.querySelector('.space-submit-btn');
                const originalText = submitBtn.textContent;
                submitBtn.disabled = true;
                submitBtn.textContent = 'Registering...';

                setTimeout(() => {
                    showToast('Registration successful!');
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                    registerFormEl.reset();
                    switchToLogin();
                }, 1500);
            } else {
                showToast('Please fill all required fields correctly', 'error');
            }
        });
    }

    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-5px); }
            40%, 80% { transform: translateX(5px); }
        }
        
        .has-error input,
        .has-error select {
            border-color: #e6522c !important;
            animation: shake 0.5s;
        }
        
        .toast-notification {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            padding: 12px 24px;
            border-radius: 4px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            opacity: 0;
            transition: all 0.3s ease;
        }
        
        .toast-notification.success {
            background: #4CAF50;
        }
        
        .toast-notification.error {
            background: #e6522c;
        }
        
        .toast-notification.show {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
});

// 
// research library
// 

document.addEventListener('DOMContentLoaded', function () {
    const researchPage = document.querySelector('.research-page');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    if (researchPage) {
        observer.observe(researchPage);
    }

    const facilitiesToggle = document.getElementById('facilities-toggle');
    const timingsToggle = document.getElementById('timings-toggle');
    const facilitiesContent = document.getElementById('facilities-content');
    const timingsContent = document.getElementById('timings-content');

    function showFacilities() {
        facilitiesToggle.classList.add('active');
        facilitiesToggle.classList.remove('inactive');
        timingsToggle.classList.add('inactive');
        timingsToggle.classList.remove('active');

        timingsContent.classList.remove('active');
        setTimeout(() => {
            facilitiesContent.classList.add('active');
        }, 300);
    }

    function showTimings() {
        timingsToggle.classList.add('active');
        timingsToggle.classList.remove('inactive');
        facilitiesToggle.classList.add('inactive');
        facilitiesToggle.classList.remove('active');

        facilitiesContent.classList.remove('active');
        setTimeout(() => {
            timingsContent.classList.add('active');
        }, 300);
    }

    facilitiesToggle.addEventListener('click', showFacilities);
    timingsToggle.addEventListener('click', showTimings);
});

// 
// contact form (animation)
// 

document.addEventListener('DOMContentLoaded', function () {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px 0px 0px'
    });

    document.querySelectorAll('.contact-form-container, .form-title, .form-group, .full-width-message, .submit-button-container, .floating-element').forEach(el => {
        observer.observe(el);
    });
});

// 
// contact grid (animation)
// 

document.addEventListener('DOMContentLoaded', function () {
    const gridContainer = document.querySelector('.contact-grid-container');
    const dec1 = document.createElement('div');
    dec1.className = 'contact-decoration decoration-1';
    const dec2 = document.createElement('div');
    dec2.className = 'contact-decoration decoration-2';
    gridContainer.parentNode.appendChild(dec1);
    gridContainer.parentNode.appendChild(dec2);

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                if (entry.target.classList.contains('contact-grid-container')) {
                    const cards = entry.target.querySelectorAll('.contact-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('visible');
                        }, index * 100);
                    });

                    const line = document.querySelector('.contact-horizontal-line-full');
                    if (line) {
                        setTimeout(() => {
                            line.classList.add('visible');
                        }, 500);
                    }

                    setTimeout(() => {
                        dec1.classList.add('visible');
                        dec2.classList.add('visible');
                    }, 300);
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    observer.observe(document.querySelector('.contact-grid-container'));
    if (document.querySelector('.contact-horizontal-line-full')) {
        observer.observe(document.querySelector('.contact-horizontal-line-full'));
    }
});

// 
// contact map (animation)
// 

document.addEventListener('DOMContentLoaded', function () {
    const mapContainer = document.querySelector('.map-container');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    observer.observe(mapContainer);
});

// 
// footer (sign up / icons)
// 
document.addEventListener('DOMContentLoaded', function () {
    // Email form submission
    document.querySelector('.email-signup-form')?.addEventListener('submit', function (e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();

        if (email) {
            alert('Thank you for subscribing with: ' + email);
            emailInput.value = '';
        } else {
            alert('Please enter a valid email address');
        }
    });

    // Social icons
    document.querySelectorAll('.social-icons a').forEach(icon => {
        icon.addEventListener('click', function (e) {
            e.preventDefault();
            const platform = this.querySelector('i').classList[1];
            let url = '#';

            switch (platform) {
                case 'fa-instagram':
                    url = 'https://www.instagram.com/yourprofile';
                    break;
                case 'fa-envelope':
                    url = 'mailto:contact@yourgallery.com';
                    break;
                case 'fa-facebook-f':
                    url = 'https://www.facebook.com/yourprofile';
                    break;
            }

            window.open(url, '_blank');
        });
    });

    // Scroll animation trigger
    const footerSection = document.querySelector('.footer-section');

    const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                footerSection.classList.add('footer-animate');
                footerObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    if (footerSection) {
        footerObserver.observe(footerSection);
    }
});