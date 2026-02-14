export function checkMobile(): boolean {
  return 'ontouchstart' in document.documentElement;
}
