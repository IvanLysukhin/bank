import Result from '../result/result';
import React from 'react';
import {useSelector} from 'react-redux';
import {getResults} from '../../store/selectors';
import {useDispatch} from 'react-redux';
import {clearResults} from '../../store/actions';

function ResultsList() {
  const dispatch = useDispatch();
  const results = useSelector(getResults);

  const onClearBtnHandler = () => {
    dispatch(clearResults());
  };

  return (
    <section className="app__section results-list">
      <div className="results-list__wrapper">
        <h2 className="app__title results-list__title">История конвертация</h2>
      </div>
      <ul className="app__list results-list__list">
        {results.map((result) => <Result result={result} key={result.id}/>)}
      </ul>
      <button
        className="results-list__reset-btn"
        onClick={onClearBtnHandler}
      >
        Очистить историю
      </button>
    </section>
  );
}

export default ResultsList;
