/**
 * Utility function to create a typing effect
 * Types out text character by character with a smooth animation
 */

/**
 * Types out text with a typing effect
 * @param {string} fullText - The complete text to type out
 * @param {Function} onUpdate - Callback function called with each update (receives current text)
 * @param {number} speed - Typing speed in milliseconds per character (default: 20)
 * @returns {Function} - Function to stop the typing effect
 */
export function typeText(fullText, onUpdate, speed = 20) {
  let currentIndex = 0;
  let isStopped = false;

  function typeNext() {
    if (isStopped || currentIndex >= fullText.length) {
      return;
    }

    const currentChar = fullText[currentIndex];
    const textToShow = fullText.substring(0, currentIndex + 1);
    onUpdate(textToShow);
    
    currentIndex += 1;

    // Calculate delay - variable for more natural feel
    let delay = speed;
    
    // Adjust speed based on character type for natural typing rhythm
    if (currentChar === ' ') {
      delay = speed * 0.3; // Much faster on spaces
    } else if (currentChar === '.' || currentChar === '!' || currentChar === '?') {
      delay = speed * 3; // Longer pause on sentence endings
    } else if (currentChar === ',') {
      delay = speed * 2; // Medium pause on commas
    } else if (currentChar === '\n') {
      delay = speed * 1.5; // Small pause on new lines
    } else {
      // Normal characters - slight variation for natural feel
      delay = speed + (Math.random() * 10 - 5); // ±5ms variation
    }

    // Ensure minimum delay
    delay = Math.max(delay, 5);

    if (currentIndex < fullText.length) {
      setTimeout(typeNext, delay);
    }
  }

  // Start typing
  typeNext();

  // Return stop function
  return () => {
    isStopped = true;
  };
}

