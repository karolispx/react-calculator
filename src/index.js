import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Calculator extends React.Component {
    // Calculator
    constructor(props) {
        super(props);
        this.state = {
            result: '0',
            previousKey: 'operator'
        };

        // Event listener to update result input when this changes
        this.handleChange = this.handleChange.bind(this);
    }

    // Render button
    renderButton(value, type) {
        return (
            <button className="calculator-button" onClick={() => this.handleClick(value, type)}>
                {value}
            </button>
        );
    }

    // Render result
    renderResult() {
        return (
            <input type="text" className="calculator-result" value={this.state.result} onChange={this.handleChange} readOnly/>
        );
    }

    // Handle input change
    handleChange(event) {
        this.setState({result: event.target.value});
    }

    // Click on a button
    handleClick(value, type) {
        let previousKey = this.state.previousKey;
        let oldResult = this.state.result;

        let newKey = type;
        let newResult = oldResult;

        if ( type === 'operator' && previousKey !== 'operator' ) {
            newResult = oldResult + value;
        } else if ( type === 'clear' ) {
            newResult = '0';
            newKey = 'operator';
        } else if ( type === 'number' ) {
            if ( oldResult === '0' ) {
                newResult = value;
            } else {
                newResult = oldResult + '' + value;
            }
        } else if ( type === 'equal' && previousKey === 'number' ) {
            newResult = eval(oldResult); // Probably not very safe.
        }

        this.setState({
            result: newResult,
            previousKey: newKey
        });
    }

    // Render calculator
    render() {
        return (
            <div className="calculator-content">
                <div className="row">
                    <div className="column">
                        <h1>Calculator</h1>
                    </div>
                </div>

                <div className="row">
                    <div className="column">
                        {this.renderResult()}
                    </div>
                </div>

                <div className="row">
                    <div className="column">
                        {this.renderButton('7', 'number')}
                    </div>

                    <div className="column">
                        {this.renderButton('8', 'number')}
                    </div>

                    <div className="column">
                        {this.renderButton('9', 'number')}
                    </div>

                    <div className="column column-helper">
                        {this.renderButton('*', 'operator')}
                    </div>
                </div>

                <div className="row">
                    <div className="column">
                        {this.renderButton('4', 'number')}
                    </div>

                    <div className="column">
                        {this.renderButton('5', 'number')}
                    </div>

                    <div className="column">
                        {this.renderButton('6', 'number')}
                    </div>

                    <div className="column column-helper">
                        {this.renderButton('/', 'operator')}
                    </div>
                </div>

                <div className="row">
                    <div className="column">
                        {this.renderButton('1', 'number')}
                    </div>

                    <div className="column">
                        {this.renderButton('2', 'number')}
                    </div>

                    <div className="column">
                        {this.renderButton('3', 'number')}
                    </div>

                    <div className="column column-helper">
                        {this.renderButton('-', 'operator')}
                    </div>
                </div>

                <div className="row">
                    <div className="column column-danger">
                        {this.renderButton('C', 'clear')}
                    </div>

                    <div className="column">
                        {this.renderButton('0', 'number')}
                    </div>

                    <div className="column column-helper">
                        {this.renderButton('=', 'equal')}
                    </div>

                    <div className="column column-helper">
                        {this.renderButton('+', 'operator')}
                    </div>
                </div>
            </div>
        );
    }
}

class App extends React.Component {
    render() {
        return (
            <div className="calculator">
                <Calculator />
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
