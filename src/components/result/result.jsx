import {formatNumber} from '../../utils';
import React from 'react';
import {resultProp} from '../../prop-types/prop-types';

function Result({result}) {

  const {date, startNumber, endNumber, startCurrency, endCurrency} = result;

  return (
    <li className="results-list__item">
      <p className="app__text results-list__text results-list__text--time">{date}</p>
      <p className="app__text results-list__text results-list__text--start-value">
        {`${formatNumber(startNumber)} ${startCurrency}`}
      </p>
      <p className="app__text results-list__text results-list__text--end-value">
        {`${formatNumber(endNumber)} ${endCurrency}`}
      </p>
    </li>
  );
}

Result.propTypes = {
  result: resultProp,
};

export default Result;
