import { computed, ref } from "vue";
import { useEnemyStore } from "./enemy";
import { usePlayerStore } from "./player";
import { defineStore } from "pinia";

export const useBattleStore = defineStore('battle', () => {
	const player = usePlayerStore();
	const enemy = useEnemyStore();

	const playerTurnInterval = ref(-1);
	const enemyTurnInterval = ref(-1);
	const battling = computed(() => playerTurnInterval.value !== -1 || enemyTurnInterval.value !== -1);

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
			stopIntervals();
		}

		if (enemy.isDead) {
			enemy.regenerate();
			stopIntervals();
			startIntervals();
		}
	}

	function startBattle() {
		if (battling.value) return;

		if (player.isDead) {
			player.hp = player.hpMax;
		}

		startIntervals();
	}

	function startIntervals() {
		if (battling.value) return;
		
		playerTurnInterval.value = setInterval(playerTurn, player.attackCooldown);
		enemyTurnInterval.value = setInterval(enemyTurn, enemy.attackCooldown);
	}

	function stopIntervals() {
		clearInterval(playerTurnInterval.value);
		clearInterval(enemyTurnInterval.value);
		playerTurnInterval.value = -1;
		enemyTurnInterval.value = -1;
	}

	return {
		playerTurnInterval,
		enemyTurnInterval,
		battling,

		startBattle,
	}
});