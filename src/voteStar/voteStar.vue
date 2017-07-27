<template>
	<div class="starVote" :class="{ 'enable-play': this.getEnablePlay() }">
		<div class="starVote-main">

			<CheckIn :onPass="onPass"></CheckIn>

			<div class="starVote-image" :style="[{ backgroundImage: 'url(' + this.image.src + ')' }]"></div>
			
			<!--<div v-for="state in states">
				<transition name="fade" v-if="state.state">
					<div class="starVote-state" v-if="state.state">
						{{ state.text }}
					</div>
				</transition>
			</div>-->
			<transition-group name="fadeInOut">
				<div class="starVote-state" v-for="state in states" v-if="state.state" v-bind:key="state.text">
					{{ state.text }}
				</div>
			</transition-group>
			
		</div>

		<!-- NOTE: unnecessary; gives just a space for dev view -->
		<div class="starVote-buttons">
			<transition name="fade">
				<!--<button v-show="enablePlay" :disabled="checkIn.done" class="checkIn-button">checkIn</button>-->
			</transition>
		</div>

	</div>
</template>

<script>
	import CheckIn from './checkIn.vue';

	export default {
		'components': {
			CheckIn,
		},
		'props': {
			data: Object,
			index: Number
		},
		'computed': {
		
		},
		data () {
			return {
				'states': {
					'ready': {
						'state': false, // - ready to enter
						'text': 'מוכנים להצבעה?',
					},
					'expired': {
						'state': false, // - expired time to enter
						'text': 'פספסתם את ההצבעה...',
						'timeout': setTimeout(() => {}, 0),
					},
					'voting': {
						'state': false,
						'text': 'הצביעו עכשיו!',
					},
					'voted': {
						'state': false,
						'text': 'הצבעתך נקלתה!',
					},
				},
				'timeline': {
					'readyState': 2000,
					'expiredState': 30000,
				},
				'image': {
					'src': '/assets/images/singer.jpg'
				},
			}
		},
		mounted () {
			this.setState({ 'key': 'ready', 'value': true, 'delay': true });
		},
		'methods': {
			getEnablePlay() {
				const { ready, expired, voting, voted } = this.states;
//				console.log(ready.state, expired.state, voting.state, voted.state);
				return (ready.state && !expired.state) || voting.state || voted.state;
			},
			setState({ key, value, delay = false }) {
				const { states } = this;
				const updateStates = (key) => {
					Object.keys(states).map((statesKey, index) => {
						statesKey === key
								? states[statesKey].state = value
								: states[statesKey].state = false
					});
					this.setExpired(key);
				};
				if (delay) {
					setTimeout(() => updateStates(key), this.timeline[`${key}State`]);
				} else {
					updateStates(key);
				}
			},
			setExpired(key) {
				if (key === 'ready') {
					this.states.expired.timeout = setTimeout(() => {
						this.setState({ 'key': 'expired', 'value': true });
					}, this.timeline.expiredState);
				} else if (key === 'voting') {
					clearTimeout(this.states.expired.timeout)
				}
			},
			onPass() {
				// for checkIn component
				this.setState({ 'key': 'voting', 'value': true });
			},
		}
	}
</script>

<style lang="scss">
	// TODO: scoped styles and separate css for each component
	@import 'voteStar.scss';
</style>
