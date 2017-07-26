<template>
	<div class="checkIn" :class="{ 'enable-play': enablePlay }">
		<div class="checkIn-main">

			<Slider :data="sliderData"></Slider>

			<div class="checkIn-image" :style="[{ backgroundImage: 'url(' + this.image.src + ')' }]"></div>
			
		</div>

		<div class="checkIn-button__wrap">
			<transition name="fade">
				<!--<button v-show="enablePlay" :disabled="checkIn.done" class="checkIn-button">checkIn</button>-->
			</transition>
		</div>

	</div>
</template>

<script>
	import Slider from './slider.vue';

	export default {
		'components': {
			Slider,
		},
		'props': {
			data: Object,
			index: Number
		},
		'computed': {
			
		},
		data () {
			return {
				'enablePlay': true,			// - enable/disable events
				'timeline': {
					'enablePlayDelay': 5000,
				},
				'image': {
					'src': '/assets/images/singer.jpg'
				},
				'sliderData': {
				
				},
				'checkIn': {
					'enable': true,
					'done': false,
				},
				...this.data,
			}
		},
		mounted () {

		},
		'methods': {

		}
	}
</script>

<style lang="scss">
	// TODO: scoped styles and separate css for each component
	@import 'checkIn.scss';
</style>
