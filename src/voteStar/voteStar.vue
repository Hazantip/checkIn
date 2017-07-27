<template>
	<div class="starVote" :class="{ 'enable-play': voteStar.enable }">
		<div class="starVote-main">

			<CheckIn :data="sliderData"></CheckIn>

			<div class="starVote-image" :style="[{ backgroundImage: 'url(' + this.image.src + ')' }]"></div>
			
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
				'voteStar': {
					'enable': false,
					'done': false,
				},
				'states': {
					'ready': {
						'state': false, // - ready to enter
						'text': 'מוכנים להצבעה?',
					},
					'expired': {
						'state': false, // - expired time to enter
						'text': 'פספסתם את ההצבעה...',
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
					'checkInEnableDelay': 2000,
				},
				'image': {
					'src': '/assets/images/singer.jpg'
				},
				'sliderData': {

				},
				...this.data,
			}
		},
		mounted () {
			setTimeout(() => {
				this.voteStar.enable = true;
			}, this.timeline.checkInEnableDelay); // NOTE: Only for dev
		},
		'methods': {

		}
	}
</script>

<style lang="scss">
	// TODO: scoped styles and separate css for each component
	@import 'voteStar.scss';
</style>
