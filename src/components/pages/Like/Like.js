import React, { useEffect, useState } from 'react';

function Like(props) {
  const [Like, setLike] = useState(0);
  const [Dislike, setDislike] = useState(0);
  const [Items, setItems] = useState([]);
  const [Feedback, setFeedback] = useState('');
  const [KnowLike, setKnowLike] = useState(true);

  useEffect(() => {
    getLike();
    getItems();
  }, []);

  const onDisClick = (e) => {
    e.preventDefault();
    const userID = localStorage.getItem('customerID');

    getItems();

    const likePassingData = {
      newLikerId: userID,
      Items: Items,
    };
    console.log(likePassingData);

    fetch('/api/like/adddislike', {
      method: 'POST',
      body: JSON.stringify(likePassingData),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert(data.message);
          setKnowLike(false);
          getLike();
        } else alert(data.errorMessage);
      });
  };

  const onLikeCick = (e) => {
    e.preventDefault();

    const userID = localStorage.getItem('customerID');

    const likePassingData = {
      newLikerId: userID,
      Items: Items,
    };

    fetch('/api/like/addlike', {
      method: 'POST',
      body: JSON.stringify(likePassingData),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert(data.message);
          getLike();
          setKnowLike(true);
        } else alert(data.errorMessage);
      });
  };

  const getLike = () => {
    var sum = 0;
    var sum2 = 0;

    fetch('/api/like/all', { method: 'GET' })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log(data.like);
          for (let i = 0; i < data.like.length; i++) {
            sum = sum + data.like[i].like;
            sum2 = sum2 + data.like[i].dislike;
          }
          setLike(sum);
          setDislike(sum2);
        } else alert(data.errorMessage);
      });
  };

  const getItems = () => {
    const userID = localStorage.getItem('customerID');

    fetch(`/api/order/${userID}`, { method: 'GET' })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setItems(data.orders);
          console.log(Items);
        } else alert(data.errorMessage);
      });
  };

  const onFeedbackChange = (e) => {
    const { name, value } = e.target;
    setFeedback({ [name]: value });
  };

  const onFeedbackSubmitClick = (e) => {
    e.preventDefault();

    const userID = localStorage.getItem('customerID');

    const passingBody = {
      feedbackGiverId: userID,
      ...Feedback,
      feedbackType: KnowLike ? 0 : 1,
    };

    fetch('/api/feedback/add', {
      method: 'POST',
      body: JSON.stringify(passingBody),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert(data.message);
        } else alert(data.errorMessage);
      });
  };

  const onClickShowMeTheMenu = (e) => {
    e.preventDefault();
    props.history.push('/');
  };

  const onClickPaytheBill = (e) => {
    e.preventDefault();
    props.history.push('/bill');
  };

  return (
    <div>
      <div>
        <div className='md:w-3/4 mx-auto'>
          <div className='bg-green-600 rounded-xl shadow-xl p-4 m-6 text-green-100'>
            <div className='text-6xl p-4 text-center font-nekro'>
              Do You like the Order
            </div>
            <div className='flex justify-between py-6 px-10'>
              <div
                className='text-2xl font-semibold font-noto cursor-pointer'
                onClick={onLikeCick}>
                <div className='text-center'>&#128077;</div>
                <div>Like : {Like}</div>
              </div>
              <div className='flex space-x-4 self-center'>
                <div>
                  <button
                    className='px-6 py-3 rounded shadow-xl bg-white text-gray-900 focus:outline-none hover:bg-gray-200'
                    onClick={onClickShowMeTheMenu}>
                    Show me the Menu
                  </button>
                </div>
                <div>
                  <button
                    className='px-6 py-3 rounded shadow-xl bg-white text-gray-900 focus:outline-none hover:bg-gray-200'
                    onClick={onClickPaytheBill}>
                    Pay the bill
                  </button>
                </div>
              </div>
              <div>
                <div
                  className='text-2xl font-semibold font-noto cursor-pointer'
                  onClick={onDisClick}>
                  <div className='text-center'>&#128078;</div>
                  <div>Dislike: {Dislike}</div>
                </div>
              </div>
            </div>
            <div className='my-4'>
              <div className='text-6xl p-4 text-center font-nekro'>
                Feedback
              </div>
            </div>
            <div>
              <div className='md:w-1/3 mx-auto'>
                <textarea
                  className='focus:outline-none w-full bg-green-300 text-green-900 rounded text-sm font-noto p-3 h-32'
                  onChange={onFeedbackChange}
                  name='feedback'
                />
              </div>
            </div>
            <div className='flex justify-center my-4'>
              <button
                className='px-6 py-3 rounded shadow-xl bg-green-200 text-gray-900 focus:outline-none hover:bg-gray-200'
                onClick={onFeedbackSubmitClick}>
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Like;
