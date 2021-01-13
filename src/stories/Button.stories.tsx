import React from 'react'
import { Button, ButtonProps } from '../components/Button/button'
import { Story, Meta } from '@storybook/react'

export default {
  title: 'Example/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta

const Template: Story<ButtonProps> = (args) => (
  <Button {...args}>默认</Button>
)

export const Default = Template.bind({})
Default.args = {
  btnType: 'default',
  className: '123',
  onclick: () => {
    alert('点击了')
  }
}

export const Primary = Template.bind({})
Primary.args = {
  btnType: 'primary',
  btnSize: 'lg'
}


export const Danger = Template.bind({})
Danger.args = {
  btnType: 'danger',
}

export const Lint = Template.bind({})
Lint.args = {
  btnType: 'lint',
  href: 'www.baidu.com'
}

