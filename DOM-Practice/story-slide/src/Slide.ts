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
    this.activeIndex = Number(localStorage.getItem("activeSlide")) || 0;
    this.activeSlide = this.slides[this.activeIndex];
    this.timeout = null;
    this.isPaused = false;
    this.pausedTimeout = null;
    this.init();
  }

  hideSlide(slide: Element) {
    slide.classList.remove("active");
    if (slide instanceof HTMLVideoElement) {
      slide.pause();
      slide.currentTime = 0;
    }
  }

  showSlide(index: number) {
    this.activeIndex = index;
    this.activeSlide = this.slides[this.activeIndex];
    localStorage.setItem("activeSlide", String(this.activeIndex));
    this.slides.forEach(this.hideSlide);
    this.activeSlide.classList.add("active");
    if (this.activeSlide instanceof HTMLVideoElement) {
      this.startVideoTimer(this.activeSlide);
    } else {
      this.startTimerToPassTheSlide(this.time);
    }
  }

  startVideoTimer(video: HTMLVideoElement) {
    video.muted = true;
    video.play();
    let isFirstTimePlaying = true;
    video.addEventListener("playing", () => {
      if (isFirstTimePlaying) {
        this.startTimerToPassTheSlide(video.duration * 1000);
      }
      isFirstTimePlaying = false;
    });
  }

  startTimerToPassTheSlide(time: number): void {
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
      if (this.activeSlide instanceof HTMLVideoElement) {
        this.activeSlide.pause();
      }
    }, 300);
  }

  continueSlideTimeout() {
    this.pausedTimeout?.clear();
    if (this.isPaused) {
      this.isPaused = false;
      this.timeout?.continue();
      if (this.activeSlide instanceof HTMLVideoElement) {
        this.activeSlide.play();
      }
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
    this.startTimerToPassTheSlide(this.time);
  }
}
