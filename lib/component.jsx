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

import React, {PropTypes} from "react";
import ReactDom from "react-dom";

const MAIN_CLASS = "itsa-input",
      MAIN_CLASS_PREFIX = MAIN_CLASS+"-",
      SPACED_MAIN_CLASS_PREFIX = " "+MAIN_CLASS_PREFIX;

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
         * The error-message that appears when the element is wrong validated.
         *
         * @property errorMsg
         * @type String
         * @since 0.0.1
        */
        errorMsg: PropTypes.string,

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
         * The `onChange` function, which should update the `state`.
         *
         * @property onChange
         * @type Function
         * @since 0.0.1
        */
        onChange: PropTypes.func.isRequired,

        /**
         * The `placeholder` for the element.
         *
         * @property placeholder
         * @type String
         * @since 0.0.1
        */
        placeholder: PropTypes.string,

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
        instance._inputNode = domNode.querySelector("input");
        instance.props.autoFocus && instance.focus();
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
     * @chainable
     * @since 0.0.1
     */
    focus() {
        this._inputNode.focus();
        return this;
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
        if (!this.props.readOnly) {
            this.changed = true;
            this.props.onChange(e);
        }
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
    handleFocus() {
        this.changed = false;
        this.setState({
            focussed: true
        });
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
    handleBlur() {
        this.changed = false;
        this.setState({
            focussed: false
        });
    },

    renderInputElement(inputProps) {
        return (<input {...inputProps} />);
    },

    /**
     * React render-method --> renderes the Component.
     *
     * @method render
     * @return ReactComponents
     * @since 0.0.1
     */
    render() {
        let wrapperClass = MAIN_CLASS,
            label, errorMsg, help, labelClass, inputProps, maskComponent;
        const instance = this,
            props = instance.props,
            value = props.value || "",
            type = props.type || "text",
            errored = (!instance.changed &&
                (props.validated===false) &&
                props.formValidated);

        props.className && (wrapperClass+=" "+props.className);
        errored && (wrapperClass+=SPACED_MAIN_CLASS_PREFIX+"error");
        instance.state.focused && (wrapperClass+=SPACED_MAIN_CLASS_PREFIX+"focus");

        if (props.markValidated && !errored && !instance.state.focussed && !instance.changed && value && props.validated) {
            wrapperClass += SPACED_MAIN_CLASS_PREFIX+"feedback-success";
        }
        else if (props.markRequired && !value) {
            wrapperClass += SPACED_MAIN_CLASS_PREFIX+"required";
        }

        if (errored && props.errorMsg) {
            errorMsg = (<div className={MAIN_CLASS_PREFIX+"error-text"}>{props.errorMsg}</div>);
        }

        if (props.helpText) {
            help = (<div className={MAIN_CLASS_PREFIX+"help-text"}>{props.helpText}</div>);
        }

        inputProps = {
            className: MAIN_CLASS_PREFIX+"element",
            id: props.id,
            name: props.name,
            onBlur: instance.handleBlur,
            onChange: instance.handleChange,
            onFocus: instance.handleFocus,
            placeholder: props.placeholder,
            readOnly: props.readOnly || false,
            tabIndex: props.tabIndex || 1,
            type: type,
            value
        };

        return (
            <div className={wrapperClass}>
                {label}
                <div className={MAIN_CLASS_PREFIX+"inputbox"}>
                    {instance.renderInputElement.call(this, inputProps)}
                    {errorMsg}
                </div>
                {help}
            </div>
        );
    }

});

module.exports = Input;