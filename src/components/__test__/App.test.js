import React from 'react';
import App from '../App';
import { movies } from './fixtures';

describe('<App />', () => {
	let wrapper;

	sandbox.stub(App.prototype, 'componentDidMount');

	beforeEach(() => {
		wrapper = mount(<App />);
	});

	describe('filterMovies', () => {
		it('should return a click handler function if called with no args', () => {
			expect(wrapper.instance().filterMovies()).to.be.a('function');
		});

		it('should filter by genre when calling the returned click handler function', () => {
			wrapper.setState({ movies });
			wrapper.instance().filterMovies()(null, { value: ['Action', 'Adventure'] });

			// only movies that include both Action and Adventure
			expect(
				wrapper
					.state('filteredMovies')
					.find(({ genres }) => !genres.includes('Action') && !genres.includes('Adventure'))
			).to.not.exist;
		});

		it('should filter by rating if called with arg', () => {
			wrapper.setState({ movies });
			wrapper.instance().filterMovies(8);

			expect(wrapper.state('filteredMovies').filter(({ vote_average }) => vote_average < 8)).to.be.empty;
			expect(wrapper.state('filteredMovies').filter(({ vote_average }) => vote_average >= 8)).to.have.length(2);
		});
	});
});
