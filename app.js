"use strict";

import "purecss";
import "itsa-jsext/lib/object";
import "itsa-jsext/lib/string";

import "itsa-react-checkbox/css/component.scss";
import "./css/component.scss";
import "./css/purecss-component.scss";

const React = require("react"),
    ReactDOM = require("react-dom"),
    Input = require("./lib/component-styled.jsx"),
    // MaskedInput = require("itsa-react-maskedinput"),
    Checkbox = require("itsa-react-checkbox"),
    // Textarea = require("itsa-react-textarea"),
    REG_EXP_PHONE = /^\(\d{0,3}\) \d{0,3}\-\d{0,4}$/;


/*******************************************************
 * Custom form-Component
 *******************************************************/
class MyForm extends React.Component {
    constructor(props) {
        super(props);
        const instance = this;
        instance.state = {
            formValid: false,
            formValidated: false
        };
        instance.focusUnvalidated = instance.focusUnvalidated.bind(instance);
        instance.formValid = instance.formValid.bind(instance);
        instance.handleSubmit = instance.handleSubmit.bind(instance);
    }

    focusUnvalidated() {
        const instance = this;
        const validated = instance.props.validated;
        if (!validated.name) {
            instance.refs.name.focus();
        }
        else if (!validated.email) {
            instance.refs.email.focus();
        }
        else if (!validated.password) {
            instance.refs.password.focus();
        }
        else if (!validated.termsAccepted) {
            instance.refs.terms.focus();
        }
    }

    formValid() {
        const validated = this.props.validated;
        return validated.name && validated.email && validated.password && validated.termsAccepted;
    }

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
    }

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

}


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
    termsAccepted: false,
    onChangeName: handleChangeName,
    onChangeEmail: handleChangeEmail,
    onChangePassword: handleChangePassword,
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