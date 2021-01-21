import React, { ReactChild, useState, useEffect, memo } from 'react'
import classes from 'classnames'
import { JsonItem } from './demo'

export interface IeditPointProps {
  jsonData: JsonItem
  children: ReactChild
  saveType: (type: 'position' | PointerType) => void
}

export type PointerType = 'n' | 's' | 'w' | 'e' | 'wn' | 'en' | 'ws' | 'es'


const PointerList: PointerType[] = [
  'n', // 上
  's', // 下
  'w', // 左
  'e', // 右
  'wn', // 左上
  'en', // 右上
  'ws', // 左下
  'es' // 右下
]

// 编辑拖拽组件
const EditPoint: React.FC<IeditPointProps> = (props) => {
  const { children, jsonData, saveType } = props

  const [hover, setHover] = useState(false)

  const [fouce, setFouce] = useState(false)

  // 注册画布点击事件，判断鼠标点击是否在元素上面
  useEffect(() => {
    let shadeDom = document.querySelector('.edit-demo')
    const handle = (event: Event | any) => {
      let flag = false
      const classNames: string[] = event.path.map((val: any) => val.className)
      for (const item of classNames) {
        if (item && item.indexOf(`edit_${jsonData.uuid}`) !== -1) {
          flag = true
          break
        }
      }
      setFouce(flag)
    }
    shadeDom && shadeDom.addEventListener('mousedown', handle)
    return () => {
      shadeDom && shadeDom.removeEventListener('mousedown', handle)
    }
  }, [jsonData.uuid])

  const onMouseOver = () => {
    setHover(true)
  }
  const onMouseLeave = () => {
    setHover(false)
  }

  const wrapClasses = classes('edit-point-wrap', {
    hover: hover || fouce,
    fouce,
    [`edit_${jsonData.uuid}`]: true
  })

  const eleStyle = () => {
    const style = {
      left: jsonData.left + 'px',
      top: jsonData.top + 'px',
      zIndex: jsonData.uuid
    }
    return style
  }

  const onMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, type: 'position' | PointerType) =>{
    saveType(type)
  }

  return (
    <div
      className={wrapClasses}
      onMouseDownCapture={(event) => onMouseDown(event, 'position')}
      style={eleStyle()}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
    >
      {fouce && PointerList.map(ele => (
        <div
          key={ele}
          onMouseDownCapture={(event) => onMouseDown(event, ele)}
          className={`poin-item ${ele}`}
        />
      ))}
      {children}
    </div>
  )
}

export default memo(EditPoint)