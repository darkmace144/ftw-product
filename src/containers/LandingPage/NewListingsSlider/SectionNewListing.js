import React, { Component } from 'react';
import { array, string } from 'prop-types';
import classNames from 'classnames';
import { ensureListing, ensureUser } from '../../../util/data';
import { createSlug } from '../../../util/urlHelpers';
import { propTypes } from '../../../util/types';
import { FormattedMessage, intlShape, injectIntl } from '../../../util/reactIntl';
import { lazyLoadWithDimensions } from '../../../util/contextHelpers';
import { NamedLink, ResponsiveImage, AspectRatioWrapper } from '../../../components';
import config from '../../../config';
import { formatMoney } from '../../../util/currency';
import { AiOutlineArrowRight } from 'react-icons/ai';

import css from './SectionNewListing.module.css';

const priceData = (price, intl) => {
  if (price && price.currency === config.currency) {
    const formattedPrice = formatMoney(intl, price);
    return { formattedPrice, priceTitle: formattedPrice };
  } else if (price) {
    return {
      formattedPrice: intl.formatMessage(
        { id: 'ListingCard.unsupportedPrice' },
        { currency: price.currency }
      ),
      priceTitle: intl.formatMessage(
        { id: 'ListingCard.unsupportedPriceTitle' },
        { currency: price.currency }
      ),
    };
  }
  return {};
};

// Thumbnail image for the search "card"
class ListingImage extends Component {
  render() {
    return <ResponsiveImage {...this.props} />;
  }
}

// Load the image only if it's close to viewport (user has scrolled the page enough).
const LazyImage = lazyLoadWithDimensions(ListingImage, { loadAfterInitialRendering: 3000 });

// Create a "card" that contains a link to filtered search on SearchPage.
const FilterLink = props => {
  const { listing, intl } = props;
  const currentListing = ensureListing(listing);
  const id = currentListing.id.uuid;
  const { title = '', price } = currentListing.attributes;
  const slug = createSlug(title);
  const author = ensureUser(listing.author);
  const authorName = author.attributes.profile.displayName;
  const abbName = author.attributes.profile.abbreviatedName;
  const firstImage =
    currentListing.images && currentListing.images.length > 0 ? currentListing.images[0] : null;
  const nameText = <span className={css.searchName}>{title}sasdasdasdssss</span>;
  const { aspectWidth = 1, aspectHeight = 1, variantPrefix = 'listing-card' } = config.listing;
  const variants = firstImage
    ? Object.keys(firstImage?.attributes?.variants).filter(k => k.startsWith(variantPrefix))
    : [];
  const { formattedPrice, priceTitle } = priceData(price, intl);

  return (
    <NamedLink name="ListingPage" params={{ id, slug }} className={css.searchLink}>
      <div className={css.imageWrapper}>
        <div className={css.aspectWrapper}>
          <LazyImage
            variants={variants}
            image={firstImage}
            alt={title}
            className={css.searchImage}
          />
        </div>
      </div>
      <div className={css.linkText}>
        <FormattedMessage
          id="SectionFilteredSearches.filteredSearch"
          values={{ filter: nameText }}
        />
        <div className={css.priceValue} title={priceTitle}>
          {formattedPrice}
        </div>
        <div className={css.authorInfo}>
          <FormattedMessage id="ListingCard.author" values={{ authorName }} />
        </div>
      </div>
    </NamedLink>
  );
};

const FilterLink2 = props => {
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
  const { rootClassName, className, listings, intl } = props;
  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <div className={css.titleWrapper}>
        <div className={css.title}>
          <FormattedMessage id="SectionNewListing.title" />
        </div>
        <NamedLink name="LoginPage" className={css.viewMoreLink}>
          <span className={css.viewMore}>
            <FormattedMessage id="LandingPageNewListingLink" className={css.loginLink} />
            <AiOutlineArrowRight size={20} className={css.icon} />
          </span>
        </NamedLink>
      </div>

      <div className={css.filteredSearches}>
        <FilterLink2
          name="CPUs"
          image={
            'https://images.unsplash.com/photo-1661956602139-ec64991b8b16?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=730&q=80'
          }
          link="http://localhost:3000/s?pub_brand=cpu"
        />
        <FilterLink2
          name="CPUs"
          image={
            'https://images.unsplash.com/photo-1661956602139-ec64991b8b16?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=730&q=80'
          }
          link="http://localhost:3000/s?pub_brand=cpu"
        />
        {listings.map(l => (
          <FilterLink key={l.id.uuid} listing={l} intl={intl} />
        ))}
      </div>
    </div>
  );
};

SectionNewListing.defaultProps = {
  listings: [],
  rootClassName: null,
  className: null,
};

SectionNewListing.propTypes = {
  listings: array,
  intl: intlShape.isRequired,
  rootClassName: string,
  className: string,
};

export default injectIntl(SectionNewListing);
