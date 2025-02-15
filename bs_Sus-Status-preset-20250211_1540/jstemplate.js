document.addEventListener("DOMContentLoaded", function () {
    var addButton = document.getElementById("bs_addButton");
    var removeButton = document.getElementById("bs_removeButton");
    var confirmYesButton = document.getElementById("confirm-yes");
    var confirmNoButton = document.getElementById("confirm-no");
    var currentContainer;

    // Count the visible Praktikum cards based on the absence of the "hidden" class
    function setInitialVisibility() {
        var visibleCount = 0;
        var cards = document.querySelectorAll("div.bs_wrapper > div.bs_card");
        cards.forEach(function (card, index) {
            if (!card.classList.contains("hidden")) {
                visibleCount = index + 1;
            }
        });
        return visibleCount;
    }

    // Toggle the visibility of a given container by adding or removing the "hidden" class
    function toggleContainerVisibility(containerNumber, isVisible) {
        var container = document.getElementById("container" + containerNumber);
        if (isVisible) {
            container.classList.remove("hidden");
        } else {
            container.classList.add("hidden");
            // Optionally, clear inputs here if necessary:
            // clearInputsAndSelects(container);
        }
    }

    // Update the remove button visibility: show only if more than one Praktikum card is visible
    function updateRemoveButtonVisibility() {
        removeButton.classList.toggle("hidden", currentContainer <= 1);
    }

    // Set up the add button event listener
    addButton.addEventListener("click", function () {
        var maxContainers = 13; // Update as needed
        if (currentContainer < maxContainers) {
            currentContainer++;
            toggleContainerVisibility(currentContainer, true);
            updateRemoveButtonVisibility();
        }
    });

    // Set up the remove button event listener to show the confirmation window
    removeButton.addEventListener("click", function () {
        if (currentContainer > 1) {
            document.getElementById("confirm-window").classList.remove("hidden");
        }
    });

    // If confirmed, hide the last visible Praktikum card
    confirmYesButton.addEventListener("click", function () {
        toggleContainerVisibility(currentContainer, false);
        currentContainer--;
        updateRemoveButtonVisibility();
        document.getElementById("confirm-window").classList.add("hidden");
    });

    // Cancel removal by hiding the confirmation window
    confirmNoButton.addEventListener("click", function () {
        document.getElementById("confirm-window").classList.add("hidden");
    });

    // Initialize the current container count and update the remove button visibility
    currentContainer = setInitialVisibility();
    updateRemoveButtonVisibility();
});

