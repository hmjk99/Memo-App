

document.addEventListener("DOMContentLoaded", function() {
    const modal = document.querySelector(".modal");
    const trigger = document.querySelector(".trigger");
    const closeButton = document.querySelector(".close-button");
    function toggleModal() {
        modal.classList.toggle("show-modal");
    }
    trigger.addEventListener("click", toggleModal);
    closeButton.addEventListener("click", toggleModal);
});

