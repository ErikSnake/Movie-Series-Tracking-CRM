





















const db = require('../models');
const Users = db.users;






const Franchises = db.franchises;

const Titles = db.titles;

const Seasons = db.seasons;

const Episodes = db.episodes;

const WatchEntries = db.watch_entries;

const WatchlistItems = db.watchlist_items;

const Tags = db.tags;

const TitleTags = db.title_tags;

const Attachments = db.attachments;







const FranchisesData = [
    
    {
    
        
        
            
                "name": "Marvel Cinematic Universe",
            
        
    
        
        
            
                "slug": "mcu",
            
        
    
        
        
            
                "description": "Connected superhero films and series from Marvel Studios.",
            
        
    
        
        
            
                // type code here for "images" field
            
        
    
        
        
            
                "universe": "Marvel",
            
        
    
        
        
            
                "sort_order": 1,
            
        
    
        
        
            
                "is_active": true,
            
        
    
    },
    
    {
    
        
        
            
                "name": "Star Wars",
            
        
    
        
        
            
                "slug": "star-wars",
            
        
    
        
        
            
                "description": "Space opera franchise spanning films and series across the galaxy.",
            
        
    
        
        
            
                // type code here for "images" field
            
        
    
        
        
            
                "universe": "Lucasfilm",
            
        
    
        
        
            
                "sort_order": 2,
            
        
    
        
        
            
                "is_active": true,
            
        
    
    },
    
    {
    
        
        
            
                "name": "The Lord of the Rings",
            
        
    
        
        
            
                "slug": "lotr",
            
        
    
        
        
            
                "description": "Epic fantasy stories set in Middle-earth.",
            
        
    
        
        
            
                // type code here for "images" field
            
        
    
        
        
            
                "universe": "Middle-earth",
            
        
    
        
        
            
                "sort_order": 3,
            
        
    
        
        
            
                "is_active": true,
            
        
    
    },
    
    {
    
        
        
            
                "name": "Harry Potter",
            
        
    
        
        
            
                "slug": "harry-potter",
            
        
    
        
        
            
                "description": "Wizarding world films following Harry Potter and beyond.",
            
        
    
        
        
            
                // type code here for "images" field
            
        
    
        
        
            
                "universe": "Wizarding World",
            
        
    
        
        
            
                "sort_order": 4,
            
        
    
        
        
            
                "is_active": true,
            
        
    
    },
    
];



const TitlesData = [
    
    {
    
        
        
            
                "name": "Iron Man",
            
        
    
        
        
            
                "original_name": "Iron Man",
            
        
    
        
        
            
                "title_type": "movie",
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "phase": "Phase 1",
            
        
    
        
        
            
                "season_count": 0,
            
        
    
        
        
            
                "release_year": 2008,
            
        
    
        
        
            
                "release_date": new Date('2008-05-02T00:00:00Z'),
            
        
    
        
        
            
                "runtime_minutes": 126,
            
        
    
        
        
            
                "synopsis": "A billionaire engineer builds a powered suit to escape captivity and becomes a hero.",
            
        
    
        
        
            
                "imdb_url": "https://www.imdb.com/title/tt0371746/",
            
        
    
        
        
            
                "poster_url": "https://example.com/posters/iron-man.jpg",
            
        
    
        
        
            
                // type code here for "images" field
            
        
    
        
        
            
                "franchise_order": 1,
            
        
    
        
        
            
                "is_active": true,
            
        
    
    },
    
    {
    
        
        
            
                "name": "The Avengers",
            
        
    
        
        
            
                "original_name": "Marvels The Avengers",
            
        
    
        
        
            
                "title_type": "movie",
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "phase": "Phase 1",
            
        
    
        
        
            
                "season_count": 0,
            
        
    
        
        
            
                "release_year": 2012,
            
        
    
        
        
            
                "release_date": new Date('2012-05-04T00:00:00Z'),
            
        
    
        
        
            
                "runtime_minutes": 143,
            
        
    
        
        
            
                "synopsis": "Earths mightiest heroes unite to stop a global threat.",
            
        
    
        
        
            
                "imdb_url": "https://www.imdb.com/title/tt0848228/",
            
        
    
        
        
            
                "poster_url": "https://example.com/posters/the-avengers.jpg",
            
        
    
        
        
            
                // type code here for "images" field
            
        
    
        
        
            
                "franchise_order": 6,
            
        
    
        
        
            
                "is_active": true,
            
        
    
    },
    
    {
    
        
        
            
                "name": "The Mandalorian",
            
        
    
        
        
            
                "original_name": "The Mandalorian",
            
        
    
        
        
            
                "title_type": "movie",
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "phase": "New Republic Era",
            
        
    
        
        
            
                "season_count": 3,
            
        
    
        
        
            
                "release_year": 2019,
            
        
    
        
        
            
                "release_date": new Date('2019-11-12T00:00:00Z'),
            
        
    
        
        
            
                "runtime_minutes": 0,
            
        
    
        
        
            
                "synopsis": "A lone bounty hunter navigates the outer reaches of the galaxy.",
            
        
    
        
        
            
                "imdb_url": "https://www.imdb.com/title/tt8111088/",
            
        
    
        
        
            
                "poster_url": "https://example.com/posters/the-mandalorian.jpg",
            
        
    
        
        
            
                // type code here for "images" field
            
        
    
        
        
            
                "franchise_order": 1,
            
        
    
        
        
            
                "is_active": true,
            
        
    
    },
    
    {
    
        
        
            
                "name": "Star Wars: A New Hope",
            
        
    
        
        
            
                "original_name": "Star Wars Episode IV A New Hope",
            
        
    
        
        
            
                "title_type": "movie",
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "phase": "Original Trilogy",
            
        
    
        
        
            
                "season_count": 0,
            
        
    
        
        
            
                "release_year": 1977,
            
        
    
        
        
            
                "release_date": new Date('1977-05-25T00:00:00Z'),
            
        
    
        
        
            
                "runtime_minutes": 121,
            
        
    
        
        
            
                "synopsis": "A farm boy joins a rebellion to fight a tyrannical empire.",
            
        
    
        
        
            
                "imdb_url": "https://www.imdb.com/title/tt0076759/",
            
        
    
        
        
            
                "poster_url": "https://example.com/posters/a-new-hope.jpg",
            
        
    
        
        
            
                // type code here for "images" field
            
        
    
        
        
            
                "franchise_order": 4,
            
        
    
        
        
            
                "is_active": true,
            
        
    
    },
    
];



