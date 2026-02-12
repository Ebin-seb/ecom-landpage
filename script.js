/* ========================================
   weariiii - Fashion E-commerce Website
   JavaScript Functionality
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // Navbar Scroll Effect
    // ========================================
    const navbar = document.getElementById('navbar');
    
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleNavbarScroll);
    
    // ========================================
    // Search Functionality
    // ========================================
    const searchBtn = document.getElementById('searchBtn');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchClose = document.getElementById('searchClose');
    const searchInput = document.getElementById('searchInput');
    
    if (searchBtn && searchOverlay) {
        searchBtn.addEventListener('click', function() {
            searchOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            setTimeout(() => {
                searchInput.focus();
            }, 300);
        });
        
        searchClose.addEventListener('click', closeSearch);
        
        searchOverlay.addEventListener('click', function(e) {
            if (e.target === searchOverlay) {
                closeSearch();
            }
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
                closeSearch();
            }
        });
    }
    
    function closeSearch() {
        searchOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // ========================================
    // Smooth Scroll for Navigation Links
    // ========================================
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    const navbarCollapse = document.getElementById('navbarNav');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                    if (bsCollapse) {
                        bsCollapse.hide();
                    } else {
                        navbarCollapse.classList.remove('show');
                    }
                }
                
                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // ========================================
    // Scroll Reveal Animation
    // ========================================
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
    
    function revealOnScroll() {
        scrollRevealElements.forEach((element, index) => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            const revealPoint = 100;
            
            if (elementTop < windowHeight - revealPoint) {
                setTimeout(() => {
                    element.classList.add('revealed');
                }, (index % 4) * 100);
            }
        });
    }
    
    // Initial check
    revealOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);
    
    // ========================================
    // Active Navigation Link on Scroll
    // ========================================
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + navbar.offsetHeight + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    
    // ========================================
    // Product Card Hover Effects
    // ========================================
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // ========================================
    // Action Buttons Click Handler
    // ========================================
    const actionButtons = document.querySelectorAll('.action-btn');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Add click animation
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Show notification
            const icon = this.querySelector('i');
            let message = '';
            
            if (icon.classList.contains('fa-heart')) {
                message = 'Added to wishlist!';
                icon.classList.toggle('fas');
                icon.classList.toggle('far');
            } else if (icon.classList.contains('fa-shopping-bag')) {
                message = 'Added to cart!';
                updateCartCount();
            } else if (icon.classList.contains('fa-eye')) {
                message = 'Quick view opened!';
            }
            
            if (message) {
                showNotification(message);
            }
        });
    });
    
    // ========================================
    // Cart Count Update
    // ========================================
    function updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            let currentCount = parseInt(cartCount.textContent);
            cartCount.textContent = currentCount + 1;
            
            // Add animation
            cartCount.style.transform = 'scale(1.3)';
            setTimeout(() => {
                cartCount.style.transform = 'scale(1)';
            }, 200);
        }
    }
    
    // ========================================
    // Notification System
    // ========================================
    window.showNotification = function(message) {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: #2D5A27;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            display: flex;
            align-items: center;
            gap: 0.75rem;
            z-index: 9999;
            animation: slideIn 0.3s ease;
            font-weight: 500;
        `;
        
        // Add animation keyframes if not exists
        if (!document.getElementById('notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    };
    
    // ========================================
    // Counter Animation for Stats
    // ========================================
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersAnimated = false;
    
    function animateCounters() {
        if (countersAnimated) return;
        
        const statsSection = document.querySelector('.hero-stats');
        if (!statsSection) return;
        
        const sectionTop = statsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight - 100) {
            countersAnimated = true;
            
            statNumbers.forEach(stat => {
                const target = stat.textContent;
                const numericValue = parseInt(target.replace(/[^0-9]/g, ''));
                const suffix = target.replace(/[0-9]/g, '');
                let current = 0;
                const increment = numericValue / 50;
                const duration = 2000;
                const stepTime = duration / 50;
                
                const counter = setInterval(() => {
                    current += increment;
                    if (current >= numericValue) {
                        stat.textContent = target;
                        clearInterval(counter);
                    } else {
                        stat.textContent = Math.floor(current) + suffix;
                    }
                }, stepTime);
            });
        }
    }
    
    window.addEventListener('scroll', animateCounters);
    
    // ========================================
    // Back to Top Button
    // ========================================
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #2D5A27;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 15px rgba(45, 90, 39, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
    `;
    
    document.body.appendChild(backToTopBtn);
    
    function toggleBackToTop() {
        if (window.scrollY > 500) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    }
    
    window.addEventListener('scroll', toggleBackToTop);
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    backToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.background = '#1A3D17';
    });
    
    backToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.background = '#2D5A27';
    });
    
    // ========================================
    // Loading Animation
    // ========================================
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Trigger initial animations
        setTimeout(() => {
            revealOnScroll();
        }, 100);
    });
    
    // ========================================
    // Mobile Menu Close on Outside Click
    // ========================================
    const navbarToggler = document.querySelector('.navbar-toggler');
    
    if (navbarToggler && navbarCollapse) {
        document.addEventListener('click', function(e) {
            const isClickInside = navbarCollapse.contains(e.target) || navbarToggler.contains(e.target);
            
            if (!isClickInside && navbarCollapse.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            }
        });
    }
    
    // ========================================
    // Preloader
    // ========================================
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = '<div class="spinner"></div>';
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #E8F5E9 0%, #F1F8E9 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99999;
        transition: opacity 0.5s ease, visibility 0.5s ease;
    `;
    
    const spinnerStyle = document.createElement('style');
    spinnerStyle.textContent = `
        .spinner {
            width: 50px;
            height: 50px;
            border: 3px solid rgba(45, 90, 39, 0.2);
            border-top-color: #2D5A27;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(spinnerStyle);
    
    document.body.appendChild(preloader);
    document.body.style.overflow = 'hidden';
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            document.body.style.overflow = '';
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 500);
    });
    
    // ========================================
    // Search Suggestions Click
    // ========================================
    const searchSuggestions = document.querySelectorAll('.search-suggestions li');
    
    searchSuggestions.forEach(suggestion => {
        suggestion.addEventListener('click', function() {
            const text = this.textContent.trim();
            searchInput.value = text;
            showNotification(`Searching for: ${text}`);
        });
    });
    
});

// -------------------------------------------
// Theme selection
// -------------------------------------------

const toggleTheme = () => {
    const darkTheme = document.getElementById('dark-theme')
    const isDark = !darkTheme.disabled

    darkTheme.disabled = isDark
    localStorage.setItem('theme', isDark ? 'light' : 'dark')
  }

  // Load saved theme
  window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      document.getElementById('dark-theme').disabled = false
    }
  })

// ========================================
// Console Welcome Message
// ========================================
// console.log('%c weariiii ', 'background: #2D5A27; color: white; font-size: 24px; font-weight: bold; padding: 10px 20px; border-radius: 10px;');
// console.log('%c Fashion E-commerce Website ', 'color: #2D5A27; font-size: 14px;');
// console.log('%c Built with HTML, CSS, JavaScript & Bootstrap ', 'color: #7CB342; font-size: 12px;');
// 5, 255, 0.2);
//             border-top-color: #74c69d;
//             border-radius: 50%;
//             animation: spin 1s linear infinite;
//         }
//         @keyframes spin {
//             to { transform: rotate(360deg); }
//         }
//     `;
//     document.head.appendChild(spinner);
    
//     document.body.appendChild(preloader);
//     document.body.style.overflow = 'hidden';
    
//     window.addEventListener('load', function() {
//         setTimeout(() => {
//             preloader.style.opacity = '0';
//             preloader.style.visibility = 'hidden';
//             document.body.style.overflow = '';
//             setTimeout(() => {
//                 preloader.remove();
//             }, 500);
//         }, 500);
//     });
    
// });

// // ========================================
// // Console Welcome Message
// // ========================================
// console.log('%c weariiii ', 'background: linear-gradient(135deg, #1a4d2e, #2d6a4f); color: white; font-size: 24px; font-weight: bold; padding: 10px 20px; border-radius: 10px;');
// console.log('%c Fashion E-commerce Website ', 'color: #74c69d; font-size: 14px;');
// console.log('%c Built with HTML, CSS, JavaScript & Bootstrap ', 'color: #40916c; font-size: 12px;');
