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
// 3. 初始化
// ========================
document.addEventListener("DOMContentLoaded", () => {
  initRevealOnScroll();
  initThumbScroll();
});