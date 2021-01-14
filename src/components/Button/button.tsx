import React from 'react'
import classnames from 'classnames'

export interface ButtonProps {
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * Is this the principal call to action on the page?
   */
  className?: string
  /**
   * 是否开启禁用
   */
  disabled?: boolean
  /**
   * button类型
   */
  btnType?: 'primary' | 'default' | 'danger' | 'lint'
  /**
   * button大小
   */
  size?: 'lg' | 'sm'
  /**
   * 当 btnType='lint' 的链接地址
   */
  href?: string
  /**
   * button的内容
   */
  children?: React.ReactChild
  /**
   * 点击时间
   */
  onClick?: (val?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}


export const Button: React.FC<ButtonProps> = (props) => {
  const { btnType, size, children, href, disabled, className, backgroundColor, onClick, ...restProps } = props
  // btn btn-lg btn-primary
  const classes = classnames(className, {
    'btn': true,
    [`btn-${size}`]: size,
    [`btn-${btnType}`]: btnType,
    'disabled': btnType === 'lint' && disabled
  })
  if(btnType === 'lint') {
    return <a {...restProps} className={classes} href={href}>{children}</a>
  } else {
    return <button style={{ backgroundColor }} onClick={onClick} {...restProps} className={classes} disabled={disabled}>{children}</button>
  }
}

Button.defaultProps = {
  btnType: 'default',
  disabled: false
}
