import React from 'react';
import { func, number } from 'prop-types';
import { Header } from 'semantic-ui-react';
import Rating from 'react-star-rating-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons/index';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons/index';
import styled from 'styled-components';

const RatingFilter = ({ rating, filterMovies }) => {
	const handleRatingChange = e => filterMovies(parseFloat(e.target.value, 10));

	return (
		<StyledRatingFilter>
			<Header>Rating</Header>
			<input type="range" min={0} max={10} step={0.5} value={rating} onChange={handleRatingChange} />
			<Rating
				name="movie-rating"
				starCount={10}
				emptyStarColor="#ffb400"
				value={rating}
				renderStarIcon={(i, value) => <FontAwesomeIcon icon={i <= value ? faStar : faStarEmpty} size="2x" />}
				renderStarIconHalf={() => <FontAwesomeIcon icon={faStarHalf} size="2x" />}
				editing={false}
			/>
		</StyledRatingFilter>
	);
};

RatingFilter.propTypes = {
	rating: number.isRequired,
	filterMovies: func.isRequired
};

const StyledRatingFilter = styled.div`
	margin: 20px 0;

	input {
		display: block;
		margin-bottom: 20px;
	}
`;

export default RatingFilter;
