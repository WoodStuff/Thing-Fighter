<script setup lang="ts">
import { useEnemy } from '@/stores/enemy';

const { hpMax, hp, attack } = useEnemy();
</script>

<template>
	<div>
		<h1>Enemy</h1>
		<p>HP: {{ hp }}/{{ hpMax }}</p>
		<p>{{ attack }} DMG</p>
	</div>
</template>