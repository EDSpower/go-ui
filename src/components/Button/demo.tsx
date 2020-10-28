import React from 'react'
import Button, { ButtonSize, ButtonType } from './button'

const BtnDemo: React.FC = () => {
  return (
    <>
      <Button size={ButtonSize.Large} btnType={ButtonType.Primary}>主要</Button>
      <Button autoFocus onClick={e => {console.log(e)}} >默认</Button>
      <Button disabled>禁用</Button>
      <Button autoFocus size={ButtonSize.Small} btnType={ButtonType.Danger}>危险</Button>
      <Button btnType={ButtonType.Lint}>链接</Button>
      <Button disabled btnType={ButtonType.Lint}>链接</Button>
      <Button href="https://www.baidu.com" btnType={ButtonType.Lint}>跳往百度</Button>
    </>
  )
}

export default BtnDemo