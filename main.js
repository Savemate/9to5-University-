// Main JavaScript for 9to5 University - FIXED VERSION

// DOM Elements with error handling
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mainNav = document.getElementById('mainNav');
const openModalBtns = document.querySelectorAll('.open-modal-btn');
const closeModalBtns = document.querySelectorAll('.close-modal');
const contentModals = document.querySelectorAll('.content-modal');
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');

// Enhanced Mobile Menu Toggle with proper state management
if (mobileMenuToggle && mainNav) {
    let menuOpen = false;
    
    mobileMenuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        menuOpen = !menuOpen;
        
        if (menuOpen) {
            mainNav.classList.add('active');
            mobileMenuToggle.innerHTML = '<i class="fas fa-times"></i>';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        } else {
            mainNav.classList.remove('active');
            mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = ''; // Restore scrolling
        }
    });
    
    // Close menu when window is resized to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && menuOpen) {
            mainNav.classList.remove('active');
            mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = '';
            menuOpen = false;
        }
    });
}

// Improved modal functionality with better error handling
if (openModalBtns.length > 0) {
    openModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
                // Focus management for accessibility
                const firstFocusable = modal.querySelector('button, input, textarea, select, a[href]');
                if (firstFocusable) {
                    firstFocusable.focus();
                }
            } else {
                console.error('Modal not found:', modalId);
            }
        });
    });
}

// Enhanced modal closing
function closeModal(modal) {
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        // Return focus to the trigger element if possible
        const triggerId = modal.id.replace('Modal', '');
        const triggerBtn = document.querySelector(`[data-modal="${modal.id}"]`);
        if (triggerBtn) {
            triggerBtn.focus();
        }
    }
}

if (closeModalBtns.length > 0) {
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.content-modal');
            closeModal(modal);
        });
    });
}

// Enhanced click-outside-to-close
if (contentModals.length > 0) {
    contentModals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
        
        // Prevent closing when clicking inside modal content
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
    });
}

// Enhanced Escape key handling
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const openModal = document.querySelector('.content-modal[style*="flex"]');
        if (openModal) {
            closeModal(openModal);
        }
    }
});

// Enhanced auth buttons with better UX
if (loginBtn) {
    loginBtn.addEventListener('click', () => {
        loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        loginBtn.disabled = true;
        
        setTimeout(() => {
            alert('Login feature would open in a full implementation. For now, you can use all features without logging in.');
            loginBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login';
            loginBtn.disabled = false;
        }, 1000);
    });
}

if (signupBtn) {
    signupBtn.addEventListener('click', () => {
        signupBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        signupBtn.disabled = true;
        
        setTimeout(() => {
            alert('Account creation feature would open in a full implementation. For now, you can use all features without an account.');
            signupBtn.innerHTML = '<i class="fas fa-user-plus"></i> Sign Up';
            signupBtn.disabled = false;
        }, 1000);
    });
}

// Enhanced smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href === '#' || href === '#!') {
            e.preventDefault();
            return;
        }
        
        const targetElement = document.querySelector(href);
        
        if (targetElement) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (mainNav && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                if (mobileMenuToggle) {
                    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
                document.body.style.overflow = '';
            }
            
            // Calculate offset for sticky header
            const headerHeight = document.querySelector('header')?.offsetHeight || 0;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced external link handling
document.querySelectorAll('a[href^="http"]').forEach(link => {
    if (!link.href.includes(window.location.hostname)) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
        // Add visual indicator
        if (!link.querySelector('i')) {
            const icon = document.createElement('i');
            icon.className = 'fas fa-external-link-alt';
            icon.style.cssText = 'margin-left: 5px; font-size: 0.8em;';
            link.appendChild(icon);
        }
    }
});

// Enhanced Intersection Observer with error handling
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

try {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
} catch (error) {
    console.warn('IntersectionObserver not supported, animations disabled');
    // Fallback for older browsers
    document.querySelectorAll('.fade-in').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    });
}

// Enhanced resize handling with debouncing
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Close mobile menu on larger screens
        if (window.innerWidth > 768 && mainNav && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            if (mobileMenuToggle) {
                mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
            document.body.style.overflow = '';
        }
    }, 250);
});

// Enhanced page load initialization
document.addEventListener('DOMContentLoaded', () => {
    // Add active class to current page link with better logic
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        const isActive = linkPage === currentPage || 
                        (currentPage === '' && linkPage === 'index.html') ||
                        (currentPage === 'index.html' && linkPage === './') ||
                        (linkPage === 'resume-builder.html' && currentPage === 'resume-builder.html');
        
        if (isActive) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Add loading state management
    document.body.classList.add('loaded');
    
    // Initialize any tooltips or additional UI elements
    initializeTooltips();
});

// Initialize tooltips function
function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[title]');
    tooltipElements.forEach(element => {
        const title = element.getAttribute('title');
        if (title) {
            element.setAttribute('data-tooltip', title);
            element.removeAttribute('title');
            
            element.addEventListener('mouseenter', showTooltip);
            element.addEventListener('mouseleave', hideTooltip);
        }
    });
}

function showTooltip(e) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = e.target.getAttribute('data-tooltip');
    document.body.appendChild(tooltip);
    
    const rect = e.target.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
}

function hideTooltip() {
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

// Add CSS for tooltips
const tooltipCSS = `
.tooltip {
    position: absolute;
    background: #333;
    color: white;
    padding: 8px 12px;
    border-radius: 4px;
    font-size: 14px;
    z-index: 10000;
    pointer-events: none;
    white-space: nowrap;
}
.tooltip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #333 transparent transparent transparent;
}
`;

// Add tooltip styles to head
const style = document.createElement('style');
style.textContent = tooltipCSS;
document.head.appendChild(style);
