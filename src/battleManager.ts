import { computed, ref } from "vue";
import { useEnemy } from "./stores/enemy";
import { usePlayer } from "./stores/player";

const player = usePlayer();
const enemy = useEnemy();

const playerTurnInterval = ref(-1);
const enemyTurnInterval = ref(-1);
const battling = computed(() => playerTurnInterval.value !== -1 || enemyTurnInterval.value !== -1);

function playerTurn() {
	enemy.damageFor(player.attack.value);
	checkEnd();
}

function enemyTurn() {
	player.damageFor(enemy.attack.value);
	checkEnd();
}

function checkEnd() {
	if (!enemy.isDead.value && !player.isDead.value) return;

	stopBattle();

	if (enemy.isDead.value) {
		enemy.regenerate();
	}
}

function startBattle() {
	if (battling.value) return;

	if (player.isDead.value) {
		player.hp.value = player.hpMax.value;
	}

	playerTurnInterval.value = setInterval(playerTurn, player.attackCooldown.value);
	enemyTurnInterval.value = setInterval(enemyTurn, enemy.attackCooldown.value);
}

function stopBattle() {
	clearInterval(playerTurnInterval.value);
	clearInterval(enemyTurnInterval.value);
	playerTurnInterval.value = -1;
	enemyTurnInterval.value = -1;
}

export {
	battling,

	startBattle,
}