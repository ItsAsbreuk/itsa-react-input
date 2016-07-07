/*global describe, it, before, after */

"use strict";

const React = require("react");
const ReactDOM = require("react-dom");
const TestUtils = require("react-addons-test-utils");

const chai = require("chai");
const expect = chai.expect;
const equalJSX = require("chai-equal-jsx");
const renderer = TestUtils.createRenderer();

chai.use(equalJSX);

const Component = require("../lib/component.jsx");
const NOOP = () => {};

describe("React Component", function () {

    before(function () {
        this.jsdom = require("jsdom-global")();
    });

    after(function () {
        this.jsdom();
    });

    it("Rendering component", function () {
        renderer.render(<Component onChange={NOOP} />);
        const actual = renderer.getRenderOutput();
        const expected = (
            <div className="itsa-input itsa-formelement"
              onFocus={function noRefCheck() {}}
              style={undefined}
              tabIndex={undefined}>
              <div className="itsa-input-inputbox">
                <input
                  aria-disabled={false}
                  aria-invalid={false}
                  aria-readonly={false}
                  aria-required={undefined}
                  className="itsa-input-element"
                  disabled={false}
                  id={undefined}
                  name={undefined}
                  onBlur={function noRefCheck() {}}
                  onChange={function noRefCheck() {}}
                  onClick={function noRefCheck() {}}
                  onFocus={function noRefCheck() {}}
                  onKeyDown={function noRefCheck() {}}
                  onKeyPress={function noRefCheck() {}}
                  onKeyUp={function noRefCheck() {}}
                  placeholder={undefined}
                  readOnly={false}
                  role="textbox"
                  type="text"
                  value=""
                />
              </div>
            </div>
        );
        expect(actual).to.equalJSX(expected);
    });

    it("Rendering component with a value", function () {
        renderer.render(<Component onChange={NOOP} value="Hello World" />);
        const actual = renderer.getRenderOutput();
        const expected = (
            <div className="itsa-input itsa-formelement"
              onFocus={function noRefCheck() {}}
              style={undefined}
              tabIndex={undefined}>
              <div className="itsa-input-inputbox">
                <input
                  aria-disabled={false}
                  aria-invalid={false}
                  aria-readonly={false}
                  aria-required={undefined}
                  className="itsa-input-element"
                  disabled={false}
                  id={undefined}
                  name={undefined}
                  onBlur={function noRefCheck() {}}
                  onChange={function noRefCheck() {}}
                  onClick={function noRefCheck() {}}
                  onFocus={function noRefCheck() {}}
                  onKeyDown={function noRefCheck() {}}
                  onKeyPress={function noRefCheck() {}}
                  onKeyUp={function noRefCheck() {}}
                  placeholder={undefined}
                  role="textbox"
                  readOnly={false}
                  type="text"
                  value="Hello World"
                />
              </div>
            </div>
        );
        expect(actual).to.equalJSX(expected);
    });

    it("Rendering password-component", function () {
        renderer.render(<Component onChange={NOOP} type="password" value="Hello World"/>);
        const actual = renderer.getRenderOutput();
        const expected = (
            <div className="itsa-input itsa-formelement"
              onFocus={function noRefCheck() {}}
              style={undefined}
              tabIndex={undefined}>
              <div className="itsa-input-inputbox">
                <input
                  aria-disabled={false}
                  aria-invalid={false}
                  aria-readonly={false}
                  aria-required={undefined}
                  className="itsa-input-element"
                  disabled={false}
                  id={undefined}
                  name={undefined}
                  onBlur={function noRefCheck() {}}
                  onChange={function noRefCheck() {}}
                  onClick={function noRefCheck() {}}
                  onFocus={function noRefCheck() {}}
                  onKeyDown={function noRefCheck() {}}
                  onKeyPress={function noRefCheck() {}}
                  onKeyUp={function noRefCheck() {}}
                  placeholder={undefined}
                  role="textbox"
                  readOnly={false}
                  type="password"
                  value="Hello World"
                />
              </div>
            </div>
        );
        expect(actual).to.equalJSX(expected);
    });

    it("Rendering component with all props", function () {
        renderer.render(
            <Component
                autoFocus={true}
                helpText="need some help?"
                id="id1"
                markRequired={true}
                name="comp-name"
                onChange={NOOP}
                placeholder="the placeholder"
                type="date"
                tabIndex={3} />
        );
        const actual = renderer.getRenderOutput();
        const expected = (
            <div className="itsa-input itsa-formelement itsa-input-required"
              onFocus={function noRefCheck() {}}
              style={undefined}
              tabIndex={3}>
              <div className="itsa-input-inputbox">
                <input
                  aria-disabled={false}
                  aria-invalid={false}
                  aria-readonly={false}
                  aria-required={true}
                  className="itsa-input-element"
                  disabled={false}
                  id="id1"
                  name="comp-name"
                  onBlur={function noRefCheck() {}}
                  onChange={function noRefCheck() {}}
                  onClick={function noRefCheck() {}}
                  onFocus={function noRefCheck() {}}
                  onKeyDown={function noRefCheck() {}}
                  onKeyPress={function noRefCheck() {}}
                  onKeyUp={function noRefCheck() {}}
                  placeholder="the placeholder"
                  role="textbox"
                  readOnly={false}
                  type="date"
                  value=""
                />
              </div>
              <div className="itsa-input-help-text">
                need some help?
              </div>
            </div>
        );
        expect(actual).to.equalJSX(expected);
    });

        // autoFocus: PropTypes.bool,
        // errorMsg: PropTypes.string,
        // formValidated: PropTypes.bool,
        // helpText: PropTypes.string,
        // id: PropTypes.string,
        // markValidated: PropTypes.bool,
        // markRequired: PropTypes.bool,
        // name: PropTypes.string,
        // placeholder: PropTypes.string,
        // type: PropTypes.string,
        // tabIndex: PropTypes.number,
        // validated: PropTypes.bool,
        // value: PropTypes.string
    it("Rendering component with wrong validation when not form-validated", function () {
        renderer.render(
            <Component
                errorMsg="wrong validated"
                formValidated={false}
                onChange={NOOP}
                validated={false}
                value="Hi" />
        );
        const actual = renderer.getRenderOutput();
        const expected = (
            <div className="itsa-input itsa-formelement"
              onFocus={function noRefCheck() {}}
              style={undefined}
              tabIndex={undefined}>
              <div className="itsa-input-inputbox">
                <input
                  aria-disabled={false}
                  aria-invalid={false}
                  aria-readonly={false}
                  aria-required={undefined}
                  className="itsa-input-element"
                  disabled={false}
                  id={undefined}
                  name={undefined}
                  onBlur={function noRefCheck() {}}
                  onChange={function noRefCheck() {}}
                  onClick={function noRefCheck() {}}
                  onFocus={function noRefCheck() {}}
                  onKeyDown={function noRefCheck() {}}
                  onKeyPress={function noRefCheck() {}}
                  onKeyUp={function noRefCheck() {}}
                  placeholder={undefined}
                  role="textbox"
                  readOnly={false}
                  type="text"
                  value="Hi"
                />
              </div>
            </div>
        );
        expect(actual).to.equalJSX(expected);
    });

    it("Rendering component with wrong validation with form-validated", function () {
        renderer.render(
            <Component
                errorMsg="wrong validated"
                formValidated={true}
                onChange={NOOP}
                validated={false}
                value="Hi" />
        );
        const actual = renderer.getRenderOutput();
        const expected = (
            <div className="itsa-input itsa-formelement itsa-input-error"
              onFocus={function noRefCheck() {}}
              style={undefined}
              tabIndex={undefined}>
              <div className="itsa-input-inputbox">
                <input
                  aria-disabled={false}
                  aria-invalid={true}
                  aria-readonly={false}
                  aria-required={undefined}
                  className="itsa-input-element"
                  disabled={false}
                  id={undefined}
                  name={undefined}
                  onBlur={function noRefCheck() {}}
                  onChange={function noRefCheck() {}}
                  onClick={function noRefCheck() {}}
                  onFocus={function noRefCheck() {}}
                  onKeyDown={function noRefCheck() {}}
                  onKeyPress={function noRefCheck() {}}
                  onKeyUp={function noRefCheck() {}}
                  placeholder={undefined}
                  role="textbox"
                  readOnly={false}
                  type="text"
                  value="Hi"
                />
                <div className="itsa-input-error-text">
                  wrong validated
                </div>
              </div>
            </div>
        );
        expect(actual).to.equalJSX(expected);
    });
/*
    it("Listening to changes", function () {
        let props = {
            value: ""
        };
        const handleChange = e => {
            props.name = e.target.value;
            inputNode.forceUpdate();
        };
        const inputNode = TestUtils.renderIntoDocument(<Component {...props} onChange={handleChange} />);
        TestUtils.Simulate.keyDown(ReactDOM.findDOMNode(inputNode), {keyCode : 65});
        expect(inputNode.props.value).to.be.equal("a"); //This fails
    });
*/
});