const SeasonsData = [
    
    {
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "season_number": 1,
            
        
    
        
        
            
                "name": "Season 1",
            
        
    
        
        
            
                "release_date": new Date('2019-11-12T00:00:00Z'),
            
        
    
        
        
            
                "episode_count": 8,
            
        
    
        
        
            
                "overview": "The Mandalorian takes on a mysterious assignment and gains an unexpected companion.",
            
        
    
        
        
            
                "sort_order": 1,
            
        
    
    },
    
    {
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "season_number": 2,
            
        
    
        
        
            
                "name": "Season 2",
            
        
    
        
        
            
                "release_date": new Date('2020-10-30T00:00:00Z'),
            
        
    
        
        
            
                "episode_count": 8,
            
        
    
        
        
            
                "overview": "New allies and enemies emerge as the journey continues.",
            
        
    
        
        
            
                "sort_order": 2,
            
        
    
    },
    
    {
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "season_number": 3,
            
        
    
        
        
            
                "name": "Season 3",
            
        
    
        
        
            
                "release_date": new Date('2023-03-01T00:00:00Z'),
            
        
    
        
        
            
                "episode_count": 8,
            
        
    
        
        
            
                "overview": "The Mandalorian returns to Mandalore amid shifting power.",
            
        
    
        
        
            
                "sort_order": 3,
            
        
    
    },
    
    {
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "season_number": 0,
            
        
    
        
        
            
                "name": "Specials",
            
        
    
        
        
            
                "release_date": new Date('2020-12-25T00:00:00Z'),
            
        
    
        
        
            
                "episode_count": 2,
            
        
    
        
        
            
                "overview": "Standalone specials related to the series.",
            
        
    
        
        
            
                "sort_order": 4,
            
        
    
    },
    
];



const EpisodesData = [
    
    {
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "episode_number": 1,
            
        
    
        
        
            
                "name": "Chapter 1 The Mandalorian",
            
        
    
        
        
            
                "air_date": new Date('2019-11-12T00:00:00Z'),
            
        
    
        
        
            
                "runtime_minutes": 39,
            
        
    
        
        
            
                "overview": "A bounty hunter receives a high-value target assignment.",
            
        
    
        
        
            
                "sort_order": 1,
            
        
    
    },
    
    {
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "episode_number": 2,
            
        
    
        
        
            
                "name": "Chapter 2 The Child",
            
        
    
        
        
            
                "air_date": new Date('2019-11-15T00:00:00Z'),
            
        
    
        
        
            
                "runtime_minutes": 32,
            
        
    
        
        
            
                "overview": "The Mandalorian faces obstacles while protecting his target.",
            
        
    
        
        
            
                "sort_order": 2,
            
        
    
    },
    
    {
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "episode_number": 3,
            
        
    
        
        
            
                "name": "Chapter 3 The Sin",
            
        
    
        
        
            
                "air_date": new Date('2019-11-22T00:00:00Z'),
            
        
    
        
        
            
                "runtime_minutes": 37,
            
        
    
        
        
            
                "overview": "A decision changes the Mandalorians path.",
            
        
    
        
        
            
                "sort_order": 3,
            
        
    
    },
    
    {
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "episode_number": 1,
            
        
    
        
        
            
                "name": "Chapter 9 The Marshal",
            
        
    
        
        
            
                "air_date": new Date('2020-10-30T00:00:00Z'),
            
        
    
        
        
            
                "runtime_minutes": 54,
            
        
    
        
        
            
                "overview": "The Mandalorian seeks others of his kind on Tatooine.",
            
        
    
        
        
            
                "sort_order": 1,
            
        
    
    },
    
];



