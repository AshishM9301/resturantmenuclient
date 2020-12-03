import React, { useEffect, useState } from 'react';

function Bill() {
  const [Items, setItems] = useState([]);
  const [Tip, setTip] = useState(20);
  const [Sum, setSum] = useState(0);
  const [Total, setTotal] = useState(0);
  const [OrderId, setOrderId] = useState('');

  useEffect(() => {
    getOrder();
  }, []);

  const userId = localStorage.getItem('customerID');
  const getOrder = () => {
    fetch(`/api/order/${userId}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          localStorage.removeItem('customerID');
          console.log(data);
          setOrderId(data.orders[0].ordererId);
          for (let i = 0; i < data.orders.length; i++) {
            Items.push(...data.orders[i].orderItems);
            console.log(Items);
            console.log(data.orders[i].orderItems);
          }
          console.log(Items);
          alert(data.message);
        } else alert(data.errorMessage);
      });
  };

  const onTotal = () => {};

  const onTipChange = (e) => {
    const { name, value } = e.target;
    setTip({ [name]: value });

    var sum = 0;
    console.log(Items);
    for (let j = 0; j < Items.length; j++) {
      sum = sum + Number.parseInt(Items[j].value);
      console.log(sum);
      setSum(sum);
    }

    setTotal(
      Number.parseInt(Tip.tip) * Number.parseInt(Sum) * 0.01 +
        Number.parseInt(Sum)
    );

    console.log(Total);
  };

  return (
    <div>
      <div>
        <div className='md:w-3/4 mx-auto'>
          <div className='bg-green-600 rounded-xl shadow-xl p-4 m-6 text-green-100 '>
            <div className='text-6xl p-4 text-center font-nekro'>
              Total Bill
            </div>
            <div className='bg-green-400 w-full h-01 mb-6'></div>
            <div className='p-4 max-w-md bg-white rounded-xl shadow-md mx-auto text-green-800'>
              <div className='text-gray-900 font-medium flex space-x-3'>
                <div>😋</div>
                <div>Customer Bill</div>
              </div>
              <div className='flex '>
                <div>Order ID : </div>
                {OrderId}
              </div>
              <div className='px-6 bg-green-400 w-full h-01 my-2 rounded-full'></div>

              <div>
                <div className='flex px-4 justify-between font-medium'>
                  <div>Order Name</div>
                  <div>Order Price</div>
                </div>
                <div>
                  {Items?.map((item) => (
                    <div
                      className='my-3 flex justify-between px-4'
                      key={item._id}>
                      <div>{item.name}</div>
                      <div>{item.value}</div>
                    </div>
                  ))}
                </div>
                <div className='px-6 bg-green-400 w-full h-01 my-2 rounded-full'></div>
                <div className='px-6'>
                  <div className='mx-4 my-1'>
                    Tip : {Tip.tip ? Tip.tip : '20'} %
                  </div>
                  <input
                    type='range'
                    max='50'
                    defaultValue='20'
                    onChange={onTipChange}
                    name='tip'
                    className='w-full'
                  />
                </div>
                <div className='text-xs text-red-400 px-8'>
                  Move the range bar to get total
                </div>
                <div className='flex justify-between px-4'>
                  <div>Adding Tip {Tip.tip} %</div>
                  <div>
                    {Number.parseInt(Tip.tip) * Number.parseInt(Sum) * 0.01}
                  </div>
                </div>

                <div className='flex justify-between px-4'>
                  <div>Total</div>
                  <div>{Total}</div>
                </div>
              </div>
            </div>
            <div className='flex justify-center my-4'>
              <button
                onClick={() => window.print()}
                className='bg-green-200 rounded-xl shadow-xl py-3 px-6 text-green-700 focus:outline-none '>
                Print
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bill;
