// Helper functions

const getElementById = (id) => {
  return document.getElementById(id);
};

/**
 * @class RandomString
 * @description A class to generate random strings, with throttling and cache support
 * @example
 * const randomString = new RandomString();
 * @param {Object} options - Options to configure the class
 * @param {number} options.frequency - Frequency to generate random strings
 * @param {number} options.length - Length of random strings
 * @returns {RandomString} RandomString instance
 */
class RandomString {
  #characters;
  #cache;
  #lastGenerationTime;
  #frequency;
  #length;
  #cacheLength;

  constructor(
    { frequency, length, cacheLength } = {
      frequency: 500,
      length: 1500,
      cacheLength: 10,
    }
  ) {
    this.#characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    this.#lastGenerationTime = Date.now();
    this.#frequency = frequency;
    this.#length = length;
    this.#cache = [];
    this.#cacheLength = cacheLength;
  }

  _generate() {
    let result = "";

    for (let i = 0; i < this.#length; i++) {
      result += this.#characters[Math.floor(Math.random() * this.#characters.length)];
    }

    this.#cache.push(result);

    return result;
  }

  _getRandomStringFromStore() {
    const randomIndex = Math.floor(Math.random() * this.#cache.length);
    return this.#cache[randomIndex];
  }

  /**
   * @description Returns a random string.
   * The string generation is throttled and cached is used if available.
   * @returns {string} random string
   */
  get() {
    const shouldThrottle =
      Date.now() - this.#lastGenerationTime < this.#frequency && this.#cache.length > 0;

    if (shouldThrottle || this.#cache.length === this.#cacheLength)
      return this._getRandomStringFromStore();

    return this._generate();
  }
}

// Main code

const container = getElementById("container");
const mask = getElementById("mask");
const bgText = getElementById("bg-text");

const maskRadius = 200;

const randomString = new RandomString();

container.addEventListener("mousemove", ({ target, clientX, clientY }) => {
  const { left, top } = target.getBoundingClientRect();
  const x = clientX - left;
  const y = clientY - top;

  bgText.innerText = randomString.get();

  mask.style.opacity = 1;
  mask.style.maskImage = `radial-gradient(circle ${maskRadius}px at ${x}px ${y}px, black, transparent 100%)`;
});

container.addEventListener("mouseleave", () => {
  bgText.innerText = "";
  mask.style.opacity = 0;
});
