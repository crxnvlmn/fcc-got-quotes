import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function RandomQuoteMachine() {
  const [data, setData] = React.useState([]);
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
        <p id="text" className={anim[0] ? 'next' : null}>{`"${
          anim[1][0].quote
        }"`}</p>
        <p id="author" className={anim[0] ? 'next' : null}>{`-${
          anim[1][0].author
        }`}</p>

        {anim[0] && (
          <div>
            <p id="text2" className={anim[0] ? 'previous' : null}>{`"${
              anim[1][1].quote
            }"`}</p>
            <p id="author2" className={anim[0] ? 'previous' : null}>{`-${
              anim[1][1].author
            }`}</p>
          </div>
        )}

        <button id="new-quote" onClick={handleNextQuote}>
          Next Quote
        </button>

        <button id="tweet-button">
          <a id="tweet-quote" href="twitter.com/intent/tweet">
            Tweet Quote
          </a>
        </button>
      </div>
    </>
  );
}

ReactDOM.render(<RandomQuoteMachine />, document.getElementById('root'));
