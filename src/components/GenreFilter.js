import React from 'react';
import { arrayOf, func, number, shape, string } from 'prop-types';
import { Dropdown } from 'semantic-ui-react';

const GenreFilter = ({ genreFilters, filterMovies }) => (
	<Dropdown
		className="icon"
		text="Genre"
		icon="filter"
		multiple
		scrolling
		options={genreFilters}
		labeled
		button
		onChange={filterMovies}
	/>
);

GenreFilter.propTypes = {
	genreFilters: arrayOf(shape({ key: number.isRequired, text: string.isRequired, value: string.isRequired }))
		.isRequired,
	filterMovies: func.isRequired
};

export default GenreFilter;
