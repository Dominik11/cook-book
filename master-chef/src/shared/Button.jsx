import PropTypes from "prop-types";
import React from "react";

function Button(props) {
    return props.isVisible ? (
        <button
            type="button"
            disabled={props.disabled}
            onClick={props.onButtonClick}
        >
            {props.icon}{props.label}
        </button>
    ) : null;
}

Button.propTypes = {
    disabled: PropTypes.bool,
    icon: PropTypes.element,
    isVisible: PropTypes.bool,
    label: PropTypes.string,
    onButtonClick: PropTypes.func
};

Button.defaultProps = {
    isVisible: true
};

export default Button;