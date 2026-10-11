(() => {
  const dropdown = document.querySelector(".nav-dropdown");
  if (!dropdown) return;

  const summary = dropdown.querySelector("summary");
  const desktopHover = window.matchMedia("(hover: hover) and (pointer: fine)");
  let closeTimer;

  if (desktopHover.matches) {
    dropdown.addEventListener("pointerenter", () => {
      window.clearTimeout(closeTimer);
      dropdown.open = true;
    });

    dropdown.addEventListener("pointerleave", () => {
      closeTimer = window.setTimeout(() => {
        if (!dropdown.contains(document.activeElement)) dropdown.open = false;
      }, 220);
    });

    summary.addEventListener("click", (event) => {
      if (event.detail > 0) {
        event.preventDefault();
        dropdown.open = true;
      }
    });

    document.addEventListener("pointerdown", (event) => {
      if (!dropdown.contains(event.target)) dropdown.open = false;
    });
  }

  dropdown.addEventListener("focusout", (event) => {
    if (!dropdown.contains(event.relatedTarget) && !dropdown.matches(":hover")) {
      dropdown.open = false;
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && dropdown.open) {
      dropdown.open = false;
      summary.focus();
    }
  });
})();