// - global css
import Vue from 'vue';
import voteStarComponent from './voteStar/voteStar.vue';
import './theme/theme.scss';

/**
 *
 */
function DOMLoaded() {

	const delay = (time) => (result) => new Promise(resolve => setTimeout(() => resolve(result), time));

	// Hammer Pan Events: pan, panstart, panmove, panend, pancancel, panleft, panright, panup, pandown
	// TODO(done): implement basic slide(checkIn) component
	// TODO(done): basic css
	// TODO(done): hide text while swipe
	// TODO(done): pass checkIn on end point
	// TODO(done): enable/disable states - implement & stylize
	// TODO(done): add some animations
	// TODO(done): should return/have props: 1) enable checkIn 2) checkIn done 3) panning ... etc

	const voteStar = new Vue({
		el: '#voteStar',
		template: '<voteStarComponent />',
		components: {
			voteStarComponent
		}
	});

}

document.addEventListener('DOMContentLoaded', DOMLoaded);
