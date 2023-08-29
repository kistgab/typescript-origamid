import Timeout from "./Timeout.js";

export default class Slide {
  container: Element;
  slides: Element[];
  controls: Element;
  time: number;
  activeIndex: number;
  activeSlide: Element;
  timeout: Timeout | null;

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
    this.init();
    this.auto(time);
  }

  hide(slide: Element) {
    slide.classList.remove("active");
  }

  show(index: number) {
    this.slides.forEach(this.hide);
    this.activeIndex = index;
    this.activeSlide = this.slides[this.activeIndex];
    this.activeSlide.classList.add("active");
    this.auto(this.time);
  }

  auto(time: number): void {
    this.timeout?.clear();
    this.timeout = new Timeout(() => this.next(), time);
  }

  next(): void {
    const totalSlides = this.slides.length;
    const realActiveSlidePosition = this.activeIndex + 1;
    const next =
      realActiveSlidePosition < totalSlides ? this.activeIndex + 1 : 0;
    this.show(next);
  }

  prev(): void {
    const prev =
      this.activeIndex > 0 ? this.activeIndex - 1 : this.slides.length - 1;
    this.show(prev);
  }

  private addControls() {
    const prevButton = document.createElement("button");
    prevButton.innerText = "Slide Anterior";
    const nextButton = document.createElement("button");
    nextButton.innerText = "Próximo Slide";
    this.controls.appendChild(prevButton);
    this.controls.appendChild(nextButton);
    nextButton.addEventListener("pointerup", () => this.next());
    prevButton.addEventListener("pointerup", () => this.prev());
  }

  private init() {
    this.addControls();
    this.show(this.activeIndex);
  }
}
