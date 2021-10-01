import PropTypes from 'prop-types';

export const resultProp = PropTypes.shape({
  id: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  startNumber: PropTypes.string.isRequired,
  endNumber: PropTypes.string.isRequired,
  startCurrency: PropTypes.string.isRequired,
  endCurrency: PropTypes.string.isRequired,
}).isRequired;
