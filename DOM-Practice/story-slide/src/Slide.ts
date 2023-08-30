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
  thumbItems: HTMLElement[] | null;
  activeThumb: HTMLElement | null;

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
    this.thumbItems = null;
    this.activeThumb = null;
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
    if (this.thumbItems) {
      this.activeThumb = this.thumbItems[this.activeIndex];
      this.thumbItems.forEach((thumbItem) =>
        thumbItem.classList.remove("active")
      );
      this.activeThumb.classList.add("active");
    }
    this.slides.forEach(this.hideSlide);
    this.activeSlide.classList.add("active");
    if (this.activeSlide instanceof HTMLVideoElement) {
      this.startVideoTimerToPassTheSlide(this.activeSlide);
    } else {
      this.startTimerToPassTheSlide(this.time);
    }
  }

  startVideoTimerToPassTheSlide(video: HTMLVideoElement) {
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
    if (this.activeThumb) {
      this.activeThumb.style.animationDuration = `${time}ms`;
    }
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

  pauseSlide(): void {
    document.body.classList.add("paused");
    this.pausedTimeout = new Timeout(() => {
      this.timeout?.pause();
      this.isPaused = true;
      this.activeThumb?.classList.add("paused");
      if (this.activeSlide instanceof HTMLVideoElement) {
        this.activeSlide.pause();
      }
    }, 300);
  }

  continueSlide() {
    document.body.classList.remove("paused");
    this.pausedTimeout?.clear();
    if (this.isPaused) {
      this.isPaused = false;
      this.timeout?.continue();
      this.activeThumb?.classList.remove("paused");
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
    this.controls.addEventListener("pointerdown", () => this.pauseSlide());
    document.addEventListener("pointerup", () => this.continueSlide());
    document.addEventListener("touchend", () => this.continueSlide());
    nextButton.addEventListener("pointerup", () => this.goToNextSlide());
    prevButton.addEventListener("pointerup", () => this.goToPreviousSlide());
  }

  private addThumbItems() {
    const thumbContainer = document.createElement("div");
    thumbContainer.id = "slide-thumb";
    this.slides.forEach(() => {
      thumbContainer.innerHTML += `<span ><span class="thumb-item"></span></span>`;
    });
    this.controls.appendChild(thumbContainer);
    this.thumbItems = Array.from(document.querySelectorAll(".thumb-item"));
  }

  private init() {
    this.addControls();
    this.addThumbItems();
    this.showSlide(this.activeIndex);
  }
}
