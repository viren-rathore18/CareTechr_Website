/**
 * CareTechr Navbar - Vanilla JavaScript Implementation
 * Handles mobile menu toggle, scroll effects, and CTA events
 */
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const demoBtn = document.getElementById('demoBtn');
    const mobileDemoBtn = document.querySelector('.mobile-cta-button');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    // State
    let isMenuOpen = false;
    
    /**
     * Toggle mobile menu open/close
     */
    function toggleMobileMenu() {
        isMenuOpen = !isMenuOpen;
        
        // Toggle hamburger icon
        hamburger.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isMenuOpen);
        
        // Toggle mobile menu panel
        mobileMenu.classList.toggle('active');
        mobileMenu.setAttribute('aria-hidden', !isMenuOpen);
        
        // Toggle body scroll
        document.body.classList.toggle('no-scroll', isMenuOpen);
    }
    
    /**
     * Close mobile menu
     */
    function closeMobileMenu() {
        if (isMenuOpen) {
            isMenuOpen = false;
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            mobileMenu.classList.remove('active');
            mobileMenu.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('no-scroll');
        }
    }
    
    /**
     * Handle scroll event - add solid background after 30px
     */
    function handleScroll() {
        if (window.scrollY > 30) {
            navbar.classList.add('solid');
        } else {
            navbar.classList.remove('solid');
        }
    }
    
    /**
     * Emit custom event for demo button click
     */
    function handleDemoClick() {
        const event = new CustomEvent('open-demo', {
            detail: {
                timestamp: new Date().toISOString(),
                source: this === demoBtn ? 'desktop' : 'mobile'
            }
        });
        
        document.dispatchEvent(event);
        console.log('Demo button clicked - open-demo event emitted:', event.detail);
        
        // Close mobile menu if open
        closeMobileMenu();
    }
    
    /**
     * Handle escape key press to close mobile menu
     */
    function handleEscapeKey(e) {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMobileMenu();
        }
    }
    
    /**
     * Handle window resize - close menu if switching to desktop
     */
    function handleResize() {
        if (window.innerWidth >= 880 && isMenuOpen) {
            closeMobileMenu();
        }
    }
    
    // Event Listeners
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Close menu when clicking on any nav link
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // CTA button click handlers
    demoBtn.addEventListener('click', handleDemoClick);
    mobileDemoBtn.addEventListener('click', handleDemoClick);
    
    // Window event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleEscapeKey);
    window.addEventListener('resize', handleResize);
    
    // Initialize scroll state
    handleScroll();
    
    // Log initialization
    console.log('CareTechr navbar initialized successfully');
});


// Add this function to navbar.js
function highlightCurrentPage() {
    // Get current page filename
    const currentPage = window.location.pathname.split('/').pop();
    
    // Find all navigation links
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    // Add 'active' class to matching link
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Call it when DOM loads
document.addEventListener('DOMContentLoaded', highlightCurrentPage);