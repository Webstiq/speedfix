const faqItems = document.querySelectorAll(".faq-item");

// Open answer
const openFaq = (item) => {
    const answer = item.querySelector(".faq-answer");
    const button = item.querySelector(".faq-question");
    const icon = item.querySelector(".faq-question-icon i");

    answer.classList.add("faq-answer--active");
    button.setAttribute("aria-expanded", "true");
    answer.setAttribute("aria-hidden", "false");

    icon.classList.remove("fa-caret-down");
    icon.classList.add("fa-caret-up");

};

// Close answer
const closeFaq = (item) => {
    const answer = item.querySelector(".faq-answer");
    const button = item.querySelector(".faq-question");
    const icon = item.querySelector(".faq-question-icon i");

    answer.classList.remove("faq-answer--active");
    button.setAttribute("aria-expanded", "false");
    answer.setAttribute("aria-hidden", "true");

    icon.classList.remove("fa-caret-up");
    icon.classList.add("fa-caret-down");
};

// Function to manage the open/close of the answer
const toggleFaq = (item) => {
    const isOpen = item.querySelector(".faq-answer").classList.contains("faq-answer--active");

    faqItems.forEach(otherItem => {
        if (otherItem !== item) {
            closeFaq(otherItem); // Zamknij wszystkie inne
        }
    });

    if (isOpen) {
        closeFaq(item);
    } else {
        openFaq(item);
    }
};

// Close all answers when click on close button
function closeAnswer() {
    faqItems.forEach(item => {
        closeFaq(item);
    });
}


// Open answer when click on question
faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");
    question.addEventListener("click", () => toggleFaq(item));
});

// Close answer when click outside of it
document.addEventListener("click", (event) => {
    const isClickInsideFaq = [...faqItems].some(item => item.contains(event.target));

    if (!isClickInsideFaq) {
        closeAnswer();
    }
});

//Escape when answer is open
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeAnswer();
    }
});
