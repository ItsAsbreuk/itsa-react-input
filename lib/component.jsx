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
         * Whether the parent-form has been submitted.
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
         * The `label` for the element.
         *
         * @property label
         * @type String
         * @since 0.0.1
        */
        label: PropTypes.string,

        /**
         * Whether to mark the Component when successfully validated.
         *
         * @property markValidated
         * @type Boolean
         * @since 0.0.1
        */
        markValidated: PropTypes.bool,

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
         * Set this value whenever the field should use a pattern
         *
         * @property pattern
         * @type String
         * @since 0.0.1
        */
        pattern: PropTypes.string,

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
        value: PropTypes.string.isRequired
    },

    /**
     * componentDidMount will call `this.activatePlaces()`;
     *
     * @method componentDidMount
     * @since 0.0.1
     */
    componentDidMount() {
        this.props.autoFocus && this.focus();
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
        this.refs.input && ReactDom.findDOMNode(this.refs.input).focus();
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
        // inputElement = props.pattern ?
        //               (<MaskedInput mask={props.pattern} ref="mask" {...inputProps} />) :
        //               props.type==="textarea" ?
        //                   (<textarea {...inputProps} />) :
        //                   (<input {...inputProps} />);

        // in case we are using `react-maskedinput`, then it doesn"t accept an empty value
        // once it already has content. This makes it impossible to emtpy.
        // therefore we need to empty the maks by hacking it:
/*
        if (props.pattern) {
            maskComponent = this.refs.mask; // only there when already rendered before
            if (maskComponent && !props.value) {
                maskComponent.mask.setValue();
            }
        }
*/
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
            type = props.type || "text",
            errored = (!instance.changed &&
                (props.validated===false) &&
                (props.value || props.formValidated));

        props.className && (wrapperClass+=" "+props.className);
        errored && (wrapperClass+=SPACED_MAIN_CLASS_PREFIX+"error");
        instance.state.focused && (wrapperClass+=SPACED_MAIN_CLASS_PREFIX+"focus");
        if (props.markValidated && !errored && !instance.state.focussed && !instance.changed && props.value && props.validated) {
            wrapperClass += SPACED_MAIN_CLASS_PREFIX+"feedback-success";
        }

        if (errored && props.errorMsg) {
            errorMsg = (<div className={MAIN_CLASS_PREFIX+"error-text"}>{props.errorMsg}</div>);
        }

        if (props.label) {
            labelClass = MAIN_CLASS_PREFIX + "control-label";
            props.labelClasses && (labelClass+=" "+props.labelClasses);
            label = (<Label className={labelClass} htmlFor={props.id} value={props.label} />);
        }

        if (props.helpText) {
            help = (<div className={MAIN_CLASS_PREFIX+"help-text"}>{props.helpText}</div>);
        }

        inputProps = {
            className: MAIN_CLASS_PREFIX+"-element",
            id: props.id,
            name: props.name,
            onBlur: instance.handleBlur,
            onChange: instance.handleChange,
            onFocus: instance.handleFocus,
            placeholder: props.placeholder,
            readOnly: props.readOnly || false,
            ref: "input",
            tabIndex: props.tabIndex || 1,
            type: type,
            value: props.value
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
