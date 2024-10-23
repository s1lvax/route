export interface CurrentlyPlaying {
	song: string;
	artist: string;
	songUrl: string;
	artistUrl: string;
	albumImageUrl: string;
}

export interface Artist {
	name: string;
	external_urls: {
		spotify: string;
	};
}
