<template>
	<transition name="showVoteSlider" :duration="{ enter: timeline.showVoteSlider, leave: 0 }">
		<div class="voteSlider" v-if="enabled">
			<div class="voteSlider-inner" :style="[style, {}]">

				<v-touch @panmove="onPanMove" @panend="onPanEnd">
					<div class="voteSlider-handle__wrap cancel" :class="{ active: vote.cancel.state }">
						<div class="voteSlider-handle">
							<div class="text">{{ vote.cancel.text }}</div>
							<i class="arrow">
								<svg fill="#FFF" enable-background="new 0 0 64 64" viewBox="0 0 64 64" width="100%">
									<polygon points="32,15 17.921,46.677 32,39.638 46.079,46.677" />
								</svg>
							</i>
						</div>
					</div>
				</v-touch>
				
				<v-touch @panmove="onPanMove" @panend="onPanEnd">
					<div class="voteSlider-handle__wrap accept" :class="{ active: vote.accept.state }">
						<div class="voteSlider-handle">
							<div class="text">{{ vote.accept.text }}</div>
							<i class="arrow">
								<svg fill="#FFF" enable-background="new 0 0 64 64" viewBox="0 0 64 64" width="100%">
									<polygon points="32,15 17.921,46.677 32,39.638 46.079,46.677" />
								</svg>
							</i>
							<i class="plane">
								<svg width="100%" viewBox="0 0 53 58">
									<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
										<g fill-rule="nonzero" fill="#3FAEFF">
											<path d="M52.117663,40.4191032 L52.117663,34.7562257 L30.5752219,20.5990319 L30.5752219,5.02611875 C30.5752219,2.76096775 28.6902583,0.778960623 26.5360141,0.778960623 C24.38177,0.778960623 22.4968064,2.76096775 22.4968064,5.02611875 L22.4968064,20.5990319 L0.95436522,34.7562257 L0.95436522,40.4191032 L22.4968064,33.3405063 L22.4968064,48.9134194 L17.1111961,53.1605776 L17.1111961,57.4077357 L26.5360141,54.576297 L35.9608322,57.4077357 L35.9608322,53.1605776 L30.5752219,48.9134194 L30.5752219,33.3405063 L52.117663,40.4191032 Z" ></path>
										</g>
									</g>
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
				const result = translateX < 0 ? 'accept' : 'cancel';
				this.vote.panning = false;
				this.vote.done = true;
				this.vote[result].state = true;
				this.onVote();  // prop parent func
				console.log(this);
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
