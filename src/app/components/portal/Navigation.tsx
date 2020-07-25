import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '@app/theme';
import { useIntl } from 'react-intl';

import './Navigation.css';

const Navigation = ({ className = '' }: { className?: string }) => {
  const { formatMessage } = useIntl();

  return (
    <div className={`${className} navigation`}>
      <nav className="navigation__content">
        <NavLink
          to="/"
          exact
          className="navigation__element navigation__element--home"
        >
          Camp
        </NavLink>
        {['tickets', 'notifications'].map(type => (
          <NavLink
            to={`/${type}/`}
            exact
            className={`navigation__element navigation__element--${type}`}
            activeClassName="navigation__element--active"
          >
            <Icon icon={`mdi/${type}`} className="navigation__element-icon" />
            <span className="navigation__element-text">
              {formatMessage({ id: `navigation.${type}` })}
            </span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Navigation;
