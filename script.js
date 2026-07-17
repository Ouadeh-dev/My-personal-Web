const revealElements = document.querySelectorAll('.reveal');
const skillFills = document.querySelectorAll('.skill-fill');
const buttons = document.querySelectorAll('.button');

const revealOnScroll = () => {
  const windowHeight = window.innerHeight;
  revealElements.forEach((el) => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight * 0.85) {
      el.classList.add('active');

      const fills = el.querySelectorAll('.skill-fill');
      fills.forEach((fill) => {
        const value = fill.dataset.fill;
        if (value) {
          fill.style.width = `${value}%`;
        }
      });
    }
  });
};

const animateButton = (button) => {
  button.classList.add('button-click');
  setTimeout(() => button.classList.remove('button-click'), 180);
};

buttons.forEach((button) => {
  button.addEventListener('click', (event) => {
    animateButton(button);

    if (button.hash) {
      event.preventDefault();
      const target = document.querySelector(button.hash);
      if (target) {
        window.scrollTo({ top: target.offsetTop - 20, behavior: 'smooth' });
      }
    }
  });
});

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);
