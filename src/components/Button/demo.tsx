import React from 'react'
import Button from './button'

const BtnDemo: React.FC = () => {
  return (
    <>
      <Button size='lg' btnType='primary'>主要</Button>
      <Button autoFocus onClick={e => {console.log(e)}} >默认</Button>
      <Button disabled>禁用</Button>
      <Button autoFocus size='sm' btnType='danger'>危险</Button>
      <Button btnType='lint'>链接</Button>
      <Button disabled btnType='lint'>链接</Button>
      <Button href="https://www.baidu.com" btnType='lint'>跳往百度</Button>
    </>
  )
}

export default BtnDemo