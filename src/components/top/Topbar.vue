<script setup lang="ts">
import ZoneInfo from './ZoneInfo.vue';
import EnemyLine from './EnemyLine.vue';
</script>

<template>
	<div class="topbar">
		<ZoneInfo />
		<EnemyLine />
	</div>
</template>

<style lang="scss" scoped>
.topbar {
	position: absolute;
	top: 0;
	left: 0;
}
</style>