/**
 * Takes an element and subtracts its vertical size from the screen size to
 * return the remaining vertical space (height) on the screen.
 *
 * @param otherElement The HTML element already taking up space on the screen
 * @returns
 */
export const getRemainingVerticalHeight = (otherElement: HTMLElement) => {
	return window.screen.height - otherElement.offsetHeight;
};
