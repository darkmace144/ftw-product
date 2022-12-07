import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { NamedLink } from '../../../components';
import { lazyLoadWithDimensions } from '../../../util/contextHelpers';
import { Carousel } from 'react-responsive-carousel';

import { FormattedMessage } from '../../../util/reactIntl';

import css from './SectionFeaturedBrands.module.css';

import AlienwareLogo from './images/Alienware-Logo.png';
import apple_logo from './images/apple_logo.png';
import ASUS_Logo from './images/ASUS_Logo.png';
import BenQ_Logo from './images/BenQ-Logo.png';
import Corsair_logo from './images/Corsair-logo.png';
import HyperX_logo from './images/HyperX-logo.png';
import Intel_logo from './images/Intel-logo.png';
import Logitech_Logo from './images/Logitech-Logo.png';
import Logo_Razer from './images/Logo_Razer.png';
import MSI_Logo from './images/MSI-Logo.png';
import Nvidia_logo from './images/Nvidia_logo.png';
import nzxt_logo from './images/nzxt-logo.png';
import Samsung from './images/Samsung.png';
import Steelseries_logo from './images/Steelseries-logo.png';

// Thumbnail image for the search "card"
class ThumbnailImage extends Component {
  render() {
    const { alt, ...rest } = this.props;
    return <img alt={alt} {...rest} />;
  }
}
// Load the image only if it's close to viewport (user has scrolled the page enough).
const LazyImage = lazyLoadWithDimensions(ThumbnailImage);

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
    </NamedLink>
  );
};

const SectionFeaturedBrands = props => {
  const sliderSetOne = [
    {
      image: AlienwareLogo,
      link: 'http://localhost:3000/s?pub_category=consoles',
    },
    {
      image: Nvidia_logo,
      link: 'http://localhost:3000/s?pub_category=consoles',
    },
    {
      image: Logitech_Logo,
      link: 'http://localhost:3000/s?pub_category=consoles',
    },
    {
      image: Samsung,
      link: 'http://localhost:3000/s?pub_category=consoles',
    },
    {
      image: Logo_Razer,
      link: 'http://localhost:3000/s?pub_category=consoles',
    },
    {
      image: Intel_logo,
      link: 'http://localhost:3000/s?pub_category=consoles',
    },
    {
      image: Steelseries_logo,
      link: 'http://localhost:3000/s?pub_category=consoles',
    },
  ];
  const sliderSetTwo = [
    {
      image: apple_logo,
      link: 'http://localhost:3000/s?pub_category=consoles',
    },
    {
      image: ASUS_Logo,
      link: 'http://localhost:3000/s?pub_category=consoles',
    },
    {
      image: BenQ_Logo,
      link: 'http://localhost:3000/s?pub_category=consoles',
    },
    {
      image: Corsair_logo,
      link: 'http://localhost:3000/s?pub_category=consoles',
    },
    {
      image: nzxt_logo,
      link: 'http://localhost:3000/s?pub_category=consoles',
    },
    {
      image: MSI_Logo,
      link: 'http://localhost:3000/s?pub_category=consoles',
    },
    {
      image: HyperX_logo,
      link: 'http://localhost:3000/s?pub_category=consoles',
    },
  ];

  return (
    <div className={css.wrapper}>
      <div className={css.title}>
        <FormattedMessage id="SectionFeaturedBrands.title" />
      </div>
      <div className={css.slideshow}>
        {sliderSetOne.map((item, index) => (
          <FilterLink key={index} image={item.image} link={item.link} />
        ))}

        {sliderSetOne.map((item, index) => (
          <FilterLink key={index} image={item.image} link={item.link} />
        ))}
      </div>
      <div className={css.slideshowTwo}>
        {sliderSetTwo.map((item, index) => (
          <FilterLink key={index} image={item.image} link={item.link} />
        ))}

        {sliderSetTwo.map((item, index) => (
          <FilterLink key={index} image={item.image} link={item.link} />
        ))}
      </div>
    </div>
  );
};

SectionFeaturedBrands.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionFeaturedBrands.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionFeaturedBrands;
