<template>
	<transition name="showVoteSlider" :duration="{ enter: timeline.showVoteSlider, leave: 0 }">
		<div class="voteSlider" v-if="enabled">
			<div class="voteSlider-inner" :style="[style, {}]">
				
				<v-touch @panmove="onPanMove" @panend="onPanEnd">
					<div class="voteSlider-handle__wrap accept" :class="{ active: vote.accept.state }">
						<div class="voteSlider-handle">
							<div class="text">{{ vote.accept.text }}</div>
							<i>
								<svg fill="#FFF" enable-background="new 0 0 64 64" viewBox="0 0 64 64" width="100%">
									<polygon points="32,15 17.921,46.677 32,39.638 46.079,46.677" />
								</svg>
							</i>
						</div>
					</div>
				</v-touch>

				<v-touch @panmove="onPanMove" @panend="onPanEnd">
					<div class="voteSlider-handle__wrap cancel" :class="{ active: vote.cancel.state }">
						<div class="voteSlider-handle">
							<div class="text">{{ vote.cancel.text }}</div>
							<i>
								<svg fill="#FFF" enable-background="new 0 0 64 64" viewBox="0 0 64 64" width="100%">
									<polygon points="32,15 17.921,46.677 32,39.638 46.079,46.677" />
								</svg>
							</i>
						</div>
					</div>
				</v-touch>
				
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
			'enabled': {
				'type': Boolean,
				'required': true,
			},
			'onVote': {
				'type': Function,
				'required': true,
			},
		},
		'computed': {
			
		},
		data () {
			return {
				'vote': {
					'panning': false,
					'done': false,
					'accept': {
						'text': 'עבר',
						'state': false,
					},
					'cancel': {
						'text': 'לא עבר',
						'state': false,
					},
				},
				'style': {
																// - inline css object for handle container
				},
				'timeline': {
					'showVoteSlider': 2000,                     // - animation duration for showVoteSlider
				},
			}
		},
		mounted () {
		
		},
		'methods': {
			onPanMove(props) {
				
				if (this.vote.done) {
					return false;
				}

				const maxDelta = 80;
				const polarity = props.deltaX >= 0 ? '' : '-';
				const delta = Math.abs(props.deltaX);
				const translateX = `${polarity}${Math.min(delta, maxDelta)}`;
				
				this.vote.panning = true;

				this.style = {
					'transform': `translateX(${translateX}px)`,
					'transition': '10ms ease',
				};

				if (Math.abs(translateX) === maxDelta) {
					this.setVoteResults(translateX);
				}
			},
			onPanEnd() {
				if (this.vote.done) {
					return false;
				}

				this.vote.panning = false;
				this.style = { 'transform': 'translateX(0)', 'transition': '300ms ease' };
			},
			setVoteResults(translateX) {
				const result = translateX > 0 ? 'accept' : 'cancel';
				this.vote.panning = false;
				this.vote.done = true;
				this.vote[result].state = true;
				this.onVote();  // prop parent func
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
