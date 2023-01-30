import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: '',
      basicSalary: '',
      hra: '',
      conveyance: '',
      festivalFund: '',
      performance: '',
      taxableIncome: '',
      carBenefit: '',
      taxAmount: 0
    }
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }


  handleSubmit = (event) => {
    event.preventDefault();
    const { gender, basicSalary, hra, conveyance, festivalFund, performance, carBenefit } = this.state;
    let totalAmount = parseFloat(basicSalary) + parseFloat(hra) + parseFloat(conveyance) + parseFloat(festivalFund) + parseFloat(performance);
    this.setState({ taxAmount: this.calculateTax(totalAmount, gender, carBenefit, basicSalary) });
  };
  
  calculateTax = (totalAmount, gender, carBenefit, basicSalary) => {
    //income tax calculation based on gender and car benefit
    let carBenefitTax = 0;
    if(gender === 'Men' && carBenefit === 'Enabled') {
      carBenefitTax = basicSalary * 0.05;
    }

    if(gender === 'Men' && carBenefit === 'Disabled' || gender === 'Men' && carBenefit === '') {
      if(totalAmount <= 300000){
        return carBenefitTax;
      }else if(totalAmount >= 300000 && totalAmount <= 400000){
        return carBenefitTax + (totalAmount - 300000) * 0.05;
      }else if(totalAmount >= 400000 && totalAmount <= 700000){
        return carBenefitTax + (totalAmount - 400000) * 0.1 + 5000;
      }else{
        return carBenefitTax + (totalAmount - 700000) * 0.15 + 35000;
      }
    }
  };

  render() {
    return (
      <div className="app" style={{ width: '100%', height: '100%' }}>
        <header>
          <h1>Bangladesh Income Tax Return Calculator for Salary</h1>
        </header>
        <main>
          <form onSubmit={this.handleSubmit}>
          <label>
              <select name="gender" onChange={this.handleInputChange}>
                <option value="">Select Gender</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Third Gender">Third Gender</option>
              </select>
            </label> 
            <label>
              <input type="text" name="basicSalary" placeholder='Basic Salary' onChange={this.handleInputChange} />
            </label> 
            <label>
              <input type="text" name="hra" placeholder='House Rent Allowance' onChange={this.handleInputChange} />
            </label> 
            <label>
              <input type="text" name="conveyance" placeholder='Conveyance Allowance' onChange={this.handleInputChange} />
            </label> 
            <label>
              <input type="text" name="festivalFund" placeholder='Festival Fund Amount' onChange={this.handleInputChange} />
            </label> 
            <label>
              <input type="text" name="performance" placeholder='Performance Bonus' onChange={this.handleInputChange} />
            </label> 
            <label>
              <select name="gender" onChange={this.handleInputChange}>
                <option value="">Select Car Benefit</option>
                <option value="Enabled">Enabled</option>
                <option value="Disabled">Disabled</option>
              </select>
            </label> 
            <br />
            <button type="submit" className="calculate-button">Calculate Tax</button>
          </form>
          <p className="tax-amount">Your Income tax: {this.state.taxAmount}</p>
        </main>
      </div>
    );
  }
}

export default App;
