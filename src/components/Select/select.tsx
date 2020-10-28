import React, { useState, useEffect, useRef } from "react";
import classnames from "classnames";
import Option from './option'
export { Option }

interface BaseSelectProps {
  placeholder?: string;
  disabled?: boolean;
  defaultValue?: string;
  children: any;
  onChange?: (val: {value: string, label: string}) => string;
}

export const SelectState = React.createContext({
  selectValue: {value: '', label: ''},
  toggle: (val: {value: string, label: string}) => {
    console.log('toggle', val)
  }
});

const Select: React.FC<BaseSelectProps> = (props) => {
  const { disabled, defaultValue, placeholder, children, onChange } = props;
  const [flag, setFlag] = useState(false);
  const [inputValue, setInput] = useState({value: defaultValue || '', label: defaultValue || ''})
  const selfisClick = useRef(false);


  useEffect(() => {
    console.log('======>', children);
    
    let currentValue = children && children.find((e: any) => {
      if(e.props.children === defaultValue) {
        return true
      } else {
        return false
      }
    })
    if(!currentValue) {
      currentValue = {value: defaultValue, label: defaultValue}
    } else {
      currentValue = {
        value: currentValue.props.value,
        label: currentValue.props.children,
      }
    }
    setInput(currentValue)

    const fn = (e: MouseEvent) => {
      const getDom: any = e;
      selfisClick.current = false;
      for (const item of getDom.path) {
        if (item.className === "select-wrap") {
          selfisClick.current = true;
        }
      }
      if (selfisClick.current) {
        setFlag((old) => !old);
      } else {
        setFlag((old) => (old ? !old : old));
      }
    };
    window.document.addEventListener("click", fn);
    return () => {
      window.document.removeEventListener("click", fn);
    };
  }, [children, defaultValue]);

  const classes = classnames("select-wrap", {
    active: flag,
    disabled: disabled,
  });
  const contentClasses = classnames("content", {
    show: flag,
  });

  return (
    <SelectState.Provider value={{
      selectValue: inputValue,
      toggle: (val) => {
        console.log('toggle111', val)
        setInput(val)
        onChange && onChange(val)
      }
    }}>
      <div className={classes}>
        <input
          readOnly
          className="value"
          value={inputValue.label}
          placeholder={placeholder}
        />
        <div className={contentClasses}>
          {children}
          {/* <div className="item">香港</div>
        <div className="item disabled">澳门</div>
        <div className="item">台湾</div> */}
        </div>
        <svg
          className="select-icon"
          viewBox="0 0 1026 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3275"
          width="200"
          height="200"
        >
          <path
            d="M1007.036029 224.834783c-24.486957-22.26087-62.330435-20.034783-84.591304 2.226087L512.844724 667.826087 103.244724 227.06087c-22.26087-24.486957-60.104348-24.486957-84.591304-2.226087-24.486957 22.26087-24.486957 60.104348-2.226087 84.591304L468.322985 796.93913c11.130435 11.130435 26.713043 20.034783 44.521739 20.034783 15.582609 0 33.391304-6.678261 44.521739-20.034783l451.895652-487.513043C1031.522985 284.93913 1031.522985 247.095652 1007.036029 224.834783z"
            p-id="3276"
            fill="#cdcdcd"
          ></path>
        </svg>
      </div>
    </SelectState.Provider>
  );
};

Select.defaultProps = {
  disabled: false,
  placeholder: "请选择选项",
  defaultValue: "",
};

export default Select;
