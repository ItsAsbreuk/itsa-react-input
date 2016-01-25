[![Build Status](https://travis-ci.org/ItsAsbreuk/itsa-react-input.svg?branch=master)](https://travis-ci.org/ItsAsbreuk/itsa-react-input)

Beautiful functional textarea-element for react.

## How to use:

```js
const ReactDOM = require("react-dom"),
      Input = require("itsa-react-input");

let props = {
    name: ''
};

const handleChange = e => {
    props.name = e.target.value;
    renderInput();
};

const renderInput = () => {
    ReactDOM.render(
        <Input
            onChange={props.handleChange}
            value={props.name} />
        document.getElementById("container")
    );
};

renderInput();
```

## About the css

You need the right css in order to make use of `itsa-react-input`. There are 2 options:

1. You can use the css-files inside the `css`-folder.
2. You can use: `Component = require("itsa-react-input/lib/component-styled.jsx");` and build your project with `webpack`. This is needed, because you need the right plugin to handle a requirement of the `scss`-file.


[API](http://projects.itsasbreuk.nl/react-components/itsa-input/api/)

## Sophisticated forms

In adjunction with other `itsa-react-components`, you can build very sophisticated forms:
[example sophisticated form with validation](http://projects.itsasbreuk.nl/react-components/itsa-input/component.html)

This example has the following code:

####css
```css
body {
    padding: 2em;
}
#component-container {
    width: 20em;
    border: solid 1px #AAA;
    padding: 1em;
    background-color: #FAFAFA;
    margin: 3em auto;
}
#component-container button {
    width: 100%;
    text-align: center;
    margin-top: 1em;
}
#component-container form.invalid .formheader {
    color: #F34F4F;
}
#component-container .checkbox-text {
    color: #F34F4F;
    visibility: hidden;
    margin-top: 0.4em;
    font-size: 0.8em;
}
#component-container .checkbox-error-text.checkbox-text {
    visibility: visible;
}
#component-container .itsa-input.last {
    margin-bottom: 1.4em;
}
#component-container .itsa-checkbox {
    margin-right: 0.5em;
}
#component-container .form-text {
    color: #444;
}
```

####html
```html
<div id="component-container"></div>
<script src="./app.js"></script>
```

####app.js
```js
"use strict";

import "purecss";
import "js-ext/lib/object";
import "js-ext/lib/string";

import "itsa-react-checkbox/css/component.scss";

const React = require("react"),
    ReactDOM = require("react-dom"),
    Input = require("itsa-react-input"),
    Checkbox = require("itsa-react-checkbox");


/*******************************************************
 * Custom form-Component
 *******************************************************/
const MyForm = React.createClass({

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
    },

    formValid() {
        const validated = this.props.validated;
        return validated.name && validated.email && validated.password && validated.termsAccepted;
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
                        helpText="use format: user@example.com"
                        markRequired={true}
                        markValidated={true}
                        onChange={props.onChangeEmail}
                        placeholder="Email address"
                        ref="email"
                        tabIndex={2}
                        validated={props.validated.email}
                        value={props.email} />
                    <Input
                        className="pure-input-1 last"
                        errorMsg="Use at least 5 characters"
                        formValidated={formValidated}
                        markRequired={true}
                        markValidated={true}
                        onChange={props.onChangePassword}
                        placeholder="Password"
                        ref="password"
                        tabIndex={3}
                        type="password"
                        validated={props.validated.password}
                        value={props.password} />
                    <Checkbox
                        checked={props.termsAccepted}
                        onChange={props.onTermsAccepted}
                        ref="terms"
                        tabIndex={4} />
                    <span className="itsa-input-required-msg-after">General terms accepted</span>
                    <div className={generalTermsMsgClass}>
                        You need to accept our terms
                    </div>
                    <div className="itsa-input-required-msg-before">
                        required fields
                    </div>
                    <button
                        className="pure-button pure-button-primary"
                        tabIndex={5}
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
        return val.validateEmail(); // comes from itsa/lib/string
    },

    password(val) {
        return val && (val.length>=5);
    },

    required(val) {
        return !!val;
    }
};

const validateProps = props => {
    props.each((value, key) => {
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
```