const WatchEntriesData = [
    
    {
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "status": "dropped",
            
        
    
        
        
            
                "started_at": new Date('2026-01-05T20:00:00Z'),
            
        
    
        
        
            
                "finished_at": new Date('2026-01-05T22:06:00Z'),
            
        
    
        
        
            
                "watched_at": new Date('2026-01-05T22:06:00Z'),
            
        
    
        
        
            
                "rating": 8.5,
            
        
    
        
        
            
                "revisit": false,
            
        
    
        
        
            
                "rewatch_count": 0,
            
        
    
        
        
            
                "notes": "Rewatched to start MCU timeline.",
            
        
    
        
        
            
                "contains_spoilers": false,
            
        
    
    },
    
    {
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "status": "planned",
            
        
    
        
        
            
                "started_at": new Date('2020-01-01T00:00:00Z'),
            
        
    
        
        
            
                "finished_at": new Date('2020-01-01T00:00:00Z'),
            
        
    
        
        
            
                "watched_at": new Date('2020-01-01T00:00:00Z'),
            
        
    
        
        
            
                "rating": 8.47,
            
        
    
        
        
            
                "revisit": true,
            
        
    
        
        
            
                "rewatch_count": 0,
            
        
    
        
        
            
                "notes": "Queued for weekend marathon.",
            
        
    
        
        
            
                "contains_spoilers": false,
            
        
    
    },
    
    {
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "status": "dropped",
            
        
    
        
        
            
                "started_at": new Date('2026-02-01T19:10:00Z'),
            
        
    
        
        
            
                "finished_at": new Date('2026-02-01T19:49:00Z'),
            
        
    
        
        
            
                "watched_at": new Date('2026-02-01T19:49:00Z'),
            
        
    
        
        
            
                "rating": 8.0,
            
        
    
        
        
            
                "revisit": true,
            
        
    
        
        
            
                "rewatch_count": 0,
            
        
    
        
        
            
                "notes": "Strong pilot and great atmosphere.",
            
        
    
        
        
            
                "contains_spoilers": false,
            
        
    
    },
    
    {
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "status": "watching",
            
        
    
        
        
            
                "started_at": new Date('2026-02-02T19:00:00Z'),
            
        
    
        
        
            
                "finished_at": new Date('2026-02-02T19:32:00Z'),
            
        
    
        
        
            
                "watched_at": new Date('2026-02-02T19:32:00Z'),
            
        
    
        
        
            
                "rating": 7.8,
            
        
    
        
        
            
                "revisit": true,
            
        
    
        
        
            
                "rewatch_count": 0,
            
        
    
        
        
            
                "notes": "Good continuation and pacing.",
            
        
    
        
        
            
                "contains_spoilers": true,
            
        
    
    },
    
];



const WatchlistItemsData = [
    
    {
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "priority": "high",
            
        
    
        
        
            
                "position": 1,
            
        
    
        
        
            
                "added_at": new Date('2026-02-10T10:00:00Z'),
            
        
    
        
        
            
                "planned_for": new Date('2026-02-22T20:00:00Z'),
            
        
    
        
        
            
                "is_active": true,
            
        
    
        
        
            
                "note": "Watch before starting Phase 2 titles.",
            
        
    
    },
    
    {
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "priority": "low",
            
        
    
        
        
            
                "position": 2,
            
        
    
        
        
            
                "added_at": new Date('2026-02-10T10:05:00Z'),
            
        
    
        
        
            
                "planned_for": new Date('2026-02-18T19:30:00Z'),
            
        
    
        
        
            
                "is_active": true,
            
        
    
        
        
            
                "note": "Start season 1 after finishing Avengers.",
            
        
    
    },
    
    {
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "priority": "high",
            
        
    
        
        
            
                "position": 1,
            
        
    
        
        
            
                "added_at": new Date('2026-02-05T16:20:00Z'),
            
        
    
        
        
            
                "planned_for": new Date('2026-02-16T20:30:00Z'),
            
        
    
        
        
            
                "is_active": true,
            
        
    
        
        
            
                "note": "Extended edition if time permits.",
            
        
    
    },
    
    {
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "priority": "medium",
            
        
    
        
        
            
                "position": 3,
            
        
    
        
        
            
                "added_at": new Date('2026-02-01T09:00:00Z'),
            
        
    
        
        
            
                "planned_for": new Date('2026-03-01T21:00:00Z'),
            
        
    
        
        
            
                "is_active": true,
            
        
    
        
        
            
                "note": "Optional MCU rewatch.",
            
        
    
    },
    
];



const TagsData = [
    
    {
    
        
        
            
                "name": "Rewatch",
            
        
    
        
        
            
                "color": "#6B7280",
            
        
    
        
        
            
                "description": "Items marked for repeat viewing.",
            
        
    
        
        
            
                "is_active": true,
            
        
    
    },
    
    {
    
        
        
            
                "name": "Must Watch",
            
        
    
        
        
            
                "color": "#F59E0B",
            
        
    
        
        
            
                "description": "High-priority titles and episodes.",
            
        
    
        
        
            
                "is_active": true,
            
        
    
    },
    
    {
    
        
        
            
                "name": "Family Friendly",
            
        
    
        
        
            
                "color": "#10B981",
            
        
    
        
        
            
                "description": "Suitable for family viewing.",
            
        
    
        
        
            
                "is_active": true,
            
        
    
    },
    
    {
    
        
        
            
                "name": "Weekend Marathon",
            
        
    
        
        
            
                "color": "#3B82F6",
            
        
    
        
        
            
                "description": "Good for longer sessions.",
            
        
    
        
        
            
                "is_active": true,
            
        
    
    },
    
];



const TitleTagsData = [
    
    {
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
    },
    
    {
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
    },
    
    {
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
    },
    
    {
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
    },
    
];



