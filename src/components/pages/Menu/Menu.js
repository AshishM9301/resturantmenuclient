import React, { useState } from 'react';
import Randomstring from 'randomstring';

import icecream from '../../../assets/images/icecream.png';
import paneer from '../../../assets/images/paneer.png';
import chikenWings from '../../../assets/images/chiken-wings.png';
import chai from '../../../assets/images/chai.png';
import moocha from '../../../assets/images/moocha.png';
import strabeery from '../../../assets/images/strabeery.png';
import oreo_shake from '../../../assets/images/oreo_shake.png';

import Items from './Items/Items';

function Menu(props) {
  const [SelectedOptions, setSelectedOptions] = useState([]);

  const onOrderClick = (e) => {
    e.preventDefault();

    const userID = localStorage.getItem('customerID');

    const passingData = {
      ordererId: userID ? userID : Randomstring.generate(12),
      orderItems: SelectedOptions,
    };

    fetch('/api/order/add', {
      method: 'POST',
      body: JSON.stringify(passingData),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert(data.message);
          console.log(data);
          localStorage.setItem('customerID', data.order.ordererId);
          window.setTimeout(() => {
            props.history.push('/like');
          }, 1000);
        } else alert(data.errorMessage);
      });
  };

  const itemsAddition = (name, value) => {
    const Item = { name: name, value: value };
    const newArr = [...SelectedOptions, Item];
    for (let i = 0; i < SelectedOptions.length; i++) {
      if (SelectedOptions[i].name === name) {
        newArr.splice(newArr.indexOf(name), 1);
      }
    }

    setSelectedOptions(newArr);
    console.log(newArr);
    console.log(SelectedOptions);
  };

  const Favorites = [
    {
      image: icecream,
      itemValue: '45',
      itemName: 'Ice Cream',
    },
    {
      image: paneer,
      itemValue: '102',
      itemName: 'Panerr Butter Masala',
    },
    { image: chikenWings, itemValue: '135', itemName: 'Chicken Wings' },
  ];

  const Bevreges = [
    {
      image: chai,
      itemValue: '12',
      itemName: 'Chai',
    },
    {
      image: moocha,
      itemValue: '40',
      itemName: 'Moocha',
    },
    {
      image: strabeery,
      itemValue: '55',
      itemName: 'Strabeery Juice',
    },
    {
      image: oreo_shake,
      itemValue: '35',
      itemName: 'Oreo Shake',
    },
  ];
  return (
    <div className='md:w-3/4 mx-auto'>
      <div className='bg-green-600 rounded-xl shadow-xl p-4 m-6 text-green-100'>
        <div className=''>
          <div className='font-noto text-6xl p-4 text-center font-nekro'>
            Menu
          </div>
          <div className='p-6'>
            <div>
              <form>
                {/*--------Favourites--------*/}
                <div className='flex'>
                  <div className='bg-green-400 w-full h-01 self-center mx-3' />
                  <div className='text-2xl text-green-100'>Favourites</div>
                  <div className='bg-green-400 w-full h-01 self-center mx-3' />
                </div>
                <div className='my-4'>
                  {/*------Images---------*/}
                  <div></div>
                  <div className='flex justify-around space-x-3'>
                    {Favorites.map((item) => (
                      <Items
                        image={item.image}
                        itemValue={item.itemValue}
                        itemName={item.itemName}
                        addItem={itemsAddition}
                      />
                    ))}
                  </div>
                </div>
                {/*--------------------------Bevreges----------------------- */}
                <div className='flex'>
                  <div className='bg-green-400 w-full h-01 self-center mx-3' />
                  <div className='text-2xl text-green-100'>Bevreges</div>
                  <div className='bg-green-400 w-full h-01 self-center mx-3' />
                </div>
                {/*-------One Item-------*/}
                <div className='flex justify-around my-5'>
                  {Bevreges.map((item) => (
                    <Items
                      image={item.image}
                      itemValue={item.itemValue}
                      itemName={item.itemName}
                      addItem={itemsAddition}
                    />
                  ))}
                </div>
                <div className='w-full mt-20'>
                  <div className='flex justify-center'>
                    <button
                      className='rounded-lg bg-green-500 hover:bg-green-900 text-green-100  focus:outline-none px-6 py-3 shadow-2xl font-semibold border border-green-600 focus:border-none'
                      onClick={onOrderClick}>
                      Call the Waiter for Order
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
