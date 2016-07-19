"use strict";

/**
 * Description here
 *
 *
 *
 * <i>Copyright (c) 2016 ItsAsbreuk - http://itsasbreuk.nl</i><br>
 * New BSD License - http://choosealicense.com/licenses/bsd-3-clause/
 *
 *
 * @module itsa-react-input
 * @class Input
 * @since 0.0.1
*/

require("itsa-dom");

const React = require("react"),
    PropTypes = React.PropTypes,
    ReactDom = require("react-dom"),
    later = require("itsa-utils").later,
    MAIN_CLASS = "itsa-input",
    MAIN_CLASS_PREFIX = MAIN_CLASS+"-",
    FORM_ELEMENT_CLASS_SPACED = " itsa-formelement",
    SPACED_MAIN_CLASS_PREFIX = " "+MAIN_CLASS_PREFIX,
    ELEMENT = "element";

const Input = React.createClass({

    propTypes: {
        /**
         * Whether to autofocus the Component.
         *
         * @property autoFocus
         * @type Boolean
         * @since 0.0.1
        */
        autoFocus: PropTypes.bool,

        /**
         * The class that should be set on the element
         *
         * @property className
         * @type String
         * @since 0.0.1
        */
        className: PropTypes.string,

        /**
         * The class that should be set on the underlying input-element
         *
         * @property classNameInput
         * @type String
         * @since 0.0.1
        */
        classNameInput: PropTypes.string,

        /**
         * The error-message that appears when the element is wrong validated.
         *
         * @property errorMsg
         * @type String
         * @since 0.0.1
        */
        errorMsg: PropTypes.string,

        /**
         * Whether the component is disabled
         *
         * @property disabled
         * @type Boolean
         * @since 0.0.1
        */
        disabled: PropTypes.bool,

        /**
         * Whether the parent-form has been validated.
         * This value is needed to determine if the validate-status should be set.
         *
         * @property formValidated
         * @type Boolean
         * @since 0.0.1
        */
        formValidated: PropTypes.bool,

        /**
         * The text that should appear when the element is wrong validated.
         *
         * @property helpText
         * @type String
         * @since 0.0.1
        */
        helpText: PropTypes.string,

        /**
         * The `id` of the element.
         *
         * @property id
         * @type String
         * @since 0.0.1
        */
        id: PropTypes.string,

        /**
         * Whether to mark the Component when successfully validated.
         *
         * @property markValidated
         * @type Boolean
         * @since 0.0.1
        */
        markValidated: PropTypes.bool,

        /**
         * Whether the Component should show an validate-reclamation (star)
         *
         * @property markValidated
         * @type Boolean
         * @since 0.0.1
        */
        markRequired: PropTypes.bool,

        /**
         * The `name` for the element.
         *
         * @property name
         * @type String
         * @since 0.0.1
        */
        name: PropTypes.string,

        /**
         * The `onBlur` function, when happening on the DOM-Element.
         *
         * @property onBlur
         * @type Function
         * @since 0.1.0
        */
        onBlur: PropTypes.func,

        /**
         * The `onChange` function, which should update the `state`.
         *
         * @property onChange
         * @type Function
         * @since 0.0.1
        */
        onChange: PropTypes.func.isRequired,

        /**
         * The `onClick` function, when happening on the DOM-Element.
         *
         * @property onClick
         * @type Function
         * @since 0.0.1
        */
        onClick: PropTypes.func,

        /**
         * The `onFocus` function, when happening on the DOM-Element.
         *
         * @property onFocus
         * @type Function
         * @since 0.1.0
        */
        onFocus: PropTypes.func,

        /**
         * The `onKeyDown` function, when happening on the DOM-Element.
         *
         * @property onKeyDown
         * @type Function
         * @since 0.1.0
        */
        onKeyDown: PropTypes.func,

        /**
         * The `onKeyEnter` function, when the enter-key is pressed.
         *
         * @property onKeyEnter
         * @type Function
         * @since 0.1.0
        */
        onKeyEnter: PropTypes.func,

        /**
         * The `onKeyPress` function, when happening on the DOM-Element.
         *
         * @property onKeyPress
         * @type Function
         * @since 0.1.0
        */
        onKeyPress: PropTypes.func,

        /**
         * The `onKeyUp` function, when happening on the DOM-Element.
         *
         * @property onKeyUp
         * @type Function
         * @since 0.1.0
        */
        onKeyUp: PropTypes.func,

        /**
         * The `placeholder` for the element.
         *
         * @property placeholder
         * @type String
         * @since 0.0.1
        */
        placeholder: PropTypes.string,

        /**
         * Inline style
         *
         * @property style
         * @type object
         * @since 0.0.1
        */
        style: PropTypes.object,

        /**
         * The `type` of the input-element.
         *
         * @property type
         * @type String
         * @since 0.0.1
        */
        type: PropTypes.string,

        /**
         * The tabindex of the Component.
         *
         * @property type
         * @type Number
         * @since 0.0.1
        */
        tabIndex: PropTypes.number,

        /**
         * Whether the property is validated right.
         *
         * @property validated
         * @type Boolean
         * @since 0.0.1
        */
        validated: PropTypes.bool,

        /**
         * The `value` of the input-element.
         *
         * @property value
         * @type String
         * @since 0.0.1
        */
        value: PropTypes.string
    },

    /**
     * componentDidMount will call `this.activatePlaces()`;
     *
     * @method componentDidMount
     * @since 0.0.1
     */
    componentDidMount() {
        const instance = this,
              domNode = ReactDom.findDOMNode(instance);
        instance._inputNode = domNode.querySelector("."+MAIN_CLASS_PREFIX+ELEMENT);
        if (instance.props.autoFocus) {
            instance._focusLater = later(() => instance.focus(), 50);
        }
    },

    /**
     * componentWilUnmount does some cleanup.
     *
     * @method componentWillUnmount
     * @since 0.0.1
     */
    componentWillUnmount() {
        this._focusLater && this._focusLater.cancel();
    },

    /**
     * Returns the rendered React-Element that serves as the source dom-element
     *
     * @method element
     * @param props {Object} props to be passed through to the Component
     * @return ReactComponent
     * @since 0.0.4
     */
    element(props) {
        return (<input {...props} />);
    },

    /**
     * Gets the Component"s internal state. Note, that the this is NOT Redux"s state.
     *
     * @method getInitialState
     * @return Object the Component internal initial state
     * @since 0.0.1
     */
    getInitialState() {
        return {
            focussed: !!this.props.autoFocus
        };
    },

    /**
     * Sets the focus on the Component.
     *
     * @method focus
     * @param [transitionTime] {Number} transition-time to focus the element into the view
     * @chainable
     * @since 0.0.1
     */
    focus(transitionTime) {
        let node, length;
        const props = this.props;
        if (!props.readOnly && !props.disabled) {
            node = this._inputNode;
            node.itsa_focus && node.itsa_focus(null, null, transitionTime);
            if (node.setSelectionRange) {
                length = node.value.length;
                node.setSelectionRange(length, length);
            }
        }
        return this;
    },

    /**
     * The method that is called whenever the input-Element gets blurred.
     * It will change its internal state, so that the css looks right and
     * also any validation-messages appear.
     *
     * @method handleBlur
     * @param e {Object} event-payload
     * @since 0.0.1
     */
    handleBlur(e) {
        const instance = this,
            props = instance.props;
        instance.changed = false;
        instance.setState({
            focussed: false
        });
        props.onBlur && props.onBlur(e);
    },

    /**
     * The method that is called whenever the input-Element changes its value.
     * Will update the Redux-store (signupuser.homeaddress);
     *
     * @method handleChange
     * @param e {Object} event-payload
     * @since 0.0.1
     */
    handleChange(e) {
        const instance = this,
            props = instance.props;
        if (!props.readOnly && !props.disabled) {
            instance.changed = true;
            props.onChange(e);
        }
    },

    /**
     * The method that is called whenever the input-Element gets clicked.
     *
     * @method handleClick
     * @param e {Object} event-payload
     * @since 0.1.0
     */
    handleClick(e) {
        const props = this.props;
        if (!props.readOnly && !props.disabled && props.onClick) {
            props.onClick(e);
        }
    },

    /**
     * Callback that sets the focus to the descendent element by calling `focus()`
     *
     * @method handleContainerFocus
     * @param e {Object} event-payload
     * @since 0.1.0
     */
    handleContainerFocus(e) {
        (e.target===e.currentTarget) && this.focus();
    },

    /**
     * The method that is called whenever the input-Element gets the focus.
     * It will change its internal state, so that the css looks right and
     * also any validation-messages disappear.
     *
     * @method handleFocus
     * @param e {Object} event-payload
     * @since 0.0.1
     */
    handleFocus(e) {
        const props = this.props;
        if (!props.readOnly && !props.disabled) {
            this.changed = false;
            this.setState({
                focussed: true
            });
            props.onFocus && props.onFocus(e);
        }
    },


    /**
     * The method that is called whenever the input-Element recieves a keyDown.
     *
     * @method handleKeyDown
     * @param e {Object} event-payload
     * @since 0.1.0
     */
    handleKeyDown(e) {
        const props = this.props;
        if (!props.readOnly && !props.disabled && props.onKeyDown) {
            props.onKeyDown(e);
        }
    },

    /**
     * The method that is called whenever the input-Element recieves a keyPress.
     *
     * @method handleKeyPress
     * @param e {Object} event-payload
     * @since 0.1.0
     */
    handleKeyPress(e) {
        const props = this.props;
        if (!props.readOnly && !props.disabled) {
            if (props.onKeyEnter && (e.charCode===13)) {
                props.onKeyEnter();
            }
            props.onKeyPress && props.onKeyPress(e);
        }
    },

    /**
     * The method that is called whenever the input-Element recieves a keyUp.
     *
     * @method handleKeyUp
     * @param e {Object} event-payload
     * @since 0.1.0
     */
    handleKeyUp(e) {
        this.props.onKeyUp && this.props.onKeyUp(e);
    },

    /**
     * React render-method --> renderes the Component.
     *
     * @method render
     * @return ReactComponent
     * @since 0.0.1
     */
    render() {
        let wrapperClass = MAIN_CLASS+FORM_ELEMENT_CLASS_SPACED,
            inputClass = MAIN_CLASS_PREFIX+ELEMENT,
            label, errorMsg, help, inputProps, ariaRequired;
        const instance = this,
            props = instance.props,
            element = props.element || instance.element,
            value = props.value || "",
            type = props.type || "text",
            readOnly = props.readOnly || false,
            disabled = props.disabled || false,
            errored = (!instance.changed &&
                (props.validated===false) &&
                props.formValidated);

        props.className && (wrapperClass+=" "+props.className);
        props.classNameInput && (inputClass+=" "+props.classNameInput);
        errored && (wrapperClass+=SPACED_MAIN_CLASS_PREFIX+"error");
        instance.state.focused && (wrapperClass+=SPACED_MAIN_CLASS_PREFIX+"focus");
        disabled && (wrapperClass+=" disabled");
        readOnly && (wrapperClass+=" readonly");

        if (props.markValidated && !errored && !instance.state.focussed && !instance.changed && value && props.validated) {
            wrapperClass += SPACED_MAIN_CLASS_PREFIX+"feedback-success";
        }
        else if (props.markRequired && !value) {
            wrapperClass += SPACED_MAIN_CLASS_PREFIX+"required";
            ariaRequired = true;
        }

        if (errored && props.errorMsg) {
            errorMsg = (<div className={MAIN_CLASS_PREFIX+"error-text"}>{props.errorMsg}</div>);
        }

        if (props.helpText) {
            help = (<div className={MAIN_CLASS_PREFIX+"help-text"}>{props.helpText}</div>);
        }

        inputProps = {
            "aria-disabled": disabled,
            "aria-invalid": errored,
            "aria-readonly": readOnly,
            "aria-required": ariaRequired,
            className: inputClass,
            disabled,
            id: props.id,
            name: props.name,
            onBlur: instance.handleBlur,
            onChange: instance.handleChange,
            onClick: instance.handleClick,
            onFocus: instance.handleFocus,
            onKeyDown: instance.handleKeyDown,
            onKeyPress: instance.handleKeyPress,
            onKeyUp: instance.handleKeyUp,
            placeholder: props.placeholder,
            role: "textbox",
            readOnly,
            type,
            value
        };

        // merge all data-props:
        instance._mergeDataAttrs(inputProps);

        return (
            <div
                className={wrapperClass}
                onFocus={instance.handleContainerFocus}
                style={props.style}
                tabIndex={props.tabIndex} >
                {label}
                <div className={MAIN_CLASS_PREFIX+"inputbox"}>
                    {element.call(this, inputProps)}
                    {errorMsg}
                </div>
                {help}
            </div>
        );
    },

    /**
     * Merges the `data-*` attributes from props into the object
     *
     * @method _mergeDataAttrs
     * @param inputProps {object} the source props which will be extended
     * @private
     * @return object all the data-* attributes
     * @since 0.2.0
     */
    _mergeDataAttrs(inputProps) {
        const props = this.props,
             keys = Object.keys(props);

        keys.forEach(function(key) {
            (key.substr(0,5).toLowerCase()==="data-") && (inputProps[key]=props[key]);
        });
    }

});

module.exports = Input;
