export default {
  mounted(el, binding) {
    if (binding.hasOwnProperty('value') && binding.value === false) {
      return;
    }

    const input = el.querySelector('input')
    const textarea = el.querySelector('textarea')
    const select = el.querySelector('select')
    const button = el.querySelector('button')
    let elements = [input, textarea, select, button]
    const focusableElement = elements.find(el => el && el.focus)

    const elementToFocus = focusableElement || el
    const delay = binding.value || 0

    setTimeout(() => {
      elementToFocus?.focus()
    }, delay)
  },
}
