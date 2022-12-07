import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import config from '../../config';
import { injectIntl, intlShape } from '../../util/reactIntl';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import { getListingsById } from '../../ducks/marketplaceData.duck';

import {
  Page,
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
} from '../../components';
import TopbarContainer from '../../containers/TopbarContainer/TopbarContainer';

import facebookImage from '../../assets/sneakertimeFacebook-1200x630.jpg';
import twitterImage from '../../assets/sneakertimeTwitter-600x314.jpg';

import SectionHero from './SectionHero/SectionHero';
import SectionFeaturedBrands from './SectionFeaturedBrands/SectionFeaturedBrands';
import SectionFilteredSearches from './SectionFilteredSearches/SectionFilteredSearches';
import css from './LandingPage.module.css';
import SectionNewListing from './NewListingsSlider/SectionNewListing';
import SectionHowItWorks from './SectionHowItWorks/SectionHowItWorks.js';

import { ListingCard } from '../../components';

export class LandingPageComponent extends Component {
  render() {
    const { scrollingDisabled, listings, history, intl, location } = this.props;

    const isMapVariant = false;

    const cardRenderSizes = isMapVariant => {
      if (isMapVariant) {
        // Panel width relative to the viewport
        const panelMediumWidth = 50;
        const panelLargeWidth = 62.5;
        return [
          '(max-width: 767px) 100vw',
          `(max-width: 1023px) ${panelMediumWidth}vw`,
          `(max-width: 1920px) ${panelLargeWidth / 2}vw`,
          `${panelLargeWidth / 3}vw`,
        ].join(', ');
      } else {
        // Panel width relative to the viewport
        const panelMediumWidth = 50;
        const panelLargeWidth = 62.5;
        return [
          '(max-width: 549px) 100vw',
          '(max-width: 767px) 50vw',
          `(max-width: 1439px) 26vw`,
          `(max-width: 1920px) 18vw`,
          `14vw`,
        ].join(', ');
      }
    };

    // Schema for search engines (helps them to understand what this page is about)
    // http://schema.org
    // We are using JSON-LD format
    const siteTitle = config.siteTitle;
    const schemaTitle = intl.formatMessage({ id: 'LandingPage.schemaTitle' }, { siteTitle });
    const schemaDescription = intl.formatMessage({ id: 'LandingPage.schemaDescription' });
    const schemaImage = `${config.canonicalRootURL}${facebookImage}`;
    return (
      <Page
        className={css.root}
        scrollingDisabled={scrollingDisabled}
        contentType="website"
        description={schemaDescription}
        title={schemaTitle}
        facebookImages={[{ url: facebookImage, width: 1200, height: 630 }]}
        twitterImages={[
          { url: `${config.canonicalRootURL}${twitterImage}`, width: 600, height: 314 },
        ]}
        schema={{
          '@context': 'http://schema.org',
          '@type': 'WebPage',
          description: schemaDescription,
          name: schemaTitle,
          image: [schemaImage],
        }}
      >
        <LayoutSingleColumn>
          <LayoutWrapperTopbar>
            <TopbarContainer />
          </LayoutWrapperTopbar>
          <LayoutWrapperMain>
            <div className={css.heroContainer}>
              <SectionHero
                rootClassName={css.heroRoot}
                className={css.hero}
                history={history}
                location={location}
              />
            </div>
            <ul className={css.sections}>
              <li className={css.section}>
                <div className={css.sectionContentFirstChild}>
                  <SectionFilteredSearches />
                </div>
              </li>
              <li className={css.section}>
                <div className={css.sectionContent}>
                  <SectionNewListing listings={listings} />
                </div>
              </li>
              <li className={css.section}>
                <SectionHowItWorks />
              </li>
              <li className={css.section}>
                <div className={css.sectionContent}>
                  <SectionNewListing listings={listings} />
                </div>
              </li>
              <li className={css.section}>
                <div className={css.sectionContentFirstChild}>
                  <SectionFeaturedBrands />
                </div>
              </li>
            </ul>
          </LayoutWrapperMain>
          <LayoutWrapperFooter>
            <Footer />
          </LayoutWrapperFooter>
        </LayoutSingleColumn>
      </Page>
    );
  }
}

const { bool, object, array } = PropTypes;

LandingPageComponent.propTypes = {
  scrollingDisabled: bool.isRequired,
  listings: array,

  // from withRouter
  history: object.isRequired,
  location: object.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const { currentPageResultIds } = state.LandingPage;
  const pageListings = getListingsById(state, currentPageResultIds);
  return {
    listings: pageListings,
    scrollingDisabled: isScrollingDisabled(state),
  };
};

// Note: it is important that the withRouter HOC is **outside** the
// connect HOC, otherwise React Router won't rerender any Route
// components since connect implements a shouldComponentUpdate
// lifecycle hook.
//
// See: https://github.com/ReactTraining/react-router/issues/4671
const LandingPage = compose(
  withRouter,
  connect(mapStateToProps),
  injectIntl
)(LandingPageComponent);

export default LandingPage;
