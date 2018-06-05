import { VNodeData } from 'vue'

const raf = window && window.requestAnimationFrame
  ? window.requestAnimationFrame.bind(window)
  : ((fn: () => void): void => { setTimeout(fn, 0) })

export function nextFrame(fn: () => void): void {
  raf(() => raf(fn))
}

export function addListener(data: VNodeData | undefined, name: string, fn: Function): VNodeData {
  if (!data) data = {}
  if (!data.on) data.on = {}

  const hook = data.on[name]
  if (!hook) {
    data.on[name] = fn
  } else if (typeof hook === 'function') {
    data.on[name] = [hook, fn]
  } else {
    hook.push(fn)
  }

  return data
}
