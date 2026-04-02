// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', () => {
    
    // Select all elements that have the 'hidden' class
    const hiddenElements = document.querySelectorAll('.hidden');

    // Create an Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            // If the element is visible in the viewport
            if (entry.isIntersecting) {
                // Add the 'show' class to trigger the animation
                entry.target.classList.add('show');
                // Stop observing the element once it has appeared
                observer.unobserve(entry.target);
            }
        });
    }, {
        // Trigger the animation when the element is 15% visible
        threshold: 0.15 
    });

    // Tell the observer to watch each hidden element
    hiddenElements.forEach((el) => observer.observe(el));
});