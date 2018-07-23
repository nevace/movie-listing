import React, { Component } from 'react';
import { Container, Dimmer, Divider, Grid, Header, Loader } from 'semantic-ui-react';
import axios from 'axios';
import MovieList from './MovieList';
import GenreFilter from './GenreFilter';
import RatingFilter from './RatingFilter';
import styled from 'styled-components';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
axios.defaults.params = { api_key: 'dd9605af3c921617e4bb220e6c53a418' };

export default class App extends Component {
	state = {
		movies: [],
		filteredMovies: [],
		genreFilters: [],
		selectedGenres: [],
		rating: 3,
		imagePath: ''
	};

	async componentDidMount() {
		const genres = new Map();
		const genreFilters = [];
		let movies = [];
		let response = null;

		try {
			response = await Promise.all([
				axios.get('movie/now_playing'),
				axios.get('genre/movie/list'),
				axios.get('configuration')
			]);
		} catch (e) {
			console.error(e);
		}

		if (response) {
			// create a map of genreId => genre, create filters from genres
			response[1].data.genres.forEach(({ id, name }) => {
				genres.set(id, name);
				genreFilters.push({ key: id, text: name, value: name });
			});

			// map relevant data and get genres from ids
			movies = response[0].data.results.map(({ title, poster_path, popularity, genre_ids, vote_average }) => ({
				title,
				poster_path,
				popularity,
				genres: genre_ids.map(id => genres.get(id)),
				vote_average: Math.round(vote_average * 2) / 2 // round to nearest 0.5 for rating filter
			}));
		}
		const { secure_base_url, poster_sizes } = response[2].data.images;

		this.setState({ movies, genreFilters, imagePath: `${secure_base_url}${poster_sizes[4]}` }, () =>
			this.filterMovies(this.state.rating)
		);
	}

	filterMovies = rating => {
		// creates an array of booleans determined by whether the movie genre is a match to the user selected genres
		// if false is not in this array of booleans and rating >= user selected, the movie is a match
		const filter = (selectedGenres, rating) => {
			return this.state.movies
				.filter(
					({ genres, vote_average }) =>
						!selectedGenres.map(val => genres.includes(val)).includes(false) && vote_average >= rating
				)
				.sort((a, b) => b.popularity - a.popularity);
		};

		// either filter by rating or genre
		if (rating !== undefined) {
			this.setState({ filteredMovies: filter(this.state.selectedGenres, rating), rating });
		} else {
			return (e, { value }) => {
				this.setState({ filteredMovies: filter(value, this.state.rating), selectedGenres: value });
			};
		}
	};

	render() {
		const { filteredMovies, genreFilters, rating, imagePath, movies } = this.state;

		return !movies.length ? (
			<Dimmer active inverted>
				<Loader />
			</Dimmer>
		) : (
			<StyledContainer>
				<Grid.Row>
					<Grid.Column>
						<Header as="h1">Movies</Header>
						<Divider />
						<GenreFilter genreFilters={genreFilters} filterMovies={this.filterMovies()} />
						<RatingFilter rating={rating} filterMovies={this.filterMovies} />
						<MovieList movies={filteredMovies} imagePath={imagePath} />
					</Grid.Column>
				</Grid.Row>
			</StyledContainer>
		);
	}
}

const StyledContainer = styled(Container)`
	margin-top: 30px;
`;
