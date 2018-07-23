import React from 'react';
import { Card, Grid, Image } from 'semantic-ui-react';
import Rating from 'react-star-rating-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons/index';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons/index';
import { arrayOf, number, shape, string } from 'prop-types';

const MovieList = ({ movies, imagePath }) => {
	return !!movies.length ? (
		<Grid stackable columns={3}>
			{movies.map(({ title, genres, poster_path, vote_average }) => (
				<Grid.Column key={title}>
					<Card fluid>
						<Image src={`${imagePath}${poster_path}`} />
						<Card.Content>
							<Card.Header>{title}</Card.Header>
						</Card.Content>
						<Card.Content extra>
							<Rating
								name="movie-rating2"
								starCount={10}
								emptyStarColor="#ffb400"
								value={vote_average}
								renderStarIcon={(i, value) => <FontAwesomeIcon icon={i <= value ? faStar : faStarEmpty} />}
								renderStarIconHalf={() => <FontAwesomeIcon icon={faStarHalf} />}
								editing={false}
							/>
						</Card.Content>
						<Card.Content extra>{genres.join(', ')}</Card.Content>
					</Card>
				</Grid.Column>
			))}
		</Grid>
	) : null;
};

MovieList.propTypes = {
	movies: arrayOf(
		shape({
			title: string.isRequired,
			genres: arrayOf(string).isRequired,
			poster_path: string.isRequired,
			vote_average: number.isRequired
		})
	).isRequired,
	imagePath: string.isRequired
};

export default MovieList;
