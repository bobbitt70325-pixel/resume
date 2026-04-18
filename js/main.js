const featuresSection = document.getElementById("features");

if (featuresSection) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          featuresSection.classList.add("is-visible");
          observer.unobserve(featuresSection);
        }
      });
    },
    { threshold: 0.2 }
  );

  observer.observe(featuresSection);
}