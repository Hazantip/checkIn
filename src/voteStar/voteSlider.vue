<template>
	<transition name="showVoteSlider" :duration="{ enter: timeline.showVoteSlider, leave: 0 }">
		<div class="voteSlider" v-if="enabled">
			<div class="voteSlider-inner">
				<div class="voteSlider-handle__wrap accept">
					<div class="voteSlider-handle">
						text <i>--></i>
					</div>
				</div>
				<div class="voteSlider-handle__wrap cancel">
					<div class="voteSlider-handle">
						text <i><--</i>
					</div>
				</div>
			</div>
			<!--<div class="checkIn-slider">
				<div class="checkIn-slider__inner" ref="inner">
					<div class="checkIn-slider__text" :style="[styleText, {}]">{{ checkIn.text }}</div>
					<v-touch @panmove="onPanMove" @panend="onPanEnd">
						<span
							class="checkIn-slider__handle"
							:class="{'animate': !checkIn.panning}"
							:style="[style, {}]"
						></span>
					</v-touch>
				</div>
			</div>-->
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
			'enabled': {
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
					'passed': false,                        // - component pass and already unmounted
					'panning': false,                       // - state for indicate is pan event called
					'text': 'החליקו לכניסה להצבעה',
				},
				'style': {
															// - inline css object for handle
				},
				'styleText': {
															// - inline css object for text
				},
				'timeline': {
					'showVoteSlider': 2000,                    // - animation duration for showVoteSlider
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
