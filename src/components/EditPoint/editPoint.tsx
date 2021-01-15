import React, { ReactChild, useState, useEffect, useRef } from 'react'
import classes from 'classnames'
import { JsonItem } from './demo'

export interface IeditPointProps {
  jsonData: JsonItem
  children: ReactChild
  /**
   * type 拖拽类型
   * val x,y的偏移量
   */
  onChange: (type: 'position' | PointerType, val: {x: number, y: number}) => void
  /**
   * 保存当前元素的原始数据
   */
  savePreJson: (val: JsonItem) => void
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
  const { children, jsonData, onChange, savePreJson } = props

  const [hover, setHover] = useState(false)

  const [fouce, setFouce] = useState(false)

  const [moveStart, setMoveStart] = useState(false)
  

  const startData = useRef({
    x: 0, // 拖拽开始的鼠标x点
    y: 0, // 拖拽开始的鼠标y点
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
    // console.log('key开始: ', key, moveStart);
    setMoveStart(true)
    startData.current = {
      x: event.clientX,
      y: event.clientY
    }
    savePreJson(jsonData)
    setFouce(true)
  }
  // 鼠标移动事件
  const onMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, key: 'position' | PointerType) => {
    event.persist()
    event.stopPropagation()
    
    if (!moveStart) { return }
    // console.log('key移动: ', key, moveStart);

    // 鼠标拖拽移动的x距离
    const moveX = event.clientX - startData.current.x
    // 鼠标拖拽移动的y距离
    const moveY = event.clientY - startData.current.y

    const options = {
      x: moveX,
      y: moveY,
    }

    onChange(key, options)

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