const AttachmentsData = [
    
    {
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                // type code here for "files" field
            
        
    
        
        
            
                "name": "Iron Man Reference Notes",
            
        
    
        
        
            
                "description": "Personal notes on viewing order and key moments.",
            
        
    
        
        
            
                "category": "poster",
            
        
    
        
        
            
                "attached_at": new Date('2026-01-06T08:00:00Z'),
            
        
    
    },
    
    {
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                // type code here for "files" field
            
        
    
        
        
            
                "name": "Episode 1 Summary",
            
        
    
        
        
            
                "description": "Short recap for later reference.",
            
        
    
        
        
            
                "category": "other",
            
        
    
        
        
            
                "attached_at": new Date('2026-02-01T20:10:00Z'),
            
        
    
    },
    
    {
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                // type code here for "files" field
            
        
    
        
        
            
                "name": "A New Hope Subtitles",
            
        
    
        
        
            
                "description": "Backup subtitle file.",
            
        
    
        
        
            
                "category": "reference",
            
        
    
        
        
            
                "attached_at": new Date('2026-01-13T08:00:00Z'),
            
        
    
    },
    
    {
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                // type code here for "files" field
            
        
    
        
        
            
                "name": "Fellowship Poster",
            
        
    
        
        
            
                "description": "High-resolution poster image for collection.",
            
        
    
        
        
            
                "category": "other",
            
        
    
        
        
            
                "attached_at": new Date('2026-02-12T13:00:00Z'),
            
        
    
    },
    
];




    
    
    
        
    
        
    
        
    
        
    
        
    
        
    
        
    
        
    
        
    
        
    
        
    
        
    
        
    
        
    
        
            // Similar logic for "relation_many"
        
    

    
    
    
    
    
        
    
        
    
        
    
        
    
        
    
        
    
        
    

    
    
    
        
    
        
    
        
    
        
            
            async function associateTitleWithFranchise() {
            
                const relatedFranchise0 = await Franchises.findOne({
                    offset: Math.floor(Math.random() * (await Franchises.count())),
                });
                const Title0 = await Titles.findOne({
                    order: [['id', 'ASC']],
                    offset: 0
                });
                if (Title0?.setFranchise)
                {
                    await
                    Title0.
                    setFranchise(relatedFranchise0);
                }
            
                const relatedFranchise1 = await Franchises.findOne({
                    offset: Math.floor(Math.random() * (await Franchises.count())),
                });
                const Title1 = await Titles.findOne({
                    order: [['id', 'ASC']],
                    offset: 1
                });
                if (Title1?.setFranchise)
                {
                    await
                    Title1.
                    setFranchise(relatedFranchise1);
                }
            
                const relatedFranchise2 = await Franchises.findOne({
                    offset: Math.floor(Math.random() * (await Franchises.count())),
                });
                const Title2 = await Titles.findOne({
                    order: [['id', 'ASC']],
                    offset: 2
                });
                if (Title2?.setFranchise)
                {
                    await
                    Title2.
                    setFranchise(relatedFranchise2);
                }
            
                const relatedFranchise3 = await Franchises.findOne({
                    offset: Math.floor(Math.random() * (await Franchises.count())),
                });
                const Title3 = await Titles.findOne({
                    order: [['id', 'ASC']],
                    offset: 3
                });
                if (Title3?.setFranchise)
                {
                    await
                    Title3.
                    setFranchise(relatedFranchise3);
                }
            
        }
        
    
        
    
        
    
        
    
        
    
        
    
        
    
        
    
        
    
        
    
        
    
        
    

    
    
    
        
            
            async function associateSeasonWithSery() {
            
                const relatedSery0 = await Titles.findOne({
                    offset: Math.floor(Math.random() * (await Titles.count())),
                });
                const Season0 = await Seasons.findOne({
                    order: [['id', 'ASC']],
                    offset: 0
                });
                if (Season0?.setSery)
                {
                    await
                    Season0.
                    setSery(relatedSery0);
                }
            
                const relatedSery1 = await Titles.findOne({
                    offset: Math.floor(Math.random() * (await Titles.count())),
                });
                const Season1 = await Seasons.findOne({
                    order: [['id', 'ASC']],
                    offset: 1
                });
                if (Season1?.setSery)
                {
                    await
                    Season1.
                    setSery(relatedSery1);
                }
            
                const relatedSery2 = await Titles.findOne({
                    offset: Math.floor(Math.random() * (await Titles.count())),
                });
                const Season2 = await Seasons.findOne({
                    order: [['id', 'ASC']],
                    offset: 2
                });
                if (Season2?.setSery)
                {
                    await
                    Season2.
                    setSery(relatedSery2);
                }
            
                const relatedSery3 = await Titles.findOne({
                    offset: Math.floor(Math.random() * (await Titles.count())),
                });
                const Season3 = await Seasons.findOne({
                    order: [['id', 'ASC']],
                    offset: 3
                });
                if (Season3?.setSery)
                {
                    await
                    Season3.
                    setSery(relatedSery3);
                }
            
        }
        
    
        
    
        
    
        
    
        
    
        
    
        
    

    
    
    
        
            
            async function associateEpisodeWithSeason() {
            
                const relatedSeason0 = await Seasons.findOne({
                    offset: Math.floor(Math.random() * (await Seasons.count())),
                });
                const Episode0 = await Episodes.findOne({
                    order: [['id', 'ASC']],
                    offset: 0
                });
                if (Episode0?.setSeason)
                {
                    await
                    Episode0.
                    setSeason(relatedSeason0);
                }
            
                const relatedSeason1 = await Seasons.findOne({
                    offset: Math.floor(Math.random() * (await Seasons.count())),
                });
                const Episode1 = await Episodes.findOne({
                    order: [['id', 'ASC']],
                    offset: 1
                });
                if (Episode1?.setSeason)
                {
                    await
                    Episode1.
                    setSeason(relatedSeason1);
                }
            
                const relatedSeason2 = await Seasons.findOne({
                    offset: Math.floor(Math.random() * (await Seasons.count())),
                });
                const Episode2 = await Episodes.findOne({
                    order: [['id', 'ASC']],
                    offset: 2
                });
                if (Episode2?.setSeason)
                {
                    await
                    Episode2.
                    setSeason(relatedSeason2);
                }
            
                const relatedSeason3 = await Seasons.findOne({
                    offset: Math.floor(Math.random() * (await Seasons.count())),
                });
                const Episode3 = await Episodes.findOne({
                    order: [['id', 'ASC']],
                    offset: 3
                });
                if (Episode3?.setSeason)
                {
                    await
                    Episode3.
                    setSeason(relatedSeason3);
                }
            
        }
        
    
        
    
        
    
        
    
        
    
        
    
        
    

    
    
    
        
            
            async function associateWatchEntryWithUser() {
            
                const relatedUser0 = await Users.findOne({
                    offset: Math.floor(Math.random() * (await Users.count())),
                });
                const WatchEntry0 = await WatchEntries.findOne({
                    order: [['id', 'ASC']],
                    offset: 0
                });
                if (WatchEntry0?.setUser)
                {
                    await
                    WatchEntry0.
                    setUser(relatedUser0);
                }
            
                const relatedUser1 = await Users.findOne({
                    offset: Math.floor(Math.random() * (await Users.count())),
                });
                const WatchEntry1 = await WatchEntries.findOne({
                    order: [['id', 'ASC']],
                    offset: 1
                });
                if (WatchEntry1?.setUser)
                {
                    await
                    WatchEntry1.
                    setUser(relatedUser1);
                }
            
                const relatedUser2 = await Users.findOne({
                    offset: Math.floor(Math.random() * (await Users.count())),
                });
                const WatchEntry2 = await WatchEntries.findOne({
                    order: [['id', 'ASC']],
                    offset: 2
                });
                if (WatchEntry2?.setUser)
                {
                    await
                    WatchEntry2.
                    setUser(relatedUser2);
                }
            
                const relatedUser3 = await Users.findOne({
                    offset: Math.floor(Math.random() * (await Users.count())),
                });
                const WatchEntry3 = await WatchEntries.findOne({
                    order: [['id', 'ASC']],
                    offset: 3
                });
                if (WatchEntry3?.setUser)
                {
                    await
                    WatchEntry3.
                    setUser(relatedUser3);
                }
            
        }
        
    
        
            
            async function associateWatchEntryWithTitle() {
            
                const relatedTitle0 = await Titles.findOne({
                    offset: Math.floor(Math.random() * (await Titles.count())),
                });
                const WatchEntry0 = await WatchEntries.findOne({
                    order: [['id', 'ASC']],
                    offset: 0
                });
                if (WatchEntry0?.setTitle)
                {
                    await
                    WatchEntry0.
                    setTitle(relatedTitle0);
                }
            
                const relatedTitle1 = await Titles.findOne({
                    offset: Math.floor(Math.random() * (await Titles.count())),
                });
                const WatchEntry1 = await WatchEntries.findOne({
                    order: [['id', 'ASC']],
                    offset: 1
                });
                if (WatchEntry1?.setTitle)
                {
                    await
                    WatchEntry1.
                    setTitle(relatedTitle1);
                }
            
                const relatedTitle2 = await Titles.findOne({
                    offset: Math.floor(Math.random() * (await Titles.count())),
                });
                const WatchEntry2 = await WatchEntries.findOne({
                    order: [['id', 'ASC']],
                    offset: 2
                });
                if (WatchEntry2?.setTitle)
                {
                    await
                    WatchEntry2.
                    setTitle(relatedTitle2);
                }
            
                const relatedTitle3 = await Titles.findOne({
                    offset: Math.floor(Math.random() * (await Titles.count())),
                });
                const WatchEntry3 = await WatchEntries.findOne({
                    order: [['id', 'ASC']],
                    offset: 3
                });
                if (WatchEntry3?.setTitle)
                {
                    await
                    WatchEntry3.
                    setTitle(relatedTitle3);
                }
            
        }
        
    
        
            
            async function associateWatchEntryWithEpisode() {
            
                const relatedEpisode0 = await Episodes.findOne({
                    offset: Math.floor(Math.random() * (await Episodes.count())),
                });
                const WatchEntry0 = await WatchEntries.findOne({
                    order: [['id', 'ASC']],
                    offset: 0
                });
                if (WatchEntry0?.setEpisode)
                {
                    await
                    WatchEntry0.
                    setEpisode(relatedEpisode0);
                }
            
                const relatedEpisode1 = await Episodes.findOne({
                    offset: Math.floor(Math.random() * (await Episodes.count())),
                });
                const WatchEntry1 = await WatchEntries.findOne({
                    order: [['id', 'ASC']],
                    offset: 1
                });
                if (WatchEntry1?.setEpisode)
                {
                    await
                    WatchEntry1.
                    setEpisode(relatedEpisode1);
                }
            
                const relatedEpisode2 = await Episodes.findOne({
                    offset: Math.floor(Math.random() * (await Episodes.count())),
                });
                const WatchEntry2 = await WatchEntries.findOne({
                    order: [['id', 'ASC']],
                    offset: 2
                });
                if (WatchEntry2?.setEpisode)
                {
                    await
                    WatchEntry2.
                    setEpisode(relatedEpisode2);
                }
            
                const relatedEpisode3 = await Episodes.findOne({
                    offset: Math.floor(Math.random() * (await Episodes.count())),
                });
                const WatchEntry3 = await WatchEntries.findOne({
                    order: [['id', 'ASC']],
                    offset: 3
                });
                if (WatchEntry3?.setEpisode)
                {
                    await
                    WatchEntry3.
                    setEpisode(relatedEpisode3);
                }
            
        }
        
    
        
    
        
    
        
    
        
    
        
    
        
    
        
    
        
    
        
    

    
    
    
        
            
            async function associateWatchlistItemWithUser() {
            
                const relatedUser0 = await Users.findOne({
                    offset: Math.floor(Math.random() * (await Users.count())),
                });
                const WatchlistItem0 = await WatchlistItems.findOne({
                    order: [['id', 'ASC']],
                    offset: 0
                });
                if (WatchlistItem0?.setUser)
                {
                    await
                    WatchlistItem0.
                    setUser(relatedUser0);
                }
            
                const relatedUser1 = await Users.findOne({
                    offset: Math.floor(Math.random() * (await Users.count())),
                });
                const WatchlistItem1 = await WatchlistItems.findOne({
                    order: [['id', 'ASC']],
                    offset: 1
                });
                if (WatchlistItem1?.setUser)
                {
                    await
                    WatchlistItem1.
                    setUser(relatedUser1);
                }
            
                const relatedUser2 = await Users.findOne({
                    offset: Math.floor(Math.random() * (await Users.count())),
                });
                const WatchlistItem2 = await WatchlistItems.findOne({
                    order: [['id', 'ASC']],
                    offset: 2
                });
                if (WatchlistItem2?.setUser)
                {
                    await
                    WatchlistItem2.
                    setUser(relatedUser2);
                }
            
                const relatedUser3 = await Users.findOne({
                    offset: Math.floor(Math.random() * (await Users.count())),
                });
                const WatchlistItem3 = await WatchlistItems.findOne({
                    order: [['id', 'ASC']],
                    offset: 3
                });
                if (WatchlistItem3?.setUser)
                {
                    await
                    WatchlistItem3.
                    setUser(relatedUser3);
                }
            
        }
        
    
        
            
            async function associateWatchlistItemWithTitle() {
            
                const relatedTitle0 = await Titles.findOne({
                    offset: Math.floor(Math.random() * (await Titles.count())),
                });
                const WatchlistItem0 = await WatchlistItems.findOne({
                    order: [['id', 'ASC']],
                    offset: 0
                });
                if (WatchlistItem0?.setTitle)
                {
                    await
                    WatchlistItem0.
                    setTitle(relatedTitle0);
                }
            
                const relatedTitle1 = await Titles.findOne({
                    offset: Math.floor(Math.random() * (await Titles.count())),
                });
                const WatchlistItem1 = await WatchlistItems.findOne({
                    order: [['id', 'ASC']],
                    offset: 1
                });
                if (WatchlistItem1?.setTitle)
                {
                    await
                    WatchlistItem1.
                    setTitle(relatedTitle1);
                }
            
                const relatedTitle2 = await Titles.findOne({
                    offset: Math.floor(Math.random() * (await Titles.count())),
                });
                const WatchlistItem2 = await WatchlistItems.findOne({
                    order: [['id', 'ASC']],
                    offset: 2
                });
                if (WatchlistItem2?.setTitle)
                {
                    await
                    WatchlistItem2.
                    setTitle(relatedTitle2);
                }
            
                const relatedTitle3 = await Titles.findOne({
                    offset: Math.floor(Math.random() * (await Titles.count())),
                });
                const WatchlistItem3 = await WatchlistItems.findOne({
                    order: [['id', 'ASC']],
                    offset: 3
                });
                if (WatchlistItem3?.setTitle)
                {
                    await
                    WatchlistItem3.
                    setTitle(relatedTitle3);
                }
            
        }
        
    
        
            
            async function associateWatchlistItemWithEpisode() {
            
                const relatedEpisode0 = await Episodes.findOne({
                    offset: Math.floor(Math.random() * (await Episodes.count())),
                });
                const WatchlistItem0 = await WatchlistItems.findOne({
                    order: [['id', 'ASC']],
                    offset: 0
                });
                if (WatchlistItem0?.setEpisode)
                {
                    await
                    WatchlistItem0.
                    setEpisode(relatedEpisode0);
                }
            
                const relatedEpisode1 = await Episodes.findOne({
                    offset: Math.floor(Math.random() * (await Episodes.count())),
                });
                const WatchlistItem1 = await WatchlistItems.findOne({
                    order: [['id', 'ASC']],
                    offset: 1
                });
                if (WatchlistItem1?.setEpisode)
                {
                    await
                    WatchlistItem1.
                    setEpisode(relatedEpisode1);
                }
            
                const relatedEpisode2 = await Episodes.findOne({
                    offset: Math.floor(Math.random() * (await Episodes.count())),
                });
                const WatchlistItem2 = await WatchlistItems.findOne({
                    order: [['id', 'ASC']],
                    offset: 2
                });
                if (WatchlistItem2?.setEpisode)
                {
                    await
                    WatchlistItem2.
                    setEpisode(relatedEpisode2);
                }
            
                const relatedEpisode3 = await Episodes.findOne({
                    offset: Math.floor(Math.random() * (await Episodes.count())),
                });
                const WatchlistItem3 = await WatchlistItems.findOne({
                    order: [['id', 'ASC']],
                    offset: 3
                });
                if (WatchlistItem3?.setEpisode)
                {
                    await
                    WatchlistItem3.
                    setEpisode(relatedEpisode3);
                }
            
        }
        
    
        
    
        
    
        
    
        
    
        
    
        
    

    
    
    
        
    
        
    
        
    
        
    

    
    
    
        
            
            async function associateTitleTagWithTitle() {
            
                const relatedTitle0 = await Titles.findOne({
                    offset: Math.floor(Math.random() * (await Titles.count())),
                });
                const TitleTag0 = await TitleTags.findOne({
                    order: [['id', 'ASC']],
                    offset: 0
                });
                if (TitleTag0?.setTitle)
                {
                    await
                    TitleTag0.
                    setTitle(relatedTitle0);
                }
            
                const relatedTitle1 = await Titles.findOne({
                    offset: Math.floor(Math.random() * (await Titles.count())),
                });
                const TitleTag1 = await TitleTags.findOne({
                    order: [['id', 'ASC']],
                    offset: 1
                });
                if (TitleTag1?.setTitle)
                {
                    await
                    TitleTag1.
                    setTitle(relatedTitle1);
                }
            
                const relatedTitle2 = await Titles.findOne({
                    offset: Math.floor(Math.random() * (await Titles.count())),
                });
                const TitleTag2 = await TitleTags.findOne({
                    order: [['id', 'ASC']],
                    offset: 2
                });
                if (TitleTag2?.setTitle)
                {
                    await
                    TitleTag2.
                    setTitle(relatedTitle2);
                }
            
                const relatedTitle3 = await Titles.findOne({
                    offset: Math.floor(Math.random() * (await Titles.count())),
                });
                const TitleTag3 = await TitleTags.findOne({
                    order: [['id', 'ASC']],
                    offset: 3
                });
                if (TitleTag3?.setTitle)
                {
                    await
                    TitleTag3.
                    setTitle(relatedTitle3);
                }
            
        }
        
    
        
            
            async function associateTitleTagWithTag() {
            
                const relatedTag0 = await Tags.findOne({
                    offset: Math.floor(Math.random() * (await Tags.count())),
                });
                const TitleTag0 = await TitleTags.findOne({
                    order: [['id', 'ASC']],
                    offset: 0
                });
                if (TitleTag0?.setTag)
                {
                    await
                    TitleTag0.
                    setTag(relatedTag0);
                }
            
                const relatedTag1 = await Tags.findOne({
                    offset: Math.floor(Math.random() * (await Tags.count())),
                });
                const TitleTag1 = await TitleTags.findOne({
                    order: [['id', 'ASC']],
                    offset: 1
                });
                if (TitleTag1?.setTag)
                {
                    await
                    TitleTag1.
                    setTag(relatedTag1);
                }
            
                const relatedTag2 = await Tags.findOne({
                    offset: Math.floor(Math.random() * (await Tags.count())),
                });
                const TitleTag2 = await TitleTags.findOne({
                    order: [['id', 'ASC']],
                    offset: 2
                });
                if (TitleTag2?.setTag)
                {
                    await
                    TitleTag2.
                    setTag(relatedTag2);
                }
            
                const relatedTag3 = await Tags.findOne({
                    offset: Math.floor(Math.random() * (await Tags.count())),
                });
                const TitleTag3 = await TitleTags.findOne({
                    order: [['id', 'ASC']],
                    offset: 3
                });
                if (TitleTag3?.setTag)
                {
                    await
                    TitleTag3.
                    setTag(relatedTag3);
                }
            
        }
        
    

    
    
    
        
            
            async function associateAttachmentWithUser() {
            
                const relatedUser0 = await Users.findOne({
                    offset: Math.floor(Math.random() * (await Users.count())),
                });
                const Attachment0 = await Attachments.findOne({
                    order: [['id', 'ASC']],
                    offset: 0
                });
                if (Attachment0?.setUser)
                {
                    await
                    Attachment0.
                    setUser(relatedUser0);
                }
            
                const relatedUser1 = await Users.findOne({
                    offset: Math.floor(Math.random() * (await Users.count())),
                });
                const Attachment1 = await Attachments.findOne({
                    order: [['id', 'ASC']],
                    offset: 1
                });
                if (Attachment1?.setUser)
                {
                    await
                    Attachment1.
                    setUser(relatedUser1);
                }
            
                const relatedUser2 = await Users.findOne({
                    offset: Math.floor(Math.random() * (await Users.count())),
                });
                const Attachment2 = await Attachments.findOne({
                    order: [['id', 'ASC']],
                    offset: 2
                });
                if (Attachment2?.setUser)
                {
                    await
                    Attachment2.
                    setUser(relatedUser2);
                }
            
                const relatedUser3 = await Users.findOne({
                    offset: Math.floor(Math.random() * (await Users.count())),
                });
                const Attachment3 = await Attachments.findOne({
                    order: [['id', 'ASC']],
                    offset: 3
                });
                if (Attachment3?.setUser)
                {
                    await
                    Attachment3.
                    setUser(relatedUser3);
                }
            
        }
        
    
        
            
            async function associateAttachmentWithTitle() {
            
                const relatedTitle0 = await Titles.findOne({
                    offset: Math.floor(Math.random() * (await Titles.count())),
                });
                const Attachment0 = await Attachments.findOne({
                    order: [['id', 'ASC']],
                    offset: 0
                });
                if (Attachment0?.setTitle)
                {
                    await
                    Attachment0.
                    setTitle(relatedTitle0);
                }
            
                const relatedTitle1 = await Titles.findOne({
                    offset: Math.floor(Math.random() * (await Titles.count())),
                });
                const Attachment1 = await Attachments.findOne({
                    order: [['id', 'ASC']],
                    offset: 1
                });
                if (Attachment1?.setTitle)
                {
                    await
                    Attachment1.
                    setTitle(relatedTitle1);
                }
            
                const relatedTitle2 = await Titles.findOne({
                    offset: Math.floor(Math.random() * (await Titles.count())),
                });
                const Attachment2 = await Attachments.findOne({
                    order: [['id', 'ASC']],
                    offset: 2
                });
                if (Attachment2?.setTitle)
                {
                    await
                    Attachment2.
                    setTitle(relatedTitle2);
                }
            
                const relatedTitle3 = await Titles.findOne({
                    offset: Math.floor(Math.random() * (await Titles.count())),
                });
                const Attachment3 = await Attachments.findOne({
                    order: [['id', 'ASC']],
                    offset: 3
                });
                if (Attachment3?.setTitle)
                {
                    await
                    Attachment3.
                    setTitle(relatedTitle3);
                }
            
        }
        
    
        
            
            async function associateAttachmentWithEpisode() {
            
                const relatedEpisode0 = await Episodes.findOne({
                    offset: Math.floor(Math.random() * (await Episodes.count())),
                });
                const Attachment0 = await Attachments.findOne({
                    order: [['id', 'ASC']],
                    offset: 0
                });
                if (Attachment0?.setEpisode)
                {
                    await
                    Attachment0.
                    setEpisode(relatedEpisode0);
                }
            
                const relatedEpisode1 = await Episodes.findOne({
                    offset: Math.floor(Math.random() * (await Episodes.count())),
                });
                const Attachment1 = await Attachments.findOne({
                    order: [['id', 'ASC']],
                    offset: 1
                });
                if (Attachment1?.setEpisode)
                {
                    await
                    Attachment1.
                    setEpisode(relatedEpisode1);
                }
            
                const relatedEpisode2 = await Episodes.findOne({
                    offset: Math.floor(Math.random() * (await Episodes.count())),
                });
                const Attachment2 = await Attachments.findOne({
                    order: [['id', 'ASC']],
                    offset: 2
                });
                if (Attachment2?.setEpisode)
                {
                    await
                    Attachment2.
                    setEpisode(relatedEpisode2);
                }
            
                const relatedEpisode3 = await Episodes.findOne({
                    offset: Math.floor(Math.random() * (await Episodes.count())),
                });
                const Attachment3 = await Attachments.findOne({
                    order: [['id', 'ASC']],
                    offset: 3
                });
                if (Attachment3?.setEpisode)
                {
                    await
                    Attachment3.
                    setEpisode(relatedEpisode3);
                }
            
        }
        
    
        
    
        
    
        
    
        
    
        
    


