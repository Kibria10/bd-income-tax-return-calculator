import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: '',
      basicSalary: '',
      hra: '',
      med: '',
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
    const { gender, basicSalary, hra, med, conveyance, festivalFund, performance, carBenefit } = this.state;
    let totalAmountPerMonth = parseFloat(basicSalary) + parseFloat(hra) + parseFloat(med) + parseFloat(conveyance);
    let totalAmount = totalAmountPerMonth * 12 + parseFloat(festivalFund) + parseFloat(performance);
    this.setState({ taxAmount: this.calculateTax(totalAmount, gender, carBenefit, basicSalary) });
  };

  calculateTax = (totalAmount, gender, carBenefit, basicSalary) => {
    //income tax calculation based on gender and car benefit
    let carBenefitTax = 0;
    if (carBenefit === 'true') {
      carBenefitTax = basicSalary * 12 * 0.05; // 5% of yearly basic salary
    }

    if (gender === 'Men') {
      if (totalAmount <= 300000) {
        return carBenefitTax;
      } else if (totalAmount >= 300000 && totalAmount <= 400000) {
        return carBenefitTax + (totalAmount - 300000) * 0.05;
      } else if (totalAmount >= 400000 && totalAmount <= 700000) {
        return carBenefitTax + (totalAmount - 400000) * 0.1 + 5000;
      } else {
        return carBenefitTax + (totalAmount - 700000) * 0.15 + 35000;
      }
    }

    //for women the there is no tax for first 450000, then 5% for next 100000, 10% for next 300000 and 15% for rest
    else if (gender === 'Women' || gender === 'TG') {
      if(totalAmount <= 450000) {
        return carBenefitTax;
      }
      else if(totalAmount >= 450000 && totalAmount <= 550000) {
        return carBenefitTax + (totalAmount - 450000) * 0.05;
      }
      else if(totalAmount >= 550000 && totalAmount <= 850000) {
        return carBenefitTax + (totalAmount - 550000) * 0.1 + 5000;
      }
      else {
        return carBenefitTax + (totalAmount - 850000) * 0.15 + 35000;
      }
      
    }
  };

  render() {
    return (
      <div className="App">
        <div className="particles-background" />
        <p> Bangladesh Income Tax Return Calculator for Job Holders (NBR:2022-23)</p>
        <form onSubmit={this.handleSubmit} className="form">
          <label>
            <select name="gender" onChange={this.handleInputChange}>
              <option value="">Select Gender</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="TG">Third Gender</option>
            </select>
          </label>
          <label>
            <input type="number" name="basicSalary" placeholder='Basic Salary Per Month (৳)' onChange={this.handleInputChange} />
          </label>
          <label>
            <input type="number" name="hra" placeholder='House Rent Allowance Per Month (৳)' onChange={this.handleInputChange} />
          </label>
          <label>
            <input type="number" name="med" placeholder='Medical Allowance Per Month (৳)' onChange={this.handleInputChange} />
          </label>
          <label>
            <input type="number" name="conveyance" placeholder='Conveyance Allowance Per Month (৳)' onChange={this.handleInputChange} />
          </label>
          <label>
            <input type="number" name="festivalFund" placeholder='Total Festival Bonus (৳)' onChange={this.handleInputChange} />
          </label>
          <label>
            <input type="number" name="performance" placeholder='Total Performance Bonus (৳)' onChange={this.handleInputChange} />
          </label>
          <label>
            <select name="carBenefit" onChange={this.handleInputChange}>
              <option value="">Select Car Benefit</option>
              <option value="true">Enabled</option>
              <option value="false">Disabled</option>
            </select>
          </label>
          <br />
          <button type="submit" className="calculate-button">Calculate Tax</button>
        </form>
        <p className="tax-amount">Your Income tax is {this.state.taxAmount} ৳</p>
      </div>
    );
  }
}

export default App;