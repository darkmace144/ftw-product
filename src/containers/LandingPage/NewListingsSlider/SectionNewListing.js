import React, { Component } from 'react';
import { string } from 'prop-types';
import classNames from 'classnames';

import { FormattedMessage } from '../../../util/reactIntl';
import { lazyLoadWithDimensions } from '../../../util/contextHelpers';

import { NamedLink } from '../../../components';

import css from './SectionNewListing.module.css';
const sharetribeIntegrationSdk = require('sharetribe-flex-integration-sdk');


// Thumbnail image for the search "card"
class ThumbnailImage extends Component {
  render() {
    const { alt, ...rest } = this.props;
    return <img alt={alt} {...rest} />;
  }
}
// Load the image only if it's close to viewport (user has scrolled the page enough).
const LazyImage = lazyLoadWithDimensions(ThumbnailImage);

// Create a "card" that contains a link to filtered search on SearchPage.
const FilterLink = props => {
  const { name, image, link } = props;
  const url = typeof window !== 'undefined' ? new window.URL(link) : new global.URL(link);
  const searchQuery = url.search;
  const nameText = <span className={css.searchName}>{name}</span>;
  return (
    <NamedLink name="SearchPage" to={{ search: searchQuery }} className={css.searchLink}>
      <div className={css.imageWrapper}>
        <div className={css.aspectWrapper}>
          <LazyImage src={image} alt={name} className={css.searchImage} />
        </div>
      </div>
      <div className={css.linkText}>
        <FormattedMessage
          id="SectionFilteredSearches.filteredSearch"
          values={{ filter: nameText }}
        />
      </div>
    </NamedLink>
  );
};

// Component that shows full-width section on LandingPage.
// Inside it shows 3 "cards" that link to SearchPage with specific filters applied.
const SectionNewListing = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  // FilterLink props:
  // - "name" is a string that defines what kind of search the link is going to make
  // - "image" is imported from images directory and you can update it by changing the file
  // - "link" should be copy-pasted URL from search page.
  //    The domain doesn't matter, but search query does. (I.e. "?pub_brand=nike")
  return (
    <div className={classes}>
      <div className={css.title}>
        <FormattedMessage id="SectionNewListing.title" />
      </div>
      <div className={css.filteredSearches}>
        <FilterLink
          name="CPUs"
          image={"https://images.unsplash.com/photo-1666330404750-061d4858593b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80"}
          link="http://localhost:3000/s?pub_brand=nike"
        />
        <FilterLink
          name="GPUs"
          image={"https://images.unsplash.com/photo-1666330404750-061d4858593b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80"}
          link="http://localhost:3000/s?pub_brand=yeezy"
        />
        <FilterLink
          name="Custom Builds"
          image={"https://images.unsplash.com/photo-1666330404750-061d4858593b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80"}
          link="http://localhost:3000/s?pub_brand=converse"
        />
          <FilterLink
          name="Consoles222"
          image={"https://images.unsplash.com/photo-1666330404750-061d4858593b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80"}
          link="http://localhost:3000/s?pub_brand=converse"
        />
      </div>
    </div>
  );
};

SectionNewListing.defaultProps = { rootClassName: null, className: null };

SectionNewListing.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionNewListing;
