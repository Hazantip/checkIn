<template>
	<div>
		<div class="checkIn-scale">
			<div class="checkIn-scale__inner" ref="inner">
				<div class="checkIn-scale__text">{{checkInText}}</div>
				<v-touch @panmove="onPanMove" @panend="onPanEnd">
					<span class="checkIn-scale__handle" :style="[style, {}]"></span>
				</v-touch>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
	import VueTouch from 'vue-touch';

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
				'checkInText': 'החלק לפתיחה',
				'style': {
				
				},					// - inline css object for handle
				...this.data					// - parent data
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

				this.style = {
					'transform': `translateX(${translateX}px)`,
					'transition': '10ms linear',
				};
			},
			onPanEnd() {
				this.style = {
					'transform': 'translateX(0)',
					'transition': '300ms ease-out',
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
