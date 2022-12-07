import React from 'react';
import PropTypes from 'prop-types';
import { RiSecurePaymentFill, RiPercentLine } from 'react-icons/ri';
import { MdOutlineLocalOffer } from 'react-icons/md';
import { FormattedMessage } from '../../../util/reactIntl';

import css from './SectionHowItWorks.module.css';

const SectionHowItWorks = props => {
  return (
    <div className={css.wrapper}>
      <div className={css.card}>
        <div className={css.title}>
          <FormattedMessage id="SectionHowItWorks.cardTitle" />
        </div>
        <div className={css.steps}>
          <div className={css.step}>
            <h2 className={css.stepTitle}>
              <RiSecurePaymentFill size={400} className={css.icon} />
              <FormattedMessage id="SectionHowItWorks.part1Title" />
            </h2>
            <p>
              <FormattedMessage id="SectionHowItWorks.part1Text" />
            </p>
          </div>

          <div className={css.step}>
            <h2 className={css.stepTitle}>
              <RiPercentLine size={400} className={css.icon} />
              <FormattedMessage id="SectionHowItWorks.part2Title" />
            </h2>
            <p className={css.para}>
              <FormattedMessage id="SectionHowItWorks.part2Text" />
            </p>
          </div>

          <div className={css.step}>
            <h2 className={css.stepTitle}>
              <MdOutlineLocalOffer size={400} className={css.icon} />
              <FormattedMessage id="SectionHowItWorks.part3Title" />
            </h2>
            <p>
              <FormattedMessage id="SectionHowItWorks.part3Text" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

SectionHowItWorks.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionHowItWorks.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionHowItWorks;
