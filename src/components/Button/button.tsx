import React from 'react'
import classnames from 'classnames'

export enum ButtonType {
  Primary = 'primary',
  Default = 'default',
  Danger = 'danger',
  Lint = 'lint',
}

export enum ButtonSize {
  Large = 'lg',
  Small = 'sm',
}

interface BaseButtonProps {
  className?: string
  /**
   * 是否开启禁用
   */
  disabled?: boolean
  btnType?: ButtonType
  size?: ButtonSize
  href?: string
  children?: React.ReactChild
}

type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>

export type ButtonProps = BaseButtonProps & NativeButtonProps & AnchorButtonProps

const Button: React.FC<ButtonProps> = (props) => {
  const { btnType, size, children, href, disabled, className, ...restProps } = props
  // btn btn-lg btn-primary
  const classes = classnames(className, {
    'btn': true,
    [`btn-${size}`]: size,
    [`btn-${btnType}`]: btnType,
    'disabled': btnType === ButtonType.Lint && disabled
  })
  if(btnType === 'lint') {
    return <a {...restProps} className={classes} href={href}>{children}</a>
  } else {
    return <button {...restProps} className={classes} disabled={disabled}>{children}</button>
  }
}

Button.defaultProps = {
  btnType: ButtonType.Default,
  disabled: false
}

export default Button