import { useEnemy } from "./stores/enemy";
import { usePlayer } from "./stores/player";

const player = usePlayer();
const enemy = useEnemy();

let playerTurnInterval = -1;
let enemyTurnInterval = -1;

function playerTurn() {
	enemy.damageFor(player.attack.value);
	checkEnd();
}

function enemyTurn() {
	player.damageFor(enemy.attack.value);
	checkEnd();
}

function checkEnd() {
	if (enemy.isDead.value) clearInterval(playerTurnInterval);
	if (player.isDead.value) clearInterval(enemyTurnInterval);
}

export function startBattle() {
	playerTurnInterval = setInterval(playerTurn, player.attackCooldown.value);
	enemyTurnInterval = setInterval(enemyTurn, enemy.attackCooldown.value);
}