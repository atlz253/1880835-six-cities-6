import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useCurrentCity } from '../../hooks/use-current-city';
import RouterPaths from '../../../router/constants/router-paths';
import { useCitiesQuery } from '../../hooks/use-cities-query';

type NavbarVariant = 'locations';
function navbarVariant(variant: NavbarVariant) {
  switch (variant) {
    case 'locations':
      return {
        list: 'locations__list',
        link: 'locations__item-link',
      };
    default:
      return {
        list: '',
        link: '',
      };
  }
}

export function Navbar({ variant }: { variant: NavbarVariant }) {
  const { data: cities = [] } = useCitiesQuery();
  const currentCity = useCurrentCity();
  const classes = navbarVariant(variant);

  return (
    <ul
      className={classNames('tabs__list', classes.list)}
      data-testid="cities-navbar"
    >
      {cities.map((c) => (
        <li key={c.name} className="locations__item">
          <Link
            className={classNames(
              'tabs__item',
              classes.link,
              c.name === currentCity.name ? 'tabs__item--active' : null
            )}
            to={RouterPaths.city({ city: c.name })}
          >
            <span>{c.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
