<template>
	<transition name="checkInOut" :duration="{ enter: 0, leave: timeline.checkInPass }">
		<div v-if="!checkIn.pass">
			<div class="checkIn-scale">
				<div class="checkIn-scale__inner" ref="inner">
					<div class="checkIn-scale__text" :style="[styleText, {}]">{{ checkIn.text }}</div>
					<v-touch @panmove="onPanMove" @panend="onPanEnd">
						<span
							class="checkIn-scale__handle"
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
			data: Object,
			index: Number
		},
		'computed': {
			
		},
		data () {
			return {
				'enablePlay': false,
				'checkIn': {
					'pass': false,                          // - should/able to pass
					'passed': false,                        // - component pass and already unmounted
					'panning': false,                       // - state for indicate is pan event called
					'text': 'החלק לפתיחה',
				},
				'style': {
															// - inline css object for handle
				},
				'styleText': {
															// - inline css object for text
				},
				'timeline': {
					'checkInPass': 3000,                    // - animation duration for pass checkIn
				},
				...this.data                                // - parent data
			}
		},
		mounted () {
		
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
				setTimeout(() => this.checkIn.passed = true, this.timeline.checkInPass);
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
