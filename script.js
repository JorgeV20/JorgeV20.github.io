document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Scroll Animation Logic ---
    const hiddenElements = document.querySelectorAll('.hidden');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    hiddenElements.forEach((el) => observer.observe(el));

    // --- 2. Modal Logic ---
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalTags = document.getElementById('modal-tags');
    const closeBtn = document.querySelector('.close-btn');
    const cards = document.querySelectorAll('.card');

    if (!modal) console.error("❌ ERROR: Could not find the modal in your HTML! Make sure the <div id='project-modal'> exists.");

    // Open modal when a card is clicked
    cards.forEach((card, index) => {
        card.addEventListener('click', () => {

            // Grab the basic content
            const title = card.querySelector('h3') ? card.querySelector('h3').innerText : "No Title";
            const shortDesc = card.querySelector('p') ? card.querySelector('p').innerText : "No Description";
            const tagsHTML = card.querySelector('.tags') ? card.querySelector('.tags').innerHTML : "";

            // Grab the NEW hidden content
            const extendedDescEl = card.querySelector('.extended-desc');
            const repoLinkEl = card.querySelector('.repo-link');
            const modalLinkBtn = document.getElementById('modal-link');

            // --- Inject content into the modal ---
            if (modalTitle) modalTitle.innerText = title;
            if (modalTags) modalTags.innerHTML = tagsHTML;

            // Combine descriptions safely
            if (modalDesc) {
                if (extendedDescEl) {
                    modalDesc.innerHTML = shortDesc + "<br><br>" + extendedDescEl.innerText;
                } else {
                    modalDesc.innerText = shortDesc;
                }
            }

            // Update the link
            if (modalLinkBtn) {
                if (repoLinkEl) {
                    modalLinkBtn.href = repoLinkEl.innerText;
                    modalLinkBtn.style.display = "inline-block"; 
                } else {
                    modalLinkBtn.style.display = "none"; 
                }
            } else {
                console.warn("⚠️ Warning: Could not find the 'View Repository' button inside the modal (id='modal-link').");
            }

            // Show the modal
            if (modal) {
                modal.classList.add('show-modal');
                document.body.style.overflow = 'hidden'; 
            }
        });
    });

    // Close modal functions
    const closeModal = () => {
        if (modal) {
            modal.classList.remove('show-modal');
            document.body.style.overflow = 'auto'; 
        }
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    window.addEventListener('click', (event) => {
        if (event.target === modal) closeModal();
    });

    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal && modal.classList.contains('show-modal')) {
            closeModal();
        }
    });
});