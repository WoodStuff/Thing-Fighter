import { useEnemy } from "./stores/enemy";
import { usePlayer } from "./stores/player";

const player = usePlayer();
const enemy = useEnemy();

export function playerTurn() {
	enemy.damageFor(player.attack.value);
}

export function enemyTurn() {
	player.damageFor(enemy.attack.value);
}