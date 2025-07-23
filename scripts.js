document.addEventListener('DOMContentLoaded', function() {

    const navButtons = document.querySelectorAll('#shortcuts button');

    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const sectionId = this.dataset.sectionId;
            const targetSection = document.getElementById(sectionId);

            if (targetSection) {
                const offsetTop = 60;
                const newOffset = targetSection.offsetTop - offsetTop;

                window.scrollTo({
                    top: newOffset,
                    behavior: 'smooth'
                });
            } else {
                console.warn(`Section with ID '${sectionId}' not found.`);
            }
        });
    });
	const backToTopButton = document.getElementById('back-to-top');

    if (backToTopButton) { // Check if the button exists
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,  // Scroll to the very top of the page
                behavior: 'smooth'
            });
        });
    } else {
        console.warn("Back to Top button not found."); // Handle case where button doesn't exist
    }


    const searchBar = document.getElementById('search-bar');

    if (searchBar) {
        searchBar.addEventListener('input', function(event) {
            const searchTerm = event.target.value.toLowerCase();
            const artykuly = document.querySelectorAll('.artykul');

            artykuly.forEach(artykul => {
                let hasMatch = false;
                const paragraphs = artykul.querySelectorAll('p');

                paragraphs.forEach(paragraph => {
                    if (paragraph.textContent.toLowerCase().includes(searchTerm)) {
                        hasMatch = true;
                    }
                });

                paragraphs.forEach(paragraph => {
                    if (paragraph.textContent.toLowerCase().includes(searchTerm)) {
                        paragraph.style.visibility = 'visible'; // Show matching paragraphs
                    } else {
                        paragraph.style.visibility = 'hidden';  // Hide non-matching paragraphs
                        paragraph.style.display = 'none'; // Also hide from layout flow
                    }
                });

                if (!hasMatch) {
                  artykul.style.height = '0px';
                  artykul.style.paddingTop = '0px';
                  artykul.style.paddingBottom = '0px';
                  artykul.style.marginTop = '0px';
                  artykul.style.marginBottom = '0px';
                } else {
                    artykul.style.height = '';
                    artykul.style.paddingTop = '';
                    artykul.style.paddingBottom = '';
                    artykul.style.marginTop = '';
                    artykul.style.marginBottom = '';
                }

            });
        });

        // Clear visibility and styles when the search bar is emptied (optional, but good practice)
        searchBar.addEventListener('blur', function() { // Use blur instead of input for clearing
            const searchTerm = '';  // Empty string to clear all filters
            const artykuly = document.querySelectorAll('.artykul');

            artykuly.forEach(artykul => {
                const paragraphs = artykul.querySelectorAll('p');
                paragraphs.forEach(paragraph => {
                    paragraph.style.visibility = 'visible'; // Restore all paragraph visibility
                    paragraph.style.display = '';  // Reset display to default (block, inline, etc.)
                });

                artykul.style.height = '';
                artykul.style.paddingTop = '';
                artykul.style.paddingBottom = '';
                artykul.style.marginTop = '';
                artykul.style.marginBottom = '';

                // Force reflow using requestAnimationFrame
                requestAnimationFrame(() => {
                    // This empty function triggers a layout recalculation
                });
            });
        });
    } else {
        console.warn("Search bar not found.");
    }

});
