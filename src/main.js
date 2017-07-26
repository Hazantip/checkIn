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

	const checkIn = new Vue({
		el: '#checkIn',
		template: '<checkIn />',
		components: {
			'checkIn': voteComponent
		}
	});

}

document.addEventListener('DOMContentLoaded', DOMLoaded);
