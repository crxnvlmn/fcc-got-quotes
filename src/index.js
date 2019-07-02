import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const RandomQuoteMachine = () => {
  const [data, setData] = React.useState('');
  const [anim, setAnim] = React.useState([false, [{}, {}]]);
  const [currentData, setCurrentData] = React.useState({});

  React.useEffect(() => {
    (async () => {
      const response = await fetch(
        'https://raw.githubusercontent.com/ChristianVillamin/test-author/master/authors.json'
      );
      const data = await response.json();
      const selected = getRandom(data);
      const nextAnim = [...anim];
      nextAnim[1][0].quote = selected.quote;
      nextAnim[1][0].author = selected.author;
      setCurrentData(Object.assign({}, selected));
      setAnim(nextAnim);
    })();
  }, []);

  const getRandom = data => {
    const dataCopy = [...data];
    const dataFilter = dataCopy.filter(data => data.active);
    const dataRandom = Math.floor(Math.random() * dataFilter.length);
    const dataSelected = dataFilter[dataRandom];

    dataSelected.active = false;
    dataFilter.length === 1 && dataCopy.forEach(item => (item.active = true));
    setData(dataCopy);
    return dataSelected;
  };

  const handleNextQuote = () => {
    // === GET RANDOM === \\
    const selected = getRandom(data);

    // === START TRANSITION === \\
    //-Background
    setTimeout(() => setCurrentData(Object.assign({}, selected)), 1000);

    //-Quote & Author
    let newAnim = [...anim];
    newAnim[0] = true;
    newAnim[1][0].quote = selected.quote;
    newAnim[1][0].author = selected.author;
    newAnim[1][1].quote = currentData.quote;
    newAnim[1][1].author = currentData.author;
    setAnim(newAnim);

    //-Reset
    setTimeout(() => {
      newAnim = [...anim];
      newAnim[0] = false;
      setAnim(newAnim);
    }, 2000);
    // === END TRANSITION === \\
  };

  if (!data) return <></>;
  else
    return (
      <>
        <img
          src={currentData.image}
          alt="background"
          id="bg"
          className={anim[0] ? 'fadeOut' : null}
        />
        <img src={'https://i.ibb.co/RbzX8sn/got.png'} alt="" id="logo" />

        <div id="quote-box">
          <Quotes animate={[anim[0], 'next']} quotes={anim[1][0]} />

          {anim[0] && (
            <Quotes animate={[anim[0], 'previous']} quotes={anim[1][1]} />
          )}

          <button id="new-quote" onClick={handleNextQuote} disabled={anim[0]}>
            Next Quote
          </button>

          <button id="tweet-button">
            <a
              href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text="${
                anim[1][0].quote
              }" -${anim[1][0].author}`}
              id="tweet-quote"
              target="_blank"
            >
              Tweet Quote
            </a>
          </button>
        </div>
      </>
    );
};

const Quotes = ({ animate, quotes }) => {
  return (
    <>
      <p id="text" className={animate[0] ? animate[1] : null}>{`"${
        quotes.quote
      }"`}</p>
      <p id="author" className={animate[0] ? animate[1] : null}>{`-${
        quotes.author
      }`}</p>
    </>
  );
};

ReactDOM.render(<RandomQuoteMachine />, document.getElementById('root'));
