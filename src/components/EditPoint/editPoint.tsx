import React, { ReactChild, useState, useEffect, useRef } from 'react'
import classes from 'classnames'
import { JsonItem } from './demo'

export interface IeditPointProps {
  ceng: number
  jsonData: JsonItem
  children: ReactChild
  onChange: (type: any,val: any, ceng: number) => void
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
export const EditPoint: React.FC<IeditPointProps> = (props) => {
  const { children, jsonData, ceng, onChange } = props

  const [hover, setHover] = useState(false)

  const [fouce, setFouce] = useState(false)

  const [moveStart, setMoveStart] = useState(false)
  

  const startData = useRef({
    x: 0, // 拖拽开始的鼠标x点
    y: 0, // 拖拽开始的鼠标y点
    eleX: 0, // 元素原来的x点
    eleY: 0 // 元素原来的y点
  })

  const editRef = useRef<HTMLDivElement>()

  // 注册画布点击事件，判断鼠标点击是否在元素上面
  useEffect(() => {
    let shadeDom = document.querySelector('.edit-demo')
    const handle = (event: Event | any) => {
      let flag = false
      const classNames: string[] = event.path.map((val: any) => val.className)
      for (const item of classNames) {
        if (item && item.indexOf('edit-point-wrap') !== -1) {
          flag = true
          break
        }
      }
      setFouce(flag)
    }
    shadeDom && shadeDom.addEventListener('click', handle)
    return () => {
      shadeDom && shadeDom.removeEventListener('click', handle)
    }
  }, [])

  const onMouseOver = () => {
    setHover(true)
  }
  const onMouseLeave = () => {
    setHover(false)
  }

  // 鼠标点击事件
  const onMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, key: string) => {
    event.persist()
    event.stopPropagation()
    setMoveStart(true)
    console.log('key: ', key);
    const ele = editRef.current as HTMLDivElement
    startData.current = {
      x: event.clientX,
      y: event.clientY,
      eleX: ele.offsetLeft,
      eleY: ele.offsetTop,
    }
    setFouce(true)
  }
  // 鼠标移动事件
  const onMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, key: 'position' | PointerType) => {
    event.persist()
    event.stopPropagation()
    console.log('key: ', key);

    if (!moveStart) { return }

    // 鼠标拖拽移动的x距离
    const moveX = event.clientX - startData.current.x
    // 鼠标拖拽移动的y距离
    const moveY = event.clientY - startData.current.y


    // console.log('moveX: ', moveX, startData.current.eleX + moveX);
    // console.log('moveY: ', moveY, startData.current.eleY + moveY);
    if (key === 'position') {
      // 计算后的left，top
      const nowLeft = startData.current.eleX + moveX
      const nowTop = startData.current.eleY + moveY
      const position = {
        left: nowLeft,
        top: nowTop
      }
      onChange('position', position, ceng)
    } else if (key === 's' || key === 'n') {
      
    }



  }
  // 鼠标抬起事件
  const onMouseUp = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, key: string) => {
    console.log('onMouseUp: 放开了');
    setMoveStart(false)
  }

  const wrapClasses = classes('edit-point-wrap', {
    hover: hover || fouce,
    fouce
  })

  const eleStyle = () => {
    const style = {
      left: jsonData.left + 'px',
      top: jsonData.top + 'px'
    }
    return style
  }

  return (
    <div
      ref={(ele: HTMLDivElement) => editRef.current = ele}
      style={eleStyle()}
      onMouseDown={(event) => onMouseDown(event, 'position')}
      onMouseMove={(event) => onMouseMove(event, 'position')}
      onMouseUp={(event) => onMouseUp(event, 'position')}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      className={wrapClasses}
    >
      {fouce && PointerList.map(ele => (
        <div
          key={ele}
          onMouseDown={(event) => onMouseDown(event, ele)}
          onMouseMove={(event) => onMouseMove(event, ele)}
          onMouseUp={(event) => onMouseUp(event, ele)}
          className={`poin-item ${ele}`}
        />
      ))}
      {children}
    </div>
  )
}
