document.addEventListener("DOMContentLoaded", () => {
    const carouselSlide = document.querySelector(".carousel-slide");
    const carouselPrev = document.querySelector(".carousel-prev");
    const carouselNext = document.querySelector(".carousel-next");

    let counter = 1;
    const slideWidth = carouselSlide.clientWidth;
    let isTransitioning = false;

    carouselSlide.style.transform = `translateX(${-slideWidth * counter}px)`;

    carouselNext.addEventListener("click", () => {
        if (counter >= carouselSlide.children.length - 1 || isTransitioning) return;
        carouselSlide.style.transition = "transform 0.5s ease-in-out";
        counter++;
        carouselSlide.style.transform = `translateX(${-slideWidth * counter}px)`;
        isTransitioning = true;
    });

    carouselPrev.addEventListener("click", () => {
        if (counter <= 0 || isTransitioning) return;
        carouselSlide.style.transition = "transform 0.5s ease-in-out";
        counter--;
        carouselSlide.style.transform = `translateX(${-slideWidth * counter}px)`;
        isTransitioning = true;
    });

    carouselSlide.addEventListener("transitionend", () => {
        if (carouselSlide.children[counter].id === "last-clone") {
            carouselSlide.style.transition = "none";
            counter = carouselSlide.children.length - 2;
            carouselSlide.style.transform = `translateX(${-slideWidth * counter}px)`;
        }

        if (carouselSlide.children[counter].id === "first-clone") {
            carouselSlide.style.transition = "none";
            counter = carouselSlide.children.length - counter;
            carouselSlide.style.transform = `translateX(${-slideWidth * counter}px)`;
        }

        isTransitioning = false;
    });
});
