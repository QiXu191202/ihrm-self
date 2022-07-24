// 开发的指令
export const imageError = {
    inserted(el, binding) {
        el.onerror = function () {
            el.src = binding.value
        }
    }
}

export const aa = {}
export const bb = {}