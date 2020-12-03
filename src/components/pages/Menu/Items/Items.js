import React, { Component } from 'react';

class Items extends Component {
  state = {
    Options: [],
  };

  onCheckBoxChange = (e) => {
    const { name, value } = e.target;

    this.props.addItem(name, value);
  };

  render(props) {
    return (
      <div className='self-center'>
        <div className='p-4 max-w-xs bg-white rounded-xl shadow-md'>
          <div className='flex flex-col h-56 justify-between'>
            <div className='w-40 mx-auto '>
              <img
                src={this.props.image}
                alt={this.props.itemName}
                className='max-w-full'
              />
            </div>
            <div className='flex items-center space-x-3 mx-auto mb-3 my-5 '>
              <input
                type='checkbox'
                className='form-tick h-6 w-6 border border-gray-300 rounded-md checked:bg-blue-600 checked:border-transparent focus:outline-none'
                name={this.props.itemName}
                value={this.props.itemValue}
                onChange={this.onCheckBoxChange}
              />
              <div className='text-gray-900 font-medium flex justify-between'>
                <div>{this.props.itemName}</div>
              </div>
              <div className='text-gray-900 font-medium flex justify-between'>
                &#8377;{this.props.itemValue}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Items;
