import classNames from 'classnames';
import { Select } from '../../../ui/hooks/use-select';

export function SortSelect({ select }: { select: Select }) {
  return (
    <form
      className="places__sorting"
      action="#"
      method="get"
      onClick={() => select.setOpen((prev) => !prev)}
      data-testid="offers-sort-select"
    >
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
        {select.getSelectedOption()?.render()}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={classNames(
          'places__options places__options--custom',
          select.open && 'places__options--opened'
        )}
        data-testid="offers-sort-select-options"
      >
        {select.getOptions().map((o) => (
          <li
            key={o.value}
            className={classNames(
              'places__option',
              o.selected && 'places__option--active'
            )}
            tabIndex={0}
            onClick={() => select.setSelectedOption(o)}
          >
            {o.render()}
          </li>
        ))}
      </ul>
    </form>
  );
}
