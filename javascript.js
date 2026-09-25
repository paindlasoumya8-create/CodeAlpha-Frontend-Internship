// ===============================
// SELECT ELEMENTS
// ===============================

const galleryItems =
    document.querySelectorAll(".gallery-item");

const filterButtons =
    document.querySelectorAll(".filter-btn");

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxTitle =
    document.getElementById("lightboxTitle");

const lightboxCategory =
    document.getElementById("lightboxCategory");

const imageCounter =
    document.getElementById("imageCounter");

const closeBtn =
    document.getElementById("closeBtn");

const prevBtn =
    document.getElementById("prevBtn");

const nextBtn =
    document.getElementById("nextBtn");


// ===============================
// CURRENT IMAGE
// ===============================

let currentIndex = 0;


// Store visible gallery images
let visibleItems = [...galleryItems];


// ===============================
// OPEN LIGHTBOX
// ===============================

galleryItems.forEach((item, index) => {

    item.addEventListener("click", () => {

        // Find current position among visible images
        visibleItems =
            [...document.querySelectorAll(
                ".gallery-item:not(.hidden)"
            )];

        currentIndex =
            visibleItems.indexOf(item);

        showImage();

        lightbox.classList.add("active");

        document.body.style.overflow = "hidden";
    });

});


// ===============================
// SHOW IMAGE
// ===============================

function showImage() {

    const item =
        visibleItems[currentIndex];

    const image =
        item.querySelector("img");

    const title =
        item.querySelector("h3");

    const category =
        item.querySelector("p");


    lightboxImage.src =
        image.src;

    lightboxImage.alt =
        image.alt;

    lightboxTitle.textContent =
        title.textContent;

    lightboxCategory.textContent =
        category.textContent;

    imageCounter.textContent =
        `${currentIndex + 1} / ${visibleItems.length}`;
}


// ===============================
// NEXT IMAGE
// ===============================

function nextImage() {

    currentIndex++;

    if (currentIndex >= visibleItems.length) {

        currentIndex = 0;
    }

    showImage();
}


// ===============================
// PREVIOUS IMAGE
// ===============================

function previousImage() {

    currentIndex--;

    if (currentIndex < 0) {

        currentIndex =
            visibleItems.length - 1;
    }

    showImage();
}


// ===============================
// BUTTON EVENTS
// ===============================

nextBtn.addEventListener(
    "click",
    nextImage
);

prevBtn.addEventListener(
    "click",
    previousImage
);


// ===============================
// CLOSE LIGHTBOX
// ===============================

function closeLightbox() {

    lightbox.classList.remove("active");

    document.body.style.overflow = "auto";
}

closeBtn.addEventListener(
    "click",
    closeLightbox
);


// Close when clicking background
lightbox.addEventListener(
    "click",
    (event) => {

        if (event.target === lightbox) {

            closeLightbox();
        }
    }
);


// ===============================
// KEYBOARD NAVIGATION
// ===============================

document.addEventListener(
    "keydown",
    (event) => {

        // Escape
        if (
            event.key === "Escape" &&
            lightbox.classList.contains("active")
        ) {

            closeLightbox();
        }


        // Right arrow
        if (
            event.key === "ArrowRight" &&
            lightbox.classList.contains("active")
        ) {

            nextImage();
        }


        // Left arrow
        if (
            event.key === "ArrowLeft" &&
            lightbox.classList.contains("active")
        ) {

            previousImage();
        }

    }
);


// ===============================
// CATEGORY FILTER
// ===============================

filterButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            // Remove active state
            filterButtons.forEach(btn => {

                btn.classList.remove("active");

            });

            // Add active state
            button.classList.add("active");


            const category =
                button.dataset.category;


            galleryItems.forEach(item => {

                const itemCategory =
                    item.dataset.category;


                if (
                    category === "all" ||
                    category === itemCategory
                ) {

                    item.classList.remove("hidden");

                } else {

                    item.classList.add("hidden");
                }

            });

        }
    );

});