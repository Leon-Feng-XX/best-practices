import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import HelloWorld from '../HelloWorld.vue'

describe('helloWorld', () => {
  it('renders the msg prop', () => {
    const wrapper = mount(HelloWorld, { props: { msg: 'hi' } })
    expect(wrapper.text()).toContain('hi')
  })
})
