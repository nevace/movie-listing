import React from 'react';
import RatingFilter from '../RatingFilter';
import { Header } from 'semantic-ui-react';
import Rating from 'react-star-rating-component';

describe('<RatingFilter />', () => {
	let wrapper;
	let filterMoviesSpy = sandbox.spy();

	beforeEach(() => {
		wrapper = mount(<RatingFilter filterMovies={filterMoviesSpy} rating={3} />);
	});

	it('should have correct children', () => {
		expect(wrapper.find(Header)).to.exist;
		expect(wrapper.find('[type="range"]')).to.exist;
		expect(wrapper.find(Rating)).to.exist;
	});

	it('should handle rating input changes', () => {
		wrapper.find('[type="range"]').simulate('change', { target: { value: '6' } });

		expect(filterMoviesSpy).to.have.been.calledWith(6);
	});
});
