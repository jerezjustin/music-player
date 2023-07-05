export default {
    beforeMount(el: HTMLElement, binding) {
        let iconClass = `fa fa-${binding.value}`

        if (binding.arg === 'full') {
            iconClass = binding.value
        }

        if (binding.modifiers.right) {
            iconClass += ' float-right'
        }

        if (binding.modifiers.green) {
            iconClass += ' text-green-400'
        }

        if (binding.modifiers.yellow) {
            iconClass += ' text-yellow-400'
        }

        if (binding.modifiers.xxl) {
            iconClass += ' text-2xl'
        } else {
            iconClass += ' text-xl'
        }

        el.innerHTML += `<i class="${iconClass}"></i>`
    }
}
