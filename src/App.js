import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taxpayer: 0,
      basicSalary: 0,
      hra: 0,
      med: 0,
      conveyance: 0,
      festivalFund: 0,
      performance: 0,
      taxableIncome: 0,
      carBenefit: 0,
      taxAmount: 0,
      dps: 0,
      futureFund: 0,
      welfareFund: 0,
      groupInsurance: 0,
      invAmount: 0,
      finalDiscountAmount: 0,
    }
  }


  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }


  handleSubmit = (event) => {
    event.preventDefault();
    const { taxpayer, basicSalary, hra, med, conveyance, festivalFund, performance, carBenefit, dps, futureFund, welfareFund, groupInsurance } = this.state;
    //check if any input is empty, if so set it to 0
    const inputs = ['basicSalary', 'hra', 'med', 'conveyance', 'festivalFund', 'performance', 'dps', 'futureFund', 'welfareFund', 'groupInsurance'];
    inputs.forEach(input => {
      if (this.state[input] === '') {
        this.setState({ [input]: 0 });
      }
    });
    let totalAmountPerMonth = parseFloat(basicSalary) + parseFloat(hra) + parseFloat(med) + parseFloat(conveyance);
    let totalAmount = totalAmountPerMonth * 12 + parseFloat(festivalFund) + parseFloat(performance);
    let incomeTax = this.calculateTax(totalAmount, taxpayer, carBenefit, basicSalary);
    this.setState({ taxAmount: incomeTax });
    //calculate rebate
    let totalInvestment = parseFloat(dps) + parseFloat(futureFund) + parseFloat(welfareFund) + parseFloat(groupInsurance);
    let twentyPercentOfTotalAmount = totalAmount * 0.2;
    const highestInvestmentLimit = 10000000;
    //lowest number among total investment and 20% of total amount and highest investment limit
    let eligibleAmount = Math.min(totalInvestment, twentyPercentOfTotalAmount, highestInvestmentLimit);
    // console.log(eligibleAmount);
    let finalDiscountAmount = (incomeTax - eligibleAmount * 0.15).toFixed(2);
    if (finalDiscountAmount < 0) {
      finalDiscountAmount = 5000;
    }
    this.setState({ invAmount: (eligibleAmount*0.15).toFixed(2) });
    this.setState({ finalDiscountAmount: finalDiscountAmount });
  };

  calculateTax = (totalAmount, taxpayer, carBenefit, basicSalary) => {
    //income tax calculation based on taxpayer and car benefit
    let carBenefitTax = 0;
    if (carBenefit === 'true') {
      carBenefitTax = basicSalary * 12 * 0.05; // 5% of yearly basic salary
    }

    if (taxpayer === 'Men') {
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
    else if (taxpayer === 'Women' || taxpayer === 'TG' || taxpayer === 'dis') {
      if (totalAmount <= 450000) {
        return carBenefitTax;
      }
      else if (totalAmount >= 450000 && totalAmount <= 550000) {
        return carBenefitTax + (totalAmount - 450000) * 0.05;
      }
      else if (totalAmount >= 550000 && totalAmount <= 850000) {
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
        <p> Bangladesh Income Tax Calculator for Job Holders (NBR:2022-23)</p>
        <div className="container">
          <div class="row">
            <div class="col s12 m6">
              <div className="form">
                <form onSubmit={this.handleSubmit} className="form">
                  <p>Incomes</p>
                  <label>
                    <select name="taxpayer" onChange={this.handleInputChange} required>
                      <option value="">Select Tax Payer Type</option>
                      <option value="Men">Men</option>
                      <option value="Women">Women</option>
                      <option value="TG">Third Gender</option>
                      <option value="dis">Disabled</option>
                    </select>
                  </label>
                  <br />
                  <label>
                    <input type="number" name="basicSalary" placeholder='Basic Salary Per Month (???)' required onChange={this.handleInputChange} />
                  </label>
                  <br />
                  <label>
                    <input type="number" name="hra" placeholder='House Rent Allowance Per Month (???)' onChange={this.handleInputChange} />
                  </label>
                  <br />
                  <label>
                    <input type="number" name="med" placeholder='Medical Allowance Per Month (???)' onChange={this.handleInputChange} />
                  </label>
                  <br />
                  <label>
                    <input type="number" name="conveyance" placeholder='Conveyance Allowance Per Month (???)' onChange={this.handleInputChange} />
                  </label>
                  <br />
                  <label>
                    <input type="number" name="festivalFund" placeholder='Total Festival Bonus (???)' onChange={this.handleInputChange} />
                  </label>
                  <br />
                  <label>
                    <input type="number" name="performance" placeholder='Total Performance Bonus (???)' onChange={this.handleInputChange} />
                  </label>
                  <br />
                  <label>
                    <select name="carBenefit" onChange={this.handleInputChange}>
                      <option value="">Select Car Benefit</option>
                      <option value="true">Enabled</option>
                      <option value="false">Disabled</option>
                    </select>
                  </label>
                  <br />
                  <button type="submit" className="calculate-button">Calculate Tax</button>
                  <p className="tax-amount">Your Income tax is {this.state.taxAmount} ???</p>
                </form>
              </div>
            </div>
            <div class="col s12 m6">

              <div className="form">
                <form onSubmit={this.handleSubmit} className="form">
                  <p>Investments</p>
                  <label>
                    <input type="number" name="dps" placeholder='Total Yearly DPS Amount(???)' onChange={this.handleInputChange} />
                  </label>
                  <br />
                  <label>
                    <input type="number" name="futureFund" placeholder='Total Yearly Future Fund (???)' onChange={this.handleInputChange} />
                  </label>
                  <br />
                  <label>
                    <input type="number" name="welfareFund" placeholder='Total Yearly Welfare Fund (???)' onChange={this.handleInputChange} />
                  </label>
                  <br />
                  <label>
                    <input type="number" name="groupInsurance" placeholder='Total Yearly Group Insurance Fund(???)' onChange={this.handleInputChange} />
                  </label>
                  <br />
                  <button type="submit" className="calculate-investment-button">Calculate Rebate</button>
                  <p className="tax-amount">Your Tax Rebate Amount is  {this.state.invAmount} ???</p>
                </form>
              </div>
            </div>
          </div>
        </div>
        <h4 className="tax-amount">Your Final Tax is {this.state.finalDiscountAmount} ???</h4>
      </div >

    );
  }
}

export default App;