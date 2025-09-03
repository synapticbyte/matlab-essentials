// Tab functionality
const tabs = document.querySelectorAll('.tab');
const sections = document.querySelectorAll('.category-section');

tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and sections
        tabs.forEach(t => t.classList.remove('active'));
        sections.forEach(s => s.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Show corresponding section
        const sectionIds = ['basics', 'variables', 'math', 'plotting', 'matrices', 'programming', 'file'];
        const targetSection = document.getElementById(sectionIds[index]);
        if (targetSection) {
            targetSection.classList.add('active');
        }
    });
});

// Search functionality
const searchInput = document.getElementById('searchInput');
const commandCards = document.querySelectorAll('.command-card');

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    commandCards.forEach(card => {
        const name = card.querySelector('.command-name').textContent.toLowerCase();
        const syntax = card.querySelector('.command-syntax').textContent.toLowerCase();
        const description = card.querySelector('.command-description').textContent.toLowerCase();
        const example = card.querySelector('.command-example').textContent.toLowerCase();
        
        const isMatch = name.includes(searchTerm) || 
                       syntax.includes(searchTerm) || 
                       description.includes(searchTerm) || 
                       example.includes(searchTerm);
        
        if (isMatch) {
            card.classList.remove('hidden');
            highlightText(card, searchTerm);
        } else {
            card.classList.add('hidden');
        }
    });
    
    // Show all sections if searching, otherwise show active tab
    if (searchTerm) {
        sections.forEach(section => {
            section.style.display = 'block';
        });
    } else {
        sections.forEach(section => {
            section.style.display = section.classList.contains('active') ? 'block' : 'none';
        });
        // Remove highlights
        removeHighlights();
    }
});

function highlightText(card, searchTerm) {
    if (!searchTerm) return;

    const elements = [
        card.querySelector('.command-name'),
        card.querySelector('.command-syntax'),
        card.querySelector('.command-description'),
        card.querySelector('.command-example')
    ];

    elements.forEach(element => {
        if (element && element.textContent) {
            const text = element.textContent;
            // Escape special regex characters in searchTerm
            const escapedTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(escapedTerm, 'gi');
            if (text.toLowerCase().includes(searchTerm)) {
                element.innerHTML = text.replace(regex, '<span class="highlight">$&</span>');
            }
        }
    });
}

function removeHighlights() {
    document.querySelectorAll('.highlight').forEach(highlight => {
        const parent = highlight.parentNode;
        // Replace the highlight span with its text content
        parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
        // If there are multiple highlights, this will only replace one at a time
    });
    // Restore original HTML for all command cards
    document.querySelectorAll('.command-card').forEach(card => {
        ['command-name', 'command-syntax', 'command-description', 'command-example'].forEach(cls => {
            const el = card.querySelector('.' + cls);
            if (el) {
                el.innerHTML = el.textContent;
            }
        });
    });
}