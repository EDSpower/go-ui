import React from 'react'
import Alert, { AlertType } from './alert'

const AlertDemo: React.FC = () => {
  return (
    <div style={{width: '500px'}}>
      <Alert type={AlertType.Success} title="Success Text Success Text" />
      <Alert type={AlertType.Default} title="Info Text" content="Error Description Error Description Error Description Error Description Error Description Error Description" />
      <Alert style={{fontWeight: 'bold'}} type={AlertType.Warning} title="Warning Text" />
      <Alert close={false} className="self-alert" type={AlertType.Danger} title="Error Text" />
    </div>
  )
}

export default AlertDemo