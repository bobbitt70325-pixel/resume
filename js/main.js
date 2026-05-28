// ========================
// 1. 區塊淡入動畫
// ========================
function initRevealOnScroll() {
  const featuresSection = document.getElementById("features");

  if (!featuresSection) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          featuresSection.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  observer.observe(featuresSection);
}


// ========================
// 2. 縮圖左右滑動
// ========================
function initThumbScroll() {
  const container = document.getElementById("thumbScroll");
  const btnLeft = document.querySelector(".scroll-btn.left");
  const btnRight = document.querySelector(".scroll-btn.right");

  if (!container || !btnLeft || !btnRight) return;

  btnLeft.addEventListener("click", () => {
    container.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  });

  btnRight.addEventListener("click", () => {
    container.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  });
}


// ========================
// 3. 產品作品無限輪播
// ========================
function initProductSlider() {
  const track = document.getElementById("sliderTrack");

  if (!track) return;

  const slides = document.querySelectorAll(".product-slide");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");
  const currentPage = document.getElementById("currentPage");

  if (!slides.length || !nextBtn || !prevBtn) return;

  let currentIndex = 1;
  let isAnimating = false;

  const animationTime = 1000;
  const realSlideCount = slides.length - 2;

  function getGap() {
    return window.innerWidth <= 900 ? 42 : 90;
  }

  function updatePage() {
    let page = currentIndex;

    if (currentIndex === 0) {
      page = realSlideCount;
    }

    if (currentIndex === slides.length - 1) {
      page = 1;
    }

    if (currentPage) {
      currentPage.textContent = String(page).padStart(2, "0");
    }
  }

  function clearActive() {
    slides.forEach((slide) => {
      slide.classList.remove("is-active");
    });
  }

  function setActive() {
    clearActive();

    setTimeout(() => {
      slides[currentIndex].classList.add("is-active");
    }, 90);
  }

  function moveSlider(transition = true) {
    const slideWidth = slides[0].offsetWidth;
    const gap = getGap();

    const moveDistance = currentIndex * (slideWidth + gap);
    const centerPosition = window.innerWidth / 2 - slideWidth / 2;

    track.style.transition = transition
      ? `transform ${animationTime}ms cubic-bezier(.76, 0, .24, 1)`
      : "none";

    track.style.transform = `
      translateY(-50%)
      translateX(${centerPosition - moveDistance}px)
    `;

    updatePage();
  }

  function resetTransition() {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        track.style.transition =
          `transform ${animationTime}ms cubic-bezier(.76, 0, .24, 1)`;
      });
    });
  }

  function nextSlide() {
    if (isAnimating) return;

    isAnimating = true;

    clearActive();
    track.classList.add("is-moving");

    currentIndex++;
    moveSlider(true);

    setTimeout(() => {
      if (currentIndex === slides.length - 1) {
        track.style.transition = "none";
        currentIndex = 1;
        moveSlider(false);
        resetTransition();
      }

      track.classList.remove("is-moving");
      setActive();

      setTimeout(() => {
        isAnimating = false;
      }, 160);
    }, animationTime);
  }

  function prevSlide() {
    if (isAnimating) return;

    isAnimating = true;

    clearActive();
    track.classList.add("is-moving");

    currentIndex--;
    moveSlider(true);

    setTimeout(() => {
      if (currentIndex === 0) {
        track.style.transition = "none";
        currentIndex = slides.length - 2;
        moveSlider(false);
        resetTransition();
      }

      track.classList.remove("is-moving");
      setActive();

      setTimeout(() => {
        isAnimating = false;
      }, 160);
    }, animationTime);
  }

  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  moveSlider(false);
  setActive();
  resetTransition();

  window.addEventListener("resize", () => {
    moveSlider(false);
    resetTransition();
  });
}


// ========================
// 4. 初始化全部功能
// ========================
document.addEventListener("DOMContentLoaded", () => {
  initRevealOnScroll();
  initThumbScroll();
  initProductSlider();
});