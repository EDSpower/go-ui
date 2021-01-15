import React, { useState, useEffect } from 'react'
import { EditPoint, IeditPointProps, PointerType } from './editPoint'
import { Button } from '../Button/button'

const demoStyle: React.CSSProperties = {
  width: '375px',
  height: '900px',
  margin: '0 auto',
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

let preJson = {} as JsonItem

const EditDemo: React.FC = () => {

  // 当前被选中的元素

  const [ jsonList, setJsonList ] = useState<JsonItem[]>([])
  
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

  const savePreJson = (json: JsonItem) =>{
    console.log('savePreJson: 触发了!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', json);
    preJson = {...json}
  }
  
  const onChangeEle: IeditPointProps['onChange'] = (type, val) => {
    console.log('type: ', type);
    console.log('val: ', val);

    // console.log('nowData: ', nowData);
    
    const newList = [...jsonList]

    switch (type) {
      case 'position':
        let item1 = newList.find( e => e.uuid === preJson.uuid)
        if (!item1) { return }
        // 要修改的数据
        const nowData1 = {
          left: preJson.left + val.x,
          top: preJson.top + val.y,
        }
        item1.left = nowData1.left
        item1.top = nowData1.top

        break;
        case 's':
          let item2 = newList.find( e => e.uuid === preJson.uuid)
          if (!item2) { return }
          // 要修改的数据
          const nowData = {
            height: preJson.height + val.y,
          }
          item2.height = nowData.height
          break
    
      default:
        break;
    }
    setJsonList(newList)
  }

  return (
    <div style={demoStyle} className='edit-demo'>
      {jsonList.map((e, i) => (
        <EditPoint
          onChange={onChangeEle}
          savePreJson={savePreJson}
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