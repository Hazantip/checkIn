<template>
	<transition name="checkInOut" :duration="{ enter: 0, leave: timeline.checkInPass }">
		<div class="checkIn" v-if="!checkIn.pass">
			<div class="checkIn-slider">
				<div class="checkIn-slider__inner" ref="inner">
					<transition name="fade" :duration="{ enter: 0 }">
						<div v-if="!isExpired" class="checkIn-slider__text" :style="styleText">{{ checkIn.text }}</div>
					</transition>
					<transition name="fade">
						<div v-if="isExpired" class="checkIn-slider__text" :style="styleText">{{ checkIn.textExpired }}</div>
					</transition>
					<v-touch @panmove="onPanMove" @panend="onPanEnd">
						<span
							class="checkIn-slider__handle"
							:class="{'animate': !checkIn.panning}"
							:style="[style, {}]"
						></span>
					</v-touch>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import Vue from 'vue';
	import VueTouch from 'vue-touch';

	VueTouch.config.pan = {
		threshold: 0,
	};
	Vue.use(VueTouch);
	
	export default {
		'components': {
			
		},
		'props': {
			'onPass': {
				'type': Function,
				'required': true,
			},
			'isExpired': {
				'type': Boolean,
				'required': true,
			},
		},
		'computed': {
			
		},
		data () {
			return {
				'checkIn': {
					'pass': false,                          // - should/able to pass
					'passed': false,                        // - checkIn pass and component unmounted
					'panning': false,                       // - state for indicate is pan event calling
					'text': 'החליקו לכניסה להצבעה',
					'textExpired': 'לא ניתן להיכנס להצבעה',
				},
				'style': {},								// - inline css object for handle
				'styleText': {},							// - inline css object for text
				'timeline': {
					'checkInPass': 1000,                    // - animation duration for pass checkIn
				},
			}
		},
		mounted () {
			console.log(this);
		},
		'methods': {
			onPanMove(props) {
				const totalWidth = this.$refs.inner.getBoundingClientRect().width;
				const handleSize = props.target.getBoundingClientRect().width;
				const delta = Math.max(props.deltaX, 0);
				const maxDelta = totalWidth - handleSize;
				const translateX = Math.min(delta, maxDelta);
				const transition = '10ms linear';
				const pointToHideText = 0.5;

				this.checkIn.panning = true;

				this.style = {
					'transform': `translateX(${translateX}px)`,
					transition,
				};
				
				this.styleText = {
					'opacity': pointToHideText - (translateX / maxDelta),
					transition,
				};

				if (translateX === maxDelta) {
					this.passCheckIn();
				}
			},
			onPanEnd() {
				const transition = '300ms ease';
				
				this.checkIn.panning = false;
				this.style = { 'transform': 'translateX(0)', transition };
				this.styleText = { 'opacity': 1, transition };
			},
			passCheckIn() {
				this.checkIn.pass = true;
				setTimeout(() => {
					this.checkIn.passed = true;
					this.onPass(); // - parent prop
				}, this.timeline.checkInPass);
			},
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
