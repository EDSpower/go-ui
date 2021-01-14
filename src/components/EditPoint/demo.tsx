import React, { useState, useEffect } from 'react'
import { EditPoint } from './editPoint'
import { Button } from '../Button/button'

const demoStyle: React.CSSProperties = {
  width: '375px',
  height: '900px',
  margin: '0 auto',
  backgroundColor: '#eee',
  position: 'relative'
}

export interface JsonItem {
  width: number
  height: number
  left: number
  top: number
  bgColor: string
  value: number
}

const EditDemo: React.FC = () => {

  const [ jsonList, setJsonList ] = useState<JsonItem[]>([])
  
  const addOne = () => {
    console.log('addOne: ');
    const item = {
      width: 100,
      height: 100,
      left: 100,
      top: 100,
      bgColor: 'pink',
      value: Math.random()
    }
    setJsonList(old => ([...old,item]))
  }

  const onChangeEle = (type: any, val: any, ceng: number) => {
    const newList = [...jsonList]
    const item = newList[ceng]
    item.left = val.left
    item.top = val.top
    console.log('item: ', item);
    setJsonList(newList)

  }

  return (
    <div style={demoStyle} className='edit-demo'>
      {jsonList.map((e, i) => (
        <EditPoint
          onChange={onChangeEle}
          key={i}
          ceng={i}
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