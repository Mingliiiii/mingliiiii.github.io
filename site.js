(() => {
  "use strict";

  const themeToggle = document.querySelector("#theme-toggle");
  themeToggle?.addEventListener("click", () => {
    const current = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    const next = current === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("mingli-theme", next);
    } catch (_) {}
  });

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const starColors = ["#ffd43b", "#ffec8b", "#ffffff", "#f2c9a7", "#c7b9ff", "#6ebcff"];
  let lastTrailTime = 0;

  const spawnStar = (x, y, isTrail) => {
    const star = document.createElement("span");
    const angle = Math.random() * Math.PI * 2;
    const distance = isTrail ? 18 + Math.random() * 34 : 52 + Math.random() * 84;

    star.className = `star-particle ${isTrail ? "star-particle--trail" : "star-particle--burst"}`;
    star.textContent = "★";
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
    star.style.color = starColors[Math.floor(Math.random() * starColors.length)];
    star.style.fontSize = isTrail ? `${5 + Math.random() * 7}px` : `${9 + Math.random() * 11}px`;
    star.style.setProperty("--star-x", `${Math.cos(angle) * distance}px`);
    star.style.setProperty("--star-y", `${Math.sin(angle) * distance}px`);
    star.style.setProperty("--star-r", `${Math.random() * 620 - 310}deg`);

    document.body.appendChild(star);
    window.setTimeout(() => star.remove(), isTrail ? 820 : 1280);
  };

  document.addEventListener("pointermove", (event) => {
    if (event.pointerType === "touch" || reducedMotion.matches) return;
    const now = performance.now();
    if (now - lastTrailTime < 42) return;
    lastTrailTime = now;
    spawnStar(event.clientX, event.clientY, true);
  }, { passive: true });

  document.addEventListener("touchmove", (event) => {
    if (reducedMotion.matches || event.touches.length === 0) return;
    const now = performance.now();
    if (now - lastTrailTime < 58) return;
    lastTrailTime = now;
    const touch = event.touches[0];
    spawnStar(touch.clientX, touch.clientY - 12, true);
  }, { passive: true });

  document.addEventListener("click", (event) => {
    if (reducedMotion.matches) return;
    const count = 10 + Math.floor(Math.random() * 5);
    for (let index = 0; index < count; index += 1) {
      window.setTimeout(() => spawnStar(event.clientX, event.clientY, false), index * 14);
    }
  });
})();
