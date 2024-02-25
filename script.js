// Helper functions

const getElementById = (id) => {
  return document.getElementById(id);
};

// Main code

const container = getElementById("container");
const mask = getElementById("mask");
const bgText = getElementById("bg-text");

const maskRadius = 200;

container.addEventListener("mousemove", ({ target, clientX, clientY }) => {
  const { left, top } = target.getBoundingClientRect();
  const x = clientX - left;
  const y = clientY - top;

  mask.style.opacity = 1;
  mask.style.maskImage = `radial-gradient(circle ${maskRadius}px at ${x}px ${y}px, black, transparent 100%)`;
});

container.addEventListener("mouseleave", () => {
  bgText.innerText = "";
  mask.style.opacity = 0;
});
