// - global css
import Vue from 'vue';
import voteComponent from './checkIn/checkIn.vue';
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
	// TODO: add some fun animations
	// TODO: should return/have props: 1) enable checkIn 2) checkIn done 3) panning

	const checkIn = new Vue({
		el: '#checkIn',
		template: '<checkIn />',
		components: {
			'checkIn': voteComponent
		}
	});

}

document.addEventListener('DOMContentLoaded', DOMLoaded);
