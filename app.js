"use strict";

import "purecss";
import "itsa-jsext/lib/object";
import "itsa-jsext/lib/string";

import "itsa-react-checkbox/css/component.scss";
import "./css/component.scss";
import "./css/purecss-component.scss";
import "itsa-react-textarea/css/component.scss";

const React = require("react"),
    ReactDOM = require("react-dom"),
    Input = require("./lib/component-styled.jsx"),
    MaskedInput = require("itsa-react-maskedinput"),
    Checkbox = require("itsa-react-checkbox"),
    Textarea = require("itsa-react-textarea"),
    REG_EXP_PHONE = /^\(\d{0,3}\) \d{0,3}\-\d{0,4}$/;


/*******************************************************
 * Custom form-Component
 *******************************************************/
const MyForm = React.createClass({

    focusUnvalidated() {
        const instance = this;
        const validated = instance.props.validated;
        console.info('instance.refs', instance.refs);
        console.info(instance);
        if (!validated.name) {
            instance.refs.name.focus();
        }
        else if (!validated.email) {
            instance.refs.email.focus();
        }
        else if (!validated.phone) {
            instance.refs.phone.focus();
        }
        else if (!validated.password) {
            instance.refs.password.focus();
        }
        else if (!validated.termsAccepted) {
            instance.refs.terms.focus();
        }
    },

    formValid() {
        const validated = this.props.validated;
        return validated.name && validated.email && validated.phone  && validated.password && validated.termsAccepted;
    },

    getInitialState() {
        return {
            formValid: false,
            formValidated: false
        };
    },


    handleSubmit(e) {
        const formValid = this.formValid();
        e.preventDefault();
        this.setState({
            formValid,
            formValidated: true
        });
        this.props.onSubmit && this.props.onSubmit({
            formValid,
            target: this
        });
    },

    render() {
        let formClass = "pure-form pure-form-stacked";
        const props = this.props,
              formValid = this.state.formValid,
              formValidated = this.state.formValidated,
              validatedText = formValid ? "valid" : "invalid",
              validatedMsg = (
                  <legend className="formheader">Form is {validatedText}</legend>
              ),
              generalTermsMsgClass = "checkbox-text" + ((formValidated && !props.termsAccepted) ? " checkbox-error-text" : "");

        formValid || (formClass+=" invalid");

        return (
            <form
                className={formClass}
                onSubmit={this.handleSubmit} >
                {validatedMsg}
                <fieldset>
                    <Input
                        autoFocus={true}
                        className="pure-input-1"
                        errorMsg="Enter your name"
                        formValidated={formValidated}
                        markRequired={true}
                        markValidated={true}
                        onChange={props.onChangeName}
                        placeholder="Name"
                        ref="name"
                        tabIndex={1}
                        validated={props.validated.name}
                        value={props.name} />
                    <Input
                        className="pure-input-1"
                        errorMsg="Emailformat is: user@example.com"
                        formValidated={formValidated}
                        markRequired={true}
                        markValidated={true}
                        onChange={props.onChangeEmail}
                        placeholder="Email address"
                        ref="email"
                        tabIndex={2}
                        validated={props.validated.email}
                        value={props.email} />
                    <MaskedInput
                        className="pure-input-1"
                        errorMsg="Phone number format: (555) 555-5555"
                        formValidated={formValidated}
                        helpText="format: (555) 555-5555"
                        markRequired={true}
                        markValidated={true}
                        mask="(111) 111-1111"
                        onChange={props.onChangePhone}
                        placeholder="Phone"
                        ref="phone"
                        tabIndex={4}
                        validated={props.validated.phone}
                        value={props.phone} />
                    <Input
                        className="pure-input-1"
                        errorMsg="Use at least 5 characters"
                        formValidated={formValidated}
                        markRequired={true}
                        markValidated={true}
                        onChange={props.onChangePassword}
                        placeholder="Password"
                        ref="password"
                        tabIndex={5}
                        type="password"
                        validated={props.validated.password}
                        value={props.password} />
                    <Textarea
                        className="pure-input-1 last"
                        onChange={props.onChangeComment}
                        placeholder="Comment"
                        ref="comment"
                        tabIndex={6}
                        value={props.comment} />
                    <Checkbox
                        checked={props.termsAccepted}
                        formValidated={formValidated}
                        onChange={props.onTermsAccepted}
                        ref="terms"
                        tabIndex={7}
                        validated={props.validated.termsAccepted} />
                    <span className="itsa-input-required-msg-after">General terms accepted</span>
                    <div className={generalTermsMsgClass}>
                        You need to accept our terms
                    </div>
                    <div className="itsa-input-required-msg-before">
                        required fields
                    </div>
                    <button
                        className="pure-button pure-button-primary"
                        tabIndex={8}
                        type="submit" >
                        Validate Form
                    </button>
                </fieldset>
            </form>
        );
    }

});


/*******************************************************
 * Event-hanldlers
 *******************************************************/
const handleChangeName = (e) => {
    redefineProps('name', e.target.value);
};

const handleChangeEmail = (e) => {
    redefineProps('email', e.target.value);
};

const handleChangePassword = (e) => {
    redefineProps('password', e.target.value);
};

const handleChangePhone = (e) => {
    redefineProps('phone', e.target.value);
};

const handleChangeComment = (e) => {
    redefineProps('comment', e.target.value);
};

const handleSubmit = (e) => {
    const formValid = e.formValid,
          form = e.target;
    formValid || form.focusUnvalidated();
};

const handleTermsAccepted = (e) => {
    redefineProps('termsAccepted');
};


/*******************************************************
 * Validation
 *******************************************************/
const validate = (value, validators) => {
    let valid;
    if (!validators) {
        return true;
    }
    validators.some(validatorKey => {
        validatorsDefinition[validatorKey] && (valid=validatorsDefinition[validatorKey](value));
        return !valid;
    });
    return !!valid;
};

const validatorsDefinition = {
    checked(val) {
        return !!val
    },

    email(val) {
        return val.itsa_isValidEmail(); // comes from itsa/lib/string
    },

    password(val) {
        return val && (val.length>=5);
    },

    phone(val) {
        return REG_EXP_PHONE.test(val) || !val;
    },

    required(val) {
        return !!val;
    }
};

const validateProps = props => {
    props.itsa_each((value, key) => {
        // only inspect primary type-properties
        if (typeof props[key]!=="object") {
            props.validated[key] = validate(props[key], props.validators[key]);
        }
    });
};


/*******************************************************
 * props
 *******************************************************/
let props = {
    name: '',
    email: '',
    password: '',
    comment: '',
    phone: '',
    termsAccepted: false,
    onChangeName: handleChangeName,
    onChangeEmail: handleChangeEmail,
    onChangePassword: handleChangePassword,
    onChangePhone: handleChangePhone,
    onChangeComment: handleChangeComment,
    onSubmit: handleSubmit,
    onTermsAccepted: handleTermsAccepted,
    validated: {},
    validators: {
        email: ["required", "email"],
        name: ["required"],
        phone: ["required", "phone"],
        termsAccepted: ["checked"],
        password: ["required", "password"]
    }
};

const redefineProps = (key, value) => {
    if (key==='termsAccepted') {
        props.termsAccepted = !props.termsAccepted;
    }
    else {
        props[key] = value;
    }
    validateProps(props);
    renderForm(props);
};


/*******************************************************
 * React render form
 *******************************************************/
const renderForm = props => {
    ReactDOM.render(
        <MyForm {...props} />,
        document.getElementById("component-container")
    );
};


/*******************************************************
 * Initialization
 *******************************************************/
validateProps(props);
renderForm(props);