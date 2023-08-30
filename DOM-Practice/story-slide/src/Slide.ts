import Timeout from "./Timeout.js";

export default class Slide {
  container: Element;
  slides: Element[];
  controls: Element;
  time: number;
  activeIndex: number;
  activeSlide: Element;
  timeout: Timeout | null;
  isPaused: boolean;
  pausedTimeout: Timeout | null;

  constructor(
    container: Element,
    slides: Element[],
    controls: Element,
    time: number = 5000
  ) {
    this.container = container;
    this.slides = slides;
    this.controls = controls;
    this.time = time;
    this.activeIndex = 0;
    this.activeSlide = this.slides[this.activeIndex];
    this.timeout = null;
    this.isPaused = false;
    this.pausedTimeout = null;
    this.init();
  }

  hideSlide(slide: Element) {
    slide.classList.remove("active");
  }

  showSlide(index: number) {
    this.slides.forEach(this.hideSlide);
    this.activeIndex = index;
    this.activeSlide = this.slides[this.activeIndex];
    this.activeSlide.classList.add("active");
    this.startTimerToPassTheSlides(this.time);
  }

  startTimerToPassTheSlides(time: number): void {
    this.timeout?.clear();
    this.timeout = new Timeout(() => this.goToNextSlide(), time);
  }

  goToNextSlide(): void {
    if (this.isPaused) return;
    const totalSlides = this.slides.length;
    const realActiveSlidePosition = this.activeIndex + 1;
    const next =
      realActiveSlidePosition < totalSlides ? this.activeIndex + 1 : 0;
    this.showSlide(next);
  }

  goToPreviousSlide(): void {
    const prev =
      this.activeIndex > 0 ? this.activeIndex - 1 : this.slides.length - 1;
    this.showSlide(prev);
  }

  pauseSlideTimeout(): void {
    this.pausedTimeout = new Timeout(() => {
      this.timeout?.pause();
      this.isPaused = true;
    }, 300);
  }

  continueSlideTimeout() {
    this.pausedTimeout?.clear();
    if (this.isPaused) {
      this.isPaused = false;
      this.timeout?.continue();
    }
  }

  private addControls() {
    const prevButton = document.createElement("button");
    prevButton.innerText = "Slide Anterior";
    const nextButton = document.createElement("button");
    nextButton.innerText = "Próximo Slide";
    this.controls.appendChild(prevButton);
    this.controls.appendChild(nextButton);
    this.controls.addEventListener("pointerdown", () =>
      this.pauseSlideTimeout()
    );
    this.controls.addEventListener("pointerup", () =>
      this.continueSlideTimeout()
    );
    nextButton.addEventListener("pointerup", () => this.goToNextSlide());
    prevButton.addEventListener("pointerup", () => this.goToPreviousSlide());
  }

  private init() {
    this.addControls();
    this.showSlide(this.activeIndex);
    this.startTimerToPassTheSlides(this.time);
  }
}
