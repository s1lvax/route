export type ChessStats = {
	fide: number;
	chess_rapid: GameModeStats;
	chess_blitz: GameModeStats;
	chess_bullet: GameModeStats;
	tactics: { highest: { rating: number; date: number }; lowest: { rating: number; date: number } };
	puzzle_rush?: object;
};

type GameModeStats = {
	last: Rating;
	best: Rating;
	record: GameRecord;
};

type Rating = {
	rating: number;
	date: number;
	rd?: number;
	game?: string;
};

type GameRecord = {
	win: number;
	loss: number;
	draw: number;
};
