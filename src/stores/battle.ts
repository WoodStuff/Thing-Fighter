import { computed, ref } from "vue";
import { useEnemyStore } from "./enemy";
import { usePlayerStore } from "./player";
import { defineStore } from "pinia";

export const useBattleStore = defineStore('battle', () => {
	const player = usePlayerStore();
	const enemy = useEnemyStore();

	const battling = computed(() => player.isAttacking || enemy.isAttacking);

	function playerTurn() {
		enemy.damageFor(player.attack);
		checkEnd();
	}

	function enemyTurn() {
		player.damageFor(enemy.attack);
		checkEnd();
	}

	function checkEnd() {
		if (!enemy.isDead && !player.isDead) return;

		if (player.isDead) {
			stopBattle();
		}

		if (enemy.isDead) {
			enemy.regenerate(enemyTurn);
		}
	}

	function startBattle() {
		if (battling.value) return;

		if (player.isDead) {
			player.hp = player.hpMax;
		}

		player.startAttacking(playerTurn);
		enemy.startAttacking(enemyTurn);
	}

	function stopBattle() {
		player.stopAttacking();
		enemy.stopAttacking();
	}

	return {
		battling,

		startBattle,
	}
});