import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import img_logo from './assets/got.png';
import img_cersei from './assets/cersei.jpg';
import img_tyrion from './assets/tyrion.jpg';
import img_ygritte from './assets/ygritte.jpg';
import img_syrio from './assets/syrio.jpg';
import img_peter from './assets/peter.jpg';
import img_daenerys from './assets/daenerys.jpg';
import img_jon from './assets/jon.jpg';

const RandomQuoteMachine = () => {
  const [data, setData] = useState([
    {
      quote: 'You Know Nothing, Jon Snow.',
      author: 'Ygritte',
      image: img_ygritte,
      active: true
    },
    {
      quote:
        'Never forget what you are.\nThe rest of the world will not.\nWear it like armor, and it can \nnever be used to hurt you.',
      author: 'Tyrion Lannister',
      image: img_tyrion,
      active: true
    },
    {
      quote: 'There is only one thing we say to death:\nNot today!',
      author: 'Syrio Forel',
      image: img_syrio,
      active: true
    },
    {
      quote: "What we don't know is\nwhat usually get us killed.",
      author: 'Peter Baelish',
      image: img_peter,
      active: true
    },
    {
      quote:
        'When you play the game of\nthrones, you win or you die.\nThere is no middle ground.',
      author: 'Cersei Lannister',
      image: img_cersei,
      active: true
    },
    {
      quote:
        'I’m not going to stop the wheel...\n...I’m going to break the wheel.',
      author: 'Daenerys Targaryen',
      image: img_daenerys,
      active: true
    },
    {
      quote:
        'When enough people make false\npromises, words stop meaning anything.\nThen there are no more answers,\nonly better and better lies.',
      author: 'Jon Snow',
      image: img_jon,
      active: true
    }
  ]);

  const [currentData, setCurrentData] = useState({});
  const [init, setInit] = useState(false);
  const [anim, setAnim] = useState([false, [{}, {}]]);

  useEffect(() => {
    handleNextQuote();
  }, []);

  const handleNextQuote = () => {
    const dataCopy = [...data];
    const dataFilter = dataCopy.filter(data => data.active);
    const dataRandom = Math.floor(Math.random() * dataFilter.length);
    const dataSelected = dataFilter[dataRandom];
    dataSelected.active = false;
    if (dataFilter.length === 1) dataCopy.forEach(item => (item.active = true));

    setData(dataCopy);

    if (!init) {
      const nextAnim = [...anim];
      nextAnim[1][0].quote = dataSelected.quote;
      nextAnim[1][0].author = dataSelected.author;
      setCurrentData(Object.assign({}, dataSelected));
      setAnim(nextAnim);
      setInit(true);
      return;
    }

    // Transition
    let newAnim = [...anim];

    newAnim[0] = true;

    // Background
    setTimeout(() => {
      setCurrentData(Object.assign({}, dataSelected));
    }, 1000);

    // Quote & Author
    newAnim[1][0] = {
      quote: dataSelected.quote,
      author: dataSelected.author,
      animQuote: 'next',
      animAuthor: 'next'
    };

    newAnim[1][1] = {
      quote: currentData.quote,
      author: currentData.author,
      animQuote: 'previous',
      animAuthor: 'previous'
    };

    setAnim(newAnim);

    // Reset
    setTimeout(() => {
      newAnim = [...anim];
      newAnim[1][0] = {
        quote: newAnim[1][0].quote,
        author: newAnim[1][0].author,
        animQuote: '',
        animAuthor: ''
      };

      newAnim[1][1] = {
        quote: newAnim[1][1].quote,
        author: newAnim[1][1].author,
        animQuote: '',
        animAuthor: ''
      };

      newAnim[0] = false;

      setAnim(newAnim);
    }, 2000);
  };

  return (
    <>
      <img
        src={currentData.image}
        alt="background"
        id="bg"
        className={anim[0] ? 'fadeOut' : null}
      />
      <img src={img_logo} alt="" id="logo" />

      <div id="quote-box">
        <p id="text" className={anim[1][0].animQuote}>{`"${
          anim[1][0].quote
        }"`}</p>
        <p id="author" className={anim[1][0].animAuthor}>{`-${
          anim[1][0].author
        }`}</p>

        {anim[0] && (
          <div>
            <p id="text2" className={anim[1][1].animQuote}>{`"${
              anim[1][1].quote
            }"`}</p>
            <p id="author2" className={anim[1][1].animAuthor}>{`-${
              anim[1][1].author
            }`}</p>
          </div>
        )}

        <button id="new-quote" onClick={handleNextQuote} disabled={anim[0]}>
          Next Quote
        </button>

        <a id="tweet-quote" href="twitter.com/intent/tweet">
          Tweet
        </a>
      </div>
    </>
  );
};

ReactDOM.render(<RandomQuoteMachine />, document.getElementById('root'));
