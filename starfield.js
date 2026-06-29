// Generate starfield background with blinking stars
function generateStarfield(numStars = 100) {
    const starfield = document.createElement('div');
    starfield.className = 'starfield';
    
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = `star size${Math.floor(Math.random() * 3) + 1}`;
        
        // Random position
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        
        // Random animation delay for more natural blinking
        const delay = Math.random() * 3;
        star.style.animationDelay = delay + 's';
        
        starfield.appendChild(star);
    }
    
    document.body.insertBefore(starfield, document.body.firstChild);
}

// Generate starfield when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', generateStarfield);
} else {
    generateStarfield();
}
