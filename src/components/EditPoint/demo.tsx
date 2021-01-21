import React, { useState, useRef, useEffect, useCallback } from 'react'
import EditPoint, { PointerType } from './editPoint'
import { Button } from '../Button/button'

const demoStyle: React.CSSProperties = {
  width: '375px',
  height: '900px',
  margin: '300px auto 0',
  backgroundColor: '#eee',
  position: 'relative'
}

export interface JsonItem {
  uuid: number
  width: number
  height: number
  left: number
  top: number
  bgColor: string
  value: number
}

// 当前被选中的元素
let preJson = {} as JsonItem

let poinerType = '' as 'position' | PointerType

const EditDemo: React.FC = () => {


  const [ jsonList, setJsonList ] = useState<JsonItem[]>([])

  const startRef = useRef<boolean>(false)

  const startData = useRef({
    x: 0, // 拖拽开始的鼠标x点
    y: 0, // 拖拽开始的鼠标y点
  })

  const onChangeEle = useCallback((val: {x: number, y: number}) => {

    if (Object.keys(preJson).length === 0) { return }
    
    const newList = [...jsonList]

    // 根据拖拽点不同计算不同的属性
    switch (poinerType) {
      case 'position':
        let item1 = newList.find( e => e.uuid === preJson.uuid)
        if (!item1) { return }
        // 要修改的数据
        item1.left = preJson.left + val.x
        item1.top = preJson.top + val.y

        break;
        case 's':
          let item2 = newList.find( e => e.uuid ===  preJson.uuid)
          if (!item2) { return }
          // 要修改的数据
          item2.height = preJson.height + val.y
          break
        case 'n':
          let item3 = newList.find( e => e.uuid ===  preJson.uuid)
          if (!item3) { return }
          // 要修改的数据
          item3.height = preJson.height - val.y
          item3.top = preJson.top + val.y
          break
        case 'e':
          let item4 = newList.find( e => e.uuid ===  preJson.uuid)
          if (!item4) { return }
          // 要修改的数据
          item4.width = preJson.width + val.x
          break
        case 'w':
          let item5 = newList.find( e => e.uuid ===  preJson.uuid)
          if (!item5) { return }
          // 要修改的数据
          item5.width = preJson.width - val.x
          item5.left = preJson.left + val.x
          break
        case 'es':
          let item6 = newList.find( e => e.uuid ===  preJson.uuid)
          if (!item6) { return }
          // 要修改的数据
          item6.width = preJson.width + val.x
          item6.height = preJson.width + val.y
          break
        case 'ws':
          let item7 = newList.find( e => e.uuid ===  preJson.uuid)
          if (!item7) { return }
          // 要修改的数据
          item7.width = preJson.width - val.x
          item7.height = preJson.width + val.y
          item7.left = preJson.left + val.x
          break
        case 'en':
          let item8 = newList.find( e => e.uuid ===  preJson.uuid)
          if (!item8) { return }
          // 要修改的数据
          item8.width = preJson.width + val.x
          item8.height = preJson.height - val.y
          item8.top = preJson.top + val.y
          break
        case 'wn':
          let item9 = newList.find( e => e.uuid ===  preJson.uuid)
          if (!item9) { return }
          // 要修改的数据
          item9.width = preJson.width - val.x
          item9.height = preJson.height - val.y
          item9.top = preJson.top + val.y
          item9.left = preJson.left + val.x
          break
    
      default:
        break;
    }
    
    setJsonList(newList)
  }, [jsonList]) 

  // 鼠标点击事件
  const onMouseDown = (event: MouseEvent) => {
    event.stopPropagation()
    startRef.current = true
    startData.current = {
      x: event.clientX,
      y: event.clientY
    }
  }

  // 鼠标移动事件
  const onMouseMove = useCallback((event: MouseEvent) => {
    // event.persist()
    event.stopPropagation()
    
    if (!startRef.current) { return }
    // console.log('key移动: ', key, moveStart);

    // 鼠标拖拽移动的x距离
    const moveX = event.clientX - startData.current.x
    // 鼠标拖拽移动的y距离
    const moveY = event.clientY - startData.current.y

    const options = {
      x: moveX,
      y: moveY,
    }

    onChangeEle(options)

  }, [onChangeEle]) 

  // 鼠标抬起事件
  const onMouseUp = (event: any) => {
    startRef.current = false
    preJson = {} as JsonItem
  }

  useEffect(() => {
    console.log('注册了');
    
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    return () => {
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [onMouseMove])
  
  const addOne = () => {
    console.log('addOne: ');
    const item = {
      uuid: jsonList.length,
      width: 100,
      height: 100,
      left: 100,
      top: 100,
      bgColor: 'pink',
      value: Math.random()
    }
    setJsonList(old => ([...old,item]))
  }

  const savePreJson = (json: JsonItem, type: 'position' | PointerType) =>{
    console.log('type: ', type);
    console.log('json: ', json);
    preJson = {...json}
    poinerType = type
  }


  return (
    <div
      style={demoStyle}
      className='edit-demo'
    >
      {jsonList.map((e, i) => (
        <EditPoint
          saveType={(type) => savePreJson(e, type)}
          key={i}
          jsonData={e}
        >
          <div
            style={{
              width: e.width + 'px',
              height: e.height + 'px',
              backgroundColor: e.bgColor
            }}
          >
            {e.value}
          </div>
        </EditPoint>
      ))}
      <div style={{position: 'absolute', top: '-100px'}}>
        <Button onClick={addOne}>点击添加元素</Button>
      </div>
    </div>
  )
}

export default EditDemo