module.exports = {
    up: async (queryInterface, Sequelize) => {
        
            
            
            
            
            
                
                await Franchises.bulkCreate(FranchisesData);
                
            
            
                
                await Titles.bulkCreate(TitlesData);
                
            
            
                
                await Seasons.bulkCreate(SeasonsData);
                
            
            
                
                await Episodes.bulkCreate(EpisodesData);
                
            
            
                
                await WatchEntries.bulkCreate(WatchEntriesData);
                
            
            
                
                await WatchlistItems.bulkCreate(WatchlistItemsData);
                
            
            
                
                await Tags.bulkCreate(TagsData);
                
            
            
                
                await TitleTags.bulkCreate(TitleTagsData);
                
            
            
                
                await Attachments.bulkCreate(AttachmentsData);
                
            
            await Promise.all([
            
                
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                        // Similar logic for "relation_many"
                    
                
            
                
                
                
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
            
                
                
                    
                
                    
                
                    
                
                    
                        
                        await associateTitleWithFranchise(),
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
            
                
                
                    
                        
                        await associateSeasonWithSery(),
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
            
                
                
                    
                        
                        await associateEpisodeWithSeason(),
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
            
                
                
                    
                        
                        await associateWatchEntryWithUser(),
                    
                
                    
                        
                        await associateWatchEntryWithTitle(),
                    
                
                    
                        
                        await associateWatchEntryWithEpisode(),
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
            
                
                
                    
                        
                        await associateWatchlistItemWithUser(),
                    
                
                    
                        
                        await associateWatchlistItemWithTitle(),
                    
                
                    
                        
                        await associateWatchlistItemWithEpisode(),
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
            
                
                
                    
                
                    
                
                    
                
                    
                
            
                
                
                    
                        
                        await associateTitleTagWithTitle(),
                    
                
                    
                        
                        await associateTitleTagWithTag(),
                    
                
            
                
                
                    
                        
                        await associateAttachmentWithUser(),
                    
                
                    
                        
                        await associateAttachmentWithTitle(),
                    
                
                    
                        
                        await associateAttachmentWithEpisode(),
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
            
            ]);
        
    },

    down: async (queryInterface, Sequelize) => {
        
            
            
            
            
            
            await queryInterface.bulkDelete('franchises', null, {});
            
            
            await queryInterface.bulkDelete('titles', null, {});
            
            
            await queryInterface.bulkDelete('seasons', null, {});
            
            
            await queryInterface.bulkDelete('episodes', null, {});
            
            
            await queryInterface.bulkDelete('watch_entries', null, {});
            
            
            await queryInterface.bulkDelete('watchlist_items', null, {});
            
            
            await queryInterface.bulkDelete('tags', null, {});
            
            
            await queryInterface.bulkDelete('title_tags', null, {});
            
            
            await queryInterface.bulkDelete('attachments', null, {});
            
        
    },
};