import React, { useContext } from "react";
import classnames from "classnames";
import { SelectState } from "./select";

export interface BaseOptionProps {
  disabled?: boolean;
  value: string;
  children: string;
}

const Option: React.FC<BaseOptionProps> = (props) => {
  const { disabled, value, children } = props;
  const selectContent = useContext(SelectState);
  const { selectValue, toggle } = selectContent;

  const classes = classnames("item", {
    disabled: disabled,
    hover: selectValue.value === value,
  });

  return (
    <div
      className={classes}
      data-value={value}
      onClick={() => !disabled && toggle({ value, label: children })}
    >
      {children}
    </div>
  );
};

Option.defaultProps = {
  disabled: false,
};

export default Option;
