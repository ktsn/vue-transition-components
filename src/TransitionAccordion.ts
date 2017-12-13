import Vue, { FunctionalComponentOptions, PropOptions } from 'vue'
import { nextFrame, addListener } from './utils'

export default {
  name: 'TransitionAccordion',
  functional: true,

  props: {
    duration: Number,
    easing: String
  },

  render(h, { data, props, children }) {
    addListener(data, 'enter', enter(props.duration, props.easing))
    addListener(data, 'after-enter', afterEnter)
    addListener(data, 'leave', leave(props.duration, props.easing))
    addListener(data, 'after-leave', afterLeave)

    return h('transition', data, children)
  }
} as FunctionalComponentOptions

function enter(duration: number | undefined, easing: string | undefined) {
  return (el: HTMLElement): void => {
    const s = el.style
    s.height = ''
    const height = el.scrollHeight

    s.overflow = 'hidden'
    s.height = '0'
    s.transitionDuration = duration ? duration + 'ms' : ''
    s.transitionTimingFunction = easing || ''

    nextFrame(() => {
      s.height = height + 'px'
    })
  }
}

function afterEnter(el: HTMLElement): void {
  const s = el.style
  s.overflow = s.height = s.transitionDuration = s.transitionTimingFunction = ''
}

function leave(duration: number | undefined, easing: string | undefined) {
  return (el: HTMLElement): void => {
    const s = el.style
    s.overflow = 'hidden'
    s.height = el.scrollHeight + 'px'
    s.transitionDuration = duration ? duration + 'ms' : ''
    s.transitionTimingFunction = easing || ''

    nextFrame(() => {
      s.height = '0'
    })
  }
}

function afterLeave(el: HTMLElement): void {
  const s = el.style
  s.overflow = s.height = s.transitionDuration = s.transitionTimingFunction = ''
}
