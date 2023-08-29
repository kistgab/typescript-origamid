export default class Slide {
    container;
    slides;
    controls;
    time;
    activeIndex;
    activeSlide;
    constructor(container, slides, controls, time = 5000) {
        this.container = container;
        this.slides = slides;
        this.controls = controls;
        this.time = time;
        this.activeIndex = 0;
        this.activeSlide = this.slides[this.activeIndex];
        this.init();
    }
    hide(slide) {
        slide.classList.remove("active");
    }
    show(index) {
        this.slides.forEach(this.hide);
        this.activeIndex = index;
        this.activeSlide = this.slides[this.activeIndex];
        this.activeSlide.classList.add("active");
    }
    next() {
        const totalSlides = this.slides.length;
        const realActiveSlidePosition = this.activeIndex + 1;
        const next = realActiveSlidePosition < totalSlides ? this.activeIndex + 1 : 0;
        this.show(next);
    }
    prev() {
        const prev = this.activeIndex > 0 ? this.activeIndex - 1 : this.slides.length - 1;
        this.show(prev);
    }
    addControls() {
        const prevButton = document.createElement("button");
        prevButton.innerText = "Slide Anterior";
        const nextButton = document.createElement("button");
        nextButton.innerText = "Próximo Slide";
        this.controls.appendChild(prevButton);
        this.controls.appendChild(nextButton);
        nextButton.addEventListener("pointerup", () => this.next());
        prevButton.addEventListener("pointerup", () => this.prev());
    }
    init() {
        this.addControls();
        this.show(this.activeIndex);
    }
}
//# sourceMappingURL=Slide.js.map