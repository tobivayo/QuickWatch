import { IMovie } from "../types/IMovie";

export const MOVIES: IMovie[] = [
    {
        title: 'Tenet',
        description: 'Armed with only one word, Tenet, and fighting for the survival of the entire world, a protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time.',
        rating: 7.8,
        duration: '2h 30 min',
        genre: ['Action', 'Sci-Fi'],
        releaseDate: new Date("2020-09-03"),
        trailerUrl: 'https://www.youtube.com/watch?v=LdOM0x0XDMo'
    },
    {
        title: "Spider-Man: Into the Spider-Verse",
        description: "Teen Miles Morales becomes the Spider-Man of his universe, and must join with five spider-powered individuals from other dimensions to stop a threat for all realities.",
        rating: 8.4,
        duration: "1h 57min",
        genre: ["Action", "Animation", "Adventure"],
        releaseDate: new Date("2018-12-14"),
        trailerUrl: "https://www.youtube.com/watch?v=tg52up16eq0"
    },
    {
        title: "Knives Out",
        description: "A detective investigates the death of a patriarch of an eccentric, combative family.",
        rating: 7.9,
        duration: "2h 10min",
        genre: ["Comedy", "Crime", "Drama"],
        releaseDate: new Date("2019-11-27"),
        trailerUrl: "https://www.youtube.com/watch?v=qGqiHJTsRkQ"
    },
    {
        title: "Guardians of the Galaxy",
        description: "A group of intergalactic criminals must pull together to stop a fanatical warrior with plans to purge the universe.",
        rating: 8.0,
        duration: "2h 1min",
        genre: ["Action", "Adventure", "Comedy"],
        releaseDate: new Date("2014-08-01"),
        trailerUrl: "https://www.youtube.com/watch?v=d96cjJhvlMA"
    },
    {
        title: "Avengers: Age of Ultron",
        description: "When Tony Stark and Bruce Banner try to jump-start a dormant peacekeeping program called Ultron, things go horribly wrong and it's up to Earth's mightiest heroes to stop the villainous Ultron from enacting his terrible plan.",
        rating: 7.3,
        duration: "2h 21min",
        genre: ["Action", "Adventure", "Sci-Fi"],
        releaseDate: new Date("2015-05-01"),
        trailerUrl: "https://www.youtube.com/watch?v=tmeOjFno6Do"
    }
]
