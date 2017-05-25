import _map from 'lodash/map';
import FontAwesome from 'react-fontawesome';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';

import Spinner from 'flashiro/utilities/Spinner';

import './News.scss';

const propTypes = {
  headlines: PropTypes.arrayOf(PropTypes.shape({
    author: PropTypes.string,
    description: PropTypes.string.isRequired,
    publishedAt: PropTypes.string,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    urlToImage: PropTypes.string.isRequired,
  })).isRequired,
  loading: PropTypes.bool.isRequired,
};

function News(props) {
  if (props.loading) {
    return <Spinner />;
  }

  return (
    <div>
      <header className="news__header">
        <FontAwesome className="news__icon" name="inbox" />

        <div>
          <h3 className="news__heading">What has happened today?</h3>
          <p className="news__subheading">Read below...</p>
        </div>
      </header>

      <ul className="list-unstyled">
        {_map(props.headlines, (headline, index) => (
          <li key={index} className="news__entry">
            <h4 className="news__entry-heading">
              <a href={headline.url} target="_blank" rel="noopener noreferrer">{headline.title}</a>
            </h4>
            {headline.publishedAt &&
              <small>{moment(headline.publishedAt).format('h:mma')}</small>
            }
            <p className="news__entry-description">{headline.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

News.propTypes = propTypes;

export default News;
