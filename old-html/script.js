document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Gallery Data defining contents for each page
    const galleryData = [
        // Page 1
        {
            title: "Caulking Gun",
            date: "Jan - Feb 2026",
            project: "Reverse Engineering",
            imgStyle: "background-image: url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=600');",
            imgClass: "gallery-img",
            infoClass: "gallery-info bg-brown-1",
            tagClass: "v-orange-1"
        },
        {
            title: "Mycroche",
            date: "Sep - Dec 2025",
            project: "Robotic End Effector",
            imgStyle: "",
            imgClass: "gallery-img checkerboard",
            infoClass: "gallery-info bg-brown-2",
            tagClass: "v-orange-2"
        },
        {
            title: "Emori",
            date: "Jan - May 2025",
            project: "Emotionally Sensitive Camera",
            imgStyle: "",
            imgClass: "gallery-img checkerboard",
            infoClass: "gallery-info bg-purple",
            tagClass: "v-fuchsia"
        },
        {
            title: "circl.",
            date: "Feb 2025 - Current",
            project: "Mental Wellbeing",
            imgStyle: "",
            imgClass: "gallery-img checkerboard",
            infoClass: "gallery-info bg-blue",
            tagClass: "v-blue"
        },
        // Page 2
        {
            title: "Hybrid Manufacturing",
            date: "Sep - Oct 2025",
            project: "Research",
            imgStyle: "background-image: url('https://images.unsplash.com/photo-1528312635006-8ea0bc49ce4d?auto=format&fit=crop&q=80&w=600');",
            imgClass: "gallery-img",
            infoClass: "gallery-info bg-brown-1",
            tagClass: "v-orange-1"
        },
        {
            title: "Noor Al Bahar",
            date: "Feb - March 2025",
            project: "Light Fixture",
            imgStyle: "background-image: url('https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=600');",
            imgClass: "gallery-img checkerboard",
            infoClass: "gallery-info bg-brown-2",
            tagClass: "v-orange-2"
        },
        {
            title: "Cascader",
            date: "Sep - Dec 2024",
            project: "Cellular Structures",
            imgStyle: "",
            imgClass: "gallery-img checkerboard",
            infoClass: "gallery-info bg-purple",
            tagClass: "v-fuchsia"
        },
        {
            title: "Ibda",
            date: "May 2025 - Feb 2026",
            project: "UI/UX Intern",
            imgStyle: "",
            imgClass: "gallery-img checkerboard",
            infoClass: "gallery-info bg-blue",
            tagClass: "v-blue"
        },
        // Page 3
        {
            title: "BlackBird",
            date: "Oct - Dec 2025",
            project: "Fashion Film",
            imgStyle: "background-image: url('https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&q=80&w=600');",
            imgClass: "gallery-img",
            infoClass: "gallery-info bg-brown-1",
            tagClass: "v-orange-1"
        },
        {
            title: "Everyday ft.DIDI",
            date: "Jan - May 2025",
            project: "Mixed Media Animation",
            imgStyle: "",
            imgClass: "gallery-img checkerboard",
            infoClass: "gallery-info bg-brown-2",
            tagClass: "v-orange-2"
        },
        {
            title: "DIDI Concept Library",
            date: "Sep - Oct 2024",
            project: "Interactive Archive Platform",
            imgStyle: "background-image: url('https://images.unsplash.com/photo-1550009158-9ebf6d1736eb?auto=format&fit=crop&q=80&w=600');",
            imgClass: "gallery-img",
            infoClass: "gallery-info bg-purple",
            tagClass: "v-fuchsia"
        },
        {
            title: "Turabh",
            date: "Oct - Dec 2024",
            project: "Interactive Awareness Platform",
            imgStyle: "",
            imgClass: "gallery-img checkerboard",
            infoClass: "gallery-info bg-blue",
            tagClass: "v-blue"
        },
        // Page 4
        {
            title: "Heuristics",
            date: "Nov 2023 - Jan 2024",
            project: "Rule Based Design",
            imgStyle: "background-image: url('https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?auto=format&fit=crop&q=80&w=600');",
            imgClass: "gallery-img",
            infoClass: "gallery-info bg-brown-1",
            tagClass: "v-orange-1"
        },
        {
            title: "Logo Collection 1",
            date: "2022 - Current",
            project: "Logo Design",
            imgStyle: "",
            imgClass: "gallery-img checkerboard",
            infoClass: "gallery-info bg-brown-2",
            tagClass: "v-orange-2"
        },
        {
            title: "Collage Collection 1",
            date: "Jun - Aug 2023",
            project: "Conceptual Mixed Media",
            imgStyle: "background-image: url('https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=600');",
            imgClass: "gallery-img",
            infoClass: "gallery-info bg-purple",
            tagClass: "v-fuchsia"
        },
        {
            title: "Poster Collection 1",
            date: "Jun - Aug 2023",
            project: "Experimental Posters",
            imgStyle: "",
            imgClass: "gallery-img checkerboard",
            infoClass: "gallery-info bg-blue",
            tagClass: "v-blue"
        }
    ];

    const itemsPerPage = 4;
    let currentPage = 1;
    const totalPages = Math.ceil(galleryData.length / itemsPerPage);

    const galleryElements = document.querySelectorAll('.gallery-item');
    const pageNumbers = document.querySelectorAll('.page-num');
    const prevBtn = document.getElementById('prev-page-btn');
    const nextBtn = document.getElementById('next-page-btn');

    // Make page numbers have pointer cursors
    pageNumbers.forEach(num => num.style.cursor = 'pointer');

    function renderGallery(page) {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageItems = galleryData.slice(startIndex, endIndex);

        galleryElements.forEach((el, index) => {
            if (index < pageItems.length) {
                const data = pageItems[index];
                el.style.display = ''; // reset to original display

                const imgDiv = el.querySelector('.gallery-img');
                if (imgDiv) {
                    imgDiv.className = data.imgClass;
                    imgDiv.style = data.imgStyle;
                }

                const infoDiv = el.querySelector('.gallery-info');
                if (infoDiv) {
                    infoDiv.className = data.infoClass;
                }

                const title = el.querySelector('.g-title');
                if (title) title.textContent = data.title;

                const vals = el.querySelectorAll('.g-val');
                if (vals.length >= 2) {
                    vals[0].textContent = data.date;
                    vals[1].textContent = data.project;

                    vals[0].className = 'g-val v-white';
                    vals[1].className = `g-val ${data.tagClass}`;
                }

                if (el.tagName.toLowerCase() === 'a') {
                    let filename = 'project-' + data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '') + '.html';
                    el.href = filename;
                }
            } else {
                el.style.display = 'none';
            }
        });

        // Update Pagination Styles
        pageNumbers.forEach((num, ind) => {
            if (ind + 1 === page) {
                num.classList.add('active-num');
                num.classList.remove('hover-num');
            } else {
                num.classList.remove('active-num');
                num.classList.add('hover-num');
            }
        });

        // Update Button Opacity for bounds
        if (prevBtn) {
            if (page === 1) {
                prevBtn.style.opacity = '0.5';
                prevBtn.style.pointerEvents = 'none';
            } else {
                prevBtn.style.opacity = '1';
                prevBtn.style.pointerEvents = 'auto';
            }
        }

        if (nextBtn) {
            if (page === totalPages) {
                nextBtn.style.opacity = '0.5';
                nextBtn.style.pointerEvents = 'none';
            } else {
                nextBtn.style.opacity = '1';
                nextBtn.style.pointerEvents = 'auto';
            }
        }
    }

    // Event Listeners for Page Numbers
    pageNumbers.forEach((num, index) => {
        num.addEventListener('click', () => {
            currentPage = index + 1;
            renderGallery(currentPage);
        });
    });

    // Event Listeners for Arrows
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderGallery(currentPage);
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderGallery(currentPage);
            }
        });
    }

    // Initial Render
    renderGallery(currentPage);
});
