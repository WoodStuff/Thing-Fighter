<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue';

const { value, max } = defineProps<{
	value: number,
	max: number,
}>();

const diff = ref(0);
const heal = computed(() => diff.value > 0);

const show = ref(false);

watch(() => value, (newValue, oldValue) => {
	diff.value = newValue - oldValue;

	if (diff.value < max) {
		show.value = true;
		nextTick(() => show.value = false);
	}
})
</script>

<template>
	<Transition>
		<p
			class="damage-number"
			:class="{ heal }"
			v-if="show"
		>{{ diff }}</p>
	</Transition>
</template>

<style lang="scss" scoped>
.damage-number {
	position: absolute;
	top: 8px;
	z-index: -1;
	font-size: 1.1em;

	color: #660000;

	&.heal {
		color: #006600;

		&::before {
			content: '+';
		}
	}

	&.v-leave-active {
		transition: 0.5s ease;
	}

	&.v-leave-to {
		opacity: 0;
		top: -25px;
	}
}
</style>