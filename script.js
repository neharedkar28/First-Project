const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeLightboxButton = document.getElementById("closeLightbox");
const previewButtons = document.querySelectorAll(".lightbox-trigger");
const touristForm = document.getElementById("touristForm");
const formMessage = document.getElementById("formMessage");
const placeSelect = document.getElementById("place");
const packageSelect = document.getElementById("package");
const packageDetails = document.getElementById("packageDetails");

const packageMap = {
    "Taj Mahal": {
        name: "Royal Heritage",
        duration: "2 days / 1 night",
        price: "Rs. 12,500",
        details: "Includes hotel stay, breakfast, and a local guide in Agra."
    },
    "India Gate": {
        name: "Capital Explorer",
        duration: "2 days / 1 night",
        price: "Rs. 9,800",
        details: "Includes city sightseeing, breakfast, and key landmark visits in Delhi."
    },
    "Himachal Pradesh": {
        name: "Mountain Escape",
        duration: "4 days / 3 nights",
        price: "Rs. 18,900",
        details: "Includes hill stay, local transfers, and scenic mountain sightseeing."
    },
    "Golden Temple, Amritsar": {
        name: "Spiritual Retreat",
        duration: "2 days / 1 night",
        price: "Rs. 8,700",
        details: "Includes hotel stay, breakfast, and local transport in Amritsar."
    },
    "Gateway of India, Mumbai": {
        name: "City and Coast",
        duration: "2 days / 1 night",
        price: "Rs. 11,200",
        details: "Includes city stay, breakfast, and a waterfront sightseeing plan."
    },
    "Kerala": {
        name: "Backwater Bliss",
        duration: "4 days / 3 nights",
        price: "Rs. 21,500",
        details: "Includes houseboat experience, meals, and backwater sightseeing."
    },
    "Jammu and Kashmir": {
        name: "Valley Panorama",
        duration: "5 days / 4 nights",
        price: "Rs. 24,000",
        details: "Includes scenic stay, meals, and transport across key viewpoints."
    },
    "Konkan": {
        name: "Coastal Leisure",
        duration: "3 days / 2 nights",
        price: "Rs. 15,600",
        details: "Includes beach stay, breakfast, and a local fort and coastline tour."
    }
};

function openLightbox(image) {
    if (!lightbox || !lightboxImage || !image) {
        return;
    }

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
}

function closeLightbox() {
    if (!lightbox || !lightboxImage) {
        return;
    }

    lightbox.hidden = true;
    lightboxImage.src = "";
    lightboxImage.alt = "";
    document.body.style.overflow = "";
}

previewButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const image = button.querySelector("img");
        openLightbox(image);
    });
});

if (closeLightboxButton) {
    closeLightboxButton.addEventListener("click", closeLightbox);
}

if (lightbox) {
    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox && !lightbox.hidden) {
        closeLightbox();
    }
});

if (touristForm && formMessage) {
    touristForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(touristForm);
        const name = formData.get("name") || document.getElementById("name").value.trim();
        const phone = formData.get("phone") || document.getElementById("phone").value.trim();
        const place = formData.get("place") || document.getElementById("place").value.trim();
        const selectedPackage = formData.get("package") || "";
        const address = formData.get("address") || document.getElementById("address").value.trim();
        const packageInfo = packageMap[place];

        formMessage.textContent =
            "Booking Confirmed!\n" +
            `Tourist Name: ${name}\n` +
            `Phone Number: ${phone}\n` +
            `Destination: ${place}\n` +
            `Package: ${selectedPackage}\n` +
            `Duration: ${packageInfo ? packageInfo.duration : "Not available"}\n` +
            `Price: ${packageInfo ? packageInfo.price : "Not available"}\n` +
            `Address: ${address}\n\n` +
            "Thank you. We will contact you with your travel details.";
        formMessage.classList.add("is-visible");
        touristForm.reset();
        resetPackageSelection();
    });
}

function updatePackageOptions() {
    if (!placeSelect || !packageSelect || !packageDetails) {
        return;
    }

    const selectedPlace = placeSelect.value;
    const packageInfo = packageMap[selectedPlace];

    packageSelect.innerHTML = '<option value="">Select a package</option>';

    if (!packageInfo) {
        packageDetails.textContent = "Select a place to view the available package.";
        return;
    }

    const option = document.createElement("option");
    option.value = packageInfo.name;
    option.textContent = `${packageInfo.name} - ${packageInfo.price}`;
    packageSelect.appendChild(option);
    packageSelect.value = packageInfo.name;

    packageDetails.textContent = `${packageInfo.duration} | ${packageInfo.price} | ${packageInfo.details}`;
}

function resetPackageSelection() {
    if (!packageSelect || !packageDetails) {
        return;
    }

    packageSelect.innerHTML = '<option value="">Select a package</option>';
    packageDetails.textContent = "Select a place to view the available package.";
}

if (placeSelect) {
    placeSelect.addEventListener("change", updatePackageOptions);
}
