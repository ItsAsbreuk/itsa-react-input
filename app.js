"use strict";

import "purecss";
import "js-ext/lib/object";
import "js-ext/lib/string";

const React = require("react"),
    ReactDOM = require("react-dom"),
    Input = require("./lib/component-styled.jsx");

const MyForm = React.createClass({

    focusUnvalidated() {
        const instance = this;
        const validated = instance.state.validated;
        if (!validated.name) {
            instance.refs.name.focus();
        }
        else if (!validated.email) {
            instance.refs.email.focus();
        }
        else if (!validated.password) {
            instance.refs.password.focus();
        }
    },

    formValid() {
        const validated = this.state.validated;
        return validated.name && validated.email && validated.password;
    },

    getInitialState() {
        const state = this.props.deepClone(); // available through js-ext/lib/object
        state.formValid = false;
        state.formValidated = false;
        state.validated = {};
        state.validators = {
            email: ["required", "email"],
            name: ["required"],
            password: ["required", "password"]
        };

        // set initial validation:
        this.props.each((value, key) => {
            // only inspect primary type-properties
            if (typeof state[key]!=="object") {
                state.validated[key] = this.validate(state[key], state.validators[key]);
            }
        });

        return state;
    },

    handleChangeName(e) {
        const newVal = e.target.value,
              validated = this.state.validated.deepClone();
        validated.name = this.validate(newVal, this.state.validators.name);
        this.setState({
            name: newVal,
            validated: validated
        });
    },

    handleChangeEmail(e) {
        const newVal = e.target.value,
              validated = this.state.validated.deepClone();
        validated.email = this.validate(newVal, this.state.validators.email);
        this.setState({
            email: newVal,
            validated: validated
        });
    },

    handleChangePassword(e) {
        const newVal = e.target.value,
              validated = this.state.validated.deepClone();
        validated.password = this.validate(newVal, this.state.validators.password);
        this.setState({
            password: newVal,
            validated: validated
        });
    },

    handleSubmit(e) {
        const formValid = this.formValid();
        e.preventDefault();
        this.setState({
            formValid: formValid,
            formValidated: true
        });
        if (!formValid) {
            this.focusUnvalidated();
        }
    },

    render() {
        let formClass = "pure-form pure-form-stacked";
        const validatedText = (this.state.formValid) ? "valid" : "invalid";
        const validatedMsg = (
            <legend className="formheader">Form is {validatedText}</legend>
        );
        this.state.formValid || (formClass+=" invalid");
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
                        formValidated={this.state.formValidated}
                        markValidated={true}
                        onChange={this.handleChangeName}
                        placeholder="Name"
                        ref="name"
                        tabIndex={1}
                        validated={this.state.validated.name}
                        value={this.state.name} />
                    <Input
                        className="pure-input-1"
                        errorMsg="Emailformat is: user@example.com"
                        formValidated={this.state.formValidated}
                        helpText="Use format: user@example.com"
                        markValidated={true}
                        onChange={this.handleChangeEmail}
                        placeholder="Email address"
                        ref="email"
                        tabIndex={2}
                        validated={this.state.validated.email}
                        value={this.state.email} />
                    <Input
                        className="pure-input-1"
                        errorMsg="Use at least 5 characters"
                        formValidated={this.state.formValidated}
                        markValidated={true}
                        onChange={this.handleChangePassword}
                        placeholder="Password"
                        ref="password"
                        tabIndex={3}
                        type="password"
                        validated={this.state.validated.password}
                        value={this.state.password} />
                    <button
                        className="pure-button pure-button-primary"
                        type="submit" >
                        Validate
                    </button>
                </fieldset>
            </form>
        );
    },

    validate(value, validators) {
        let valid;
        if (!validators) {
            return true;
        }
        validators.some(validatorKey => {
            this.validatorsFunc[validatorKey] && (valid=this.validatorsFunc[validatorKey](value));
            return !valid;
        });
        return !!valid;
    },

    validatorsFunc: {
        email(val) {
            return val.validateEmail(); // comes from itsa/lib/string
        },

        password(val) {
            return val && (val.length>=5);
        },

        required(val) {
            return !!val;
        }
    }

});

const props = {
    name: '',
    email: '',
    password: ''
};

ReactDOM.render(
    <MyForm {...props} />,
    document.getElementById("component-container")
);
