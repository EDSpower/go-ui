import React, { useRef } from "react";
import classnames from "classnames";

/**
 * alert组件的四种类型
 * 成功
 * 默认
 * 危险
 * 警告
 */
export enum AlertType {
  Success = "success",
  Default = "default",
  Danger = "danger",
  Warning = "warning",
}

interface AlertProps {
  style?: React.HTMLAttributes<HTMLDivElement>['style'];
  type?: AlertType;
  className?: string;
  /**
   * 是否允许关闭
   */
  close?: boolean;
  /**
   * 标题
   */
  title?: string;
  /**
   * 内容
   */
  content?:  React.ReactChild;
  /**
   * 关闭alert后触发的回调
   */
  onClose?: () => void;
}

const Alert: React.FC<AlertProps> = (props) => {
  const { className, type, style, close, title, content, onClose } = props;
  const alertRef = useRef<HTMLDivElement>(null)

  const onAlertClose = () => {
    if (alertRef.current) {
      alertRef.current.style.transform = 'scaleY(0)'
      alertRef.current.style.opacity = '0'
      setTimeout(() => {
        alertRef.current && alertRef.current.remove()
      }, 300);
    }
    onClose && onClose()
  }

  // alert alert-success
  const classes = classnames(className, "alert", {
    [`alert-${type}`]: type,
  });
  return (
    <div ref={alertRef} className={classes} style={style}>
      <div className="alert-header">
        <div className="text">
          {title}
        </div>
        {close && (
        <svg
          className="alert-close-icon"
          onClick={onAlertClose}
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3244"
          width="200"
          height="200"
        >
          <path
            d="M925.468404 822.294069 622.19831 512.00614l303.311027-310.331931c34.682917-27.842115 38.299281-75.80243 8.121981-107.216907-30.135344-31.369452-82.733283-34.259268-117.408013-6.463202L512.000512 399.25724 207.776695 87.993077c-34.675754-27.796066-87.272669-24.90625-117.408013 6.463202-30.178323 31.414477-26.560936 79.375815 8.121981 107.216907l303.311027 310.331931L98.531596 822.294069c-34.724873 27.820626-38.341237 75.846432-8.117888 107.195418 30.135344 31.43699 82.72919 34.326806 117.408013 6.485715l304.178791-311.219137 304.177767 311.219137c34.678824 27.841092 87.271646 24.951275 117.408013-6.485715C963.808618 898.140501 960.146205 850.113671 925.468404 822.294069z"
            p-id="3245"
            fill="#ffffff"
          ></path>
        </svg>
        )}
      </div>
      {content && <div className='alert-content'>{content}</div>} 
    </div>
  );
};

Alert.defaultProps = {
  type: AlertType.Success,
  close: true,
  title: '默认标题'
};

export default Alert;
