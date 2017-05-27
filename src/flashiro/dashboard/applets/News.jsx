import _chunk from 'lodash/chunk';
import _map from 'lodash/map';
import _size from 'lodash/size';
import _times from 'lodash/times';
import cx from 'classnames';
import FontAwesome from 'react-fontawesome';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Spinner from 'flashiro/utilities/Spinner';

import './News.scss';

const propTypes = {
  entriesPerPage: PropTypes.number,
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

const defaultProps = {
  entriesPerPage: 2,
};

class News extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
    };

    this.switchPage = this.switchPage.bind(this);
  }

  switchPage(newPage) {
    this.setState({ page: newPage });
  }

  render() {
    if (this.props.loading) {
      return <Spinner />;
    }

    const pageCount = Math.ceil(_size(this.props.headlines) / this.props.entriesPerPage);
    const paginatedContent = _chunk(this.props.headlines, this.props.entriesPerPage);

    return (
      <div>
        <header className="news__header">
          <FontAwesome className="news__icon" name="inbox" />

          <div>
            <h3 className="news__heading">What has happened today?</h3>
            <p className="news__subheading">Read below...</p>
          </div>
        </header>

        <ul className="list-unstyled news__content">
          {_map(paginatedContent, (pageContent, pageIndex) => (
            <div
              key={pageIndex}
              className="news__page-box"
              style={{
                transform: `translate3d(${(pageIndex - (this.state.page * 2)) * 100}%, 0, 0)`,
              }}
            >
              {_map(pageContent, (headline, entryIndex) => (
                <li key={entryIndex} className="news__entry">
                  <h4 className="news__entry-heading">
                    <a href={headline.url} target="_blank" rel="noopener noreferrer">
                      {headline.title}
                    </a>
                  </h4>

                  {headline.publishedAt &&
                    <small>{moment(headline.publishedAt).format('h:mma')}</small>
                  }

                  <p className="news__entry-description">{headline.description}</p>
                </li>
              ))}
            </div>
          ))}
        </ul>

        <ul className="list-unstyled news__navigation">
          {_times(pageCount, index => (
            <li
              key={index}
              className={cx({
                'news__navigation-dot--active': index === this.state.page,
                'news__navigation-dot': true,
              })}
            >
              <button
                className="news__navigation-button"
                onClick={() => this.switchPage(index)}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

News.propTypes = propTypes;
News.defaultProps = defaultProps;

export default News;
