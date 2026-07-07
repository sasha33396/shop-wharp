const msLogo = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='46' height='46' x='2' y='2' fill='#F25022'/><rect width='46' height='46' x='52' y='2' fill='#00A4EF'/><rect width='46' height='46' x='2' y='52' fill='#7FBA00'/><rect width='46' height='46' x='52' y='52' fill='#FFB900'/></svg>`
)}`;

export type Category =
  | "games"
  | "subscriptions"
  | "keys"
  | "giftcards"
  | "ingame"
  | "software";

export type Platform =
  | "Steam"
  | "PlayStation"
  | "Xbox"
  | "Epic Games"
  | "Origin"
  | "Ubisoft"
  | "Battle.net"
  | "GOG"
  | "Riot"
  | "PC"
  | "Web";

export type Region = "Россия" | "Турция" | "Аргентина" | "США" | "Европа" | "Глобал" | "Казахстан" | "Украина";

export interface Product {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  category: Category;
  platform: Platform;
  region: Region;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  sold: number;
  image: string;
  cover?: string;
  tags?: string[];
  genres?: string[];
  description: string;
  features?: string[];
  instant?: boolean;
  hot?: boolean;
  new?: boolean;
  logoTile?: boolean;
}

const steam = (appid: number) => `/images/steam/${appid}.jpg`;
const si = (slug: string) => `/images/brands/${slug}.svg`;

// Реальные изображения: Steam CDN для игр, Simple Icons для брендов (единый стиль)
export const IMAGES: Record<string, string> = {
  // Games — Steam header.jpg
  "Red Dead Redemption 2": steam(1174180),
  "Grand Theft Auto V Premium Edition": steam(271590),
  "Cyberpunk 2077: Phantom Liberty": steam(1091500),
  "Elden Ring + Shadow of the Erdtree": steam(1245620),
  "EA Sports FC 25": steam(2669320),
  "Hogwarts Legacy": steam(990080),
  "Baldur's Gate 3": steam(1086940),
  "The Witcher 3: Wild Hunt — Complete Edition": steam(292030),
  "Helldivers 2": steam(553850),
  "Black Myth: Wukong": steam(2358720),
  "Stalker 2: Heart of Chornobyl": steam(1643320),
  "Resident Evil 4 Remake": steam(2050650),
  "Resident Evil Village": steam(1196590),
  "God of War Ragnarök": steam(2322010),
  "Spider-Man 2": steam(2933620),
  "The Last of Us Part II Remastered": steam(2531310),
  "Horizon Forbidden West Complete": steam(2420110),
  "Assassin's Creed Mirage": steam(2113850),
  "Assassin's Creed Shadows": steam(3159330),
  "Far Cry 6": steam(2369390),
  "Mortal Kombat 1": steam(1971870),
  "Tekken 8": steam(1778820),
  "Street Fighter 6": steam(1364780),
  "Hollow Knight": steam(367520),
  "Hades II (Early Access)": steam(1145350),
  "Dead Cells": steam(588650),
  "Stardew Valley": steam(413150),
  "Terraria": steam(105600),
  "Minecraft Java & Bedrock": si("minecraft"),
  "Sons of the Forest": steam(1326470),
  "Lethal Company": steam(1966720),
  "Phasmophobia": steam(739630),
  "Counter-Strike 2 Prime Status": steam(730),
  "PUBG: Battlegrounds": steam(578080),
  "Dying Light 2: Reloaded Edition": steam(534380),
  "DOOM Eternal": steam(782330),
  "Forza Horizon 5 Premium Edition": steam(1551360),
  "Forza Motorsport (2023)": steam(2440510),
  "Microsoft Flight Simulator 2024": steam(2537590),
  "Sea of Thieves": steam(1172620),
  "Diablo IV": steam(2344520),
  "Overwatch 2 Premium": steam(2357570),
  "Warhammer 40,000: Space Marine 2": steam(2183900),
  "Manor Lords": steam(1363080),
  "Frostpunk 2": steam(1601580),
  "Civilization VI Anthology": steam(289070),
  "Total War: WARHAMMER III": steam(1142710),
  "Football Manager 2024": steam(1904540),
  "NBA 2K25": steam(3017860),

  // Subscriptions
  "PlayStation Plus Essential 12 мес (Турция)": si("playstation"),
  "PlayStation Plus Extra 12 мес (Турция)": si("playstation"),
  "PlayStation Plus Deluxe 12 мес (Турция)": si("playstation"),
  "Xbox Game Pass Ultimate 1 мес": si("xbox"),
  "Xbox Game Pass Ultimate 3 мес": si("xbox"),
  "Xbox Game Pass Ultimate 12 мес": si("xbox"),
  "Xbox Game Pass Core 12 мес": si("xbox"),
  "EA Play 12 мес": si("ea"),
  "Ubisoft+ Premium 1 мес": si("ubisoft"),
  "Nintendo Switch Online 12 мес": si("nintendoswitch"),
  "YouTube Premium 12 мес (Турция)": si("youtube"),
  "Netflix Premium 1 мес (Турция)": si("netflix"),
  "Spotify Premium 12 мес (Индия)": si("spotify"),
  "Discord Nitro 12 мес": si("discord"),
  "Discord Nitro Basic 1 мес": si("discord"),
  "ChatGPT Plus 1 мес": si("openai"),
  "Apple Music 6 мес (Турция)": si("applemusic"),
  "HBO Max 1 мес": si("hbo"),
  "Crunchyroll Premium 12 мес": si("crunchyroll"),

  // In-game
  "Genshin Impact: Благословение Полой Луны": si("hoyoverse"),
  "Genshin Impact: 6480 кристаллов сотворения": si("hoyoverse"),
  "Honkai: Star Rail — 4040 Oneiric Shard": si("hoyoverse"),
  "Brawl Stars — 950 гемов": si("supercell"),
  "Clash of Clans — 14000 гемов": si("supercell"),
  "Standoff 2 — Gold Pass": si("counterstrike"),
  "Fortnite — 5000 V-Bucks": si("epicgames"),
  "Fortnite Crew (месяц)": si("epicgames"),
  "Roblox — 4500 Robux": si("roblox"),
  "Valorant Points — 2050 VP": si("valorant"),
  "League of Legends — 3250 RP": si("leagueoflegends"),
  "World of Warcraft 60 дней": si("battledotnet"),
  "Apex Legends — 6700 монет": si("ea"),
  "Mobile Legends — 1412 алмазов": si("moonton"),
  "PUBG Mobile — 8100 UC": si("pubg"),
  "Free Fire — 2200 алмазов": si("garena"),
  "Dota 2 Battle Pass": si("steam"),

  // Gift cards
  "Steam Кошелёк 1000 ₽": si("steam"),
  "Steam Кошелёк 2500 ₽": si("steam"),
  "Steam Кошелёк 5000 ₽": si("steam"),
  "Steam Wallet $20 (Казахстан)": si("steam"),
  "Steam Wallet $50 (Казахстан)": si("steam"),
  "PlayStation Network 1500 ₽": si("playstation"),
  "PlayStation Network 250 TL (Турция)": si("playstation"),
  "PlayStation Network 500 TL (Турция)": si("playstation"),
  "Xbox Live Gift Card $25 (USA)": si("xbox"),
  "Xbox Live Gift Card $50 (USA)": si("xbox"),
  "Nintendo eShop $35 (USA)": si("nintendoswitch"),
  "Google Play 1000 ₽": si("googleplay"),
  "App Store & iTunes $25 (USA)": si("appstore"),
  "Razer Gold 1000 ₽": si("razer"),
  "Amazon Gift Card $20 (USA)": si("amazon"),

  // Keys
  "Steam Random Premium Key": si("steam"),
  "Steam Random Top Key": si("steam"),
  "Steam Random AAA Key": si("steam"),
  "DLC: Cyberpunk 2077 — Phantom Liberty": steam(1091500),
  "DLC: Elden Ring — Shadow of the Erdtree": steam(2306930),
  "World of Warcraft: The War Within": si("battledotnet"),
  "Path of Exile 2: Early Access Pack": steam(2694490),

  // Software
  "Windows 11 Pro OEM": si("windows11"),
  "Windows 10 Pro OEM": si("windows10"),
  "Office 2021 Professional Plus": msLogo,
  "Microsoft 365 Family 12 мес": msLogo,
  "ESET NOD32 Internet Security 1 год": si("eset"),
  "Kaspersky Plus 1 год / 3 устр.": si("kaspersky"),
  "NordVPN 24 мес": si("nordvpn"),
  "ExpressVPN 12 мес": si("expressvpn"),
};

// Запасные изображения по категориям, если в IMAGES нет точного совпадения
const FALLBACK: Record<Category, string> = {
  games: si("steam"),
  subscriptions: si("youtube"),
  keys: si("steam"),
  giftcards: si("amazon"),
  ingame: si("hoyoverse"),
  software: si("windows11"),
};

const isLogoTile = (title: string, category: Category) =>
  category !== "games";

const hash = (s: string) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return Math.abs(h);
};

const make = (p: Omit<Product, "id" | "slug" | "image" | "cover" | "rating" | "reviews" | "sold"> & Partial<Product>): Product => {
  const slug = (p.slug ?? p.title)
    .toLowerCase()
    .replace(/[^a-zа-я0-9\s-]/gi, "")
    .replace(/\s+/g, "-");
  const image = p.image || IMAGES[p.title] || FALLBACK[p.category] || brandTile(p.title);
  const h = hash(slug);
  return {
    id: slug,
    slug,
    image,
    cover: p.cover ?? image,
    rating: p.rating ?? Math.round((4.5 + ((h % 50) / 100)) * 10) / 10,
    reviews: p.reviews ?? 1 + (h % 10),
    sold: p.sold ?? 200 + (h % 20000),
    instant: p.instant ?? true,
    logoTile: isLogoTile(p.title, p.category),
    ...p,
  } as Product;
};



export const products: Product[] = [
  // === ИГРЫ (Steam / PS / Xbox) ===
  make({ title: "Red Dead Redemption 2", category: "games", platform: "Steam", region: "Россия", price: 2890, oldPrice: 4499, description: "Эпический вестерн от Rockstar Games. Открытый мир Дикого Запада.", genres: ["Экшен", "Приключения", "Открытый мир"], hot: true }),
  make({ title: "Grand Theft Auto V Premium Edition", category: "games", platform: "Steam", region: "Россия", price: 1290, oldPrice: 2199, description: "Лос-Сантос ждёт. Криминальная сага с тремя героями.", genres: ["Экшен", "Открытый мир"], hot: true }),
  make({ title: "Cyberpunk 2077: Phantom Liberty", category: "games", platform: "Steam", region: "Россия", price: 3490, oldPrice: 4990, description: "Найт-Сити и шпионский триллер. Дополнение + базовая игра.", genres: ["RPG", "Шутер"] }),
  make({ title: "Elden Ring + Shadow of the Erdtree", category: "games", platform: "Steam", region: "Турция", price: 3990, oldPrice: 5990, description: "Бесшовный открытый мир от FromSoftware и Джорджа Мартина.", genres: ["Soulslike", "RPG"], hot: true }),
  make({ title: "EA Sports FC 25", category: "games", platform: "Steam", region: "Турция", price: 2490, oldPrice: 4999, description: "Новый сезон футбольного симулятора от EA.", genres: ["Спорт"] }),
  make({ title: "Hogwarts Legacy", category: "games", platform: "Steam", region: "Россия", price: 2190, oldPrice: 3999, description: "Магический мир Гарри Поттера. Хогвартс в XIX веке.", genres: ["RPG", "Приключения"] }),
  make({ title: "Baldur's Gate 3", category: "games", platform: "Steam", region: "Турция", price: 2790, oldPrice: 3999, description: "Эпическая RPG года по вселенной D&D от Larian.", genres: ["RPG"], hot: true }),
  make({ title: "The Witcher 3: Wild Hunt — Complete Edition", category: "games", platform: "Steam", region: "Россия", price: 690, oldPrice: 1499, description: "Геральт, ведьмак и шедевр CD Projekt RED.", genres: ["RPG"] }),
  make({ title: "Helldivers 2", category: "games", platform: "Steam", region: "Турция", price: 1990, oldPrice: 2999, description: "Кооперативный шутер о защите Супер-Земли.", genres: ["Шутер", "Кооператив"] }),
  make({ title: "Black Myth: Wukong", category: "games", platform: "Steam", region: "Турция", price: 2890, description: "Экшен-RPG по китайской мифологии.", genres: ["Soulslike", "Экшен"], new: true, hot: true }),
  make({ title: "Stalker 2: Heart of Chornobyl", category: "games", platform: "Steam", region: "Турция", price: 2990, description: "Возвращение в Зону. Survival-шутер.", genres: ["Шутер", "Хоррор"], new: true }),
  make({ title: "Resident Evil 4 Remake", category: "games", platform: "Steam", region: "Турция", price: 1990, oldPrice: 3499, description: "Леон С. Кеннеди и сектанты. Ремейк классики.", genres: ["Хоррор", "Экшен"] }),
  make({ title: "Resident Evil Village", category: "games", platform: "Steam", region: "Турция", price: 1290, oldPrice: 2799, description: "Этан Уинтерс и деревня Димитреску.", genres: ["Хоррор"] }),
  make({ title: "God of War Ragnarök", category: "games", platform: "PlayStation", region: "Турция", price: 4490, description: "Кратос и Атрей против Рагнарёка.", genres: ["Экшен", "Приключения"] }),
  make({ title: "Spider-Man 2", category: "games", platform: "PlayStation", region: "Турция", price: 4990, description: "Майлз и Питер против Венома.", genres: ["Экшен", "Приключения"] }),
  make({ title: "The Last of Us Part II Remastered", category: "games", platform: "PlayStation", region: "Турция", price: 3490, description: "Ремастер культовой драмы Naughty Dog.", genres: ["Драма", "Экшен"] }),
  make({ title: "Horizon Forbidden West Complete", category: "games", platform: "Steam", region: "Турция", price: 2290, oldPrice: 3999, description: "Элой исследует Запретный Запад.", genres: ["RPG", "Открытый мир"] }),
  make({ title: "Assassin's Creed Mirage", category: "games", platform: "Ubisoft", region: "Турция", price: 1890, oldPrice: 3499, description: "Багдад IX века. Возвращение к корням серии.", genres: ["Экшен", "Стелс"] }),
  make({ title: "Assassin's Creed Shadows", category: "games", platform: "Ubisoft", region: "Турция", price: 3990, description: "Феодальная Япония. Наоэ и Ясукэ.", genres: ["Экшен"], new: true }),
  make({ title: "Far Cry 6", category: "games", platform: "Ubisoft", region: "Турция", price: 990, oldPrice: 2999, description: "Революция на Яре. Антон Кастильо ждёт.", genres: ["Шутер", "Открытый мир"] }),
  make({ title: "Mortal Kombat 1", category: "games", platform: "Steam", region: "Турция", price: 1990, oldPrice: 3999, description: "Новая эра файтинга от NetherRealm.", genres: ["Файтинг"] }),
  make({ title: "Tekken 8", category: "games", platform: "Steam", region: "Турция", price: 2490, oldPrice: 3999, description: "Король железного кулака возвращается.", genres: ["Файтинг"] }),
  make({ title: "Street Fighter 6", category: "games", platform: "Steam", region: "Турция", price: 1990, oldPrice: 3499, description: "Классический файтинг Capcom.", genres: ["Файтинг"] }),
  make({ title: "Hollow Knight", category: "games", platform: "Steam", region: "Россия", price: 290, oldPrice: 549, description: "Метроидвания о Полом Рыцаре.", genres: ["Метроидвания", "Платформер"] }),
  make({ title: "Hades II (Early Access)", category: "games", platform: "Steam", region: "Турция", price: 990, description: "Богиня Мелиноя и битва против Хроноса.", genres: ["Рогалик", "Экшен"], new: true }),
  make({ title: "Dead Cells", category: "games", platform: "Steam", region: "Россия", price: 390, oldPrice: 999, description: "Roguelite-метроидвания.", genres: ["Рогалик"] }),
  make({ title: "Stardew Valley", category: "games", platform: "Steam", region: "Россия", price: 290, oldPrice: 459, description: "Фермерская идиллия.", genres: ["Симулятор", "Инди"] }),
  make({ title: "Terraria", category: "games", platform: "Steam", region: "Россия", price: 199, oldPrice: 369, description: "Песочница приключений.", genres: ["Песочница"] }),
  make({ title: "Minecraft Java & Bedrock", category: "games", platform: "PC", region: "Глобал", price: 1690, description: "Официальный аккаунт Minecraft.", genres: ["Песочница"] }),
  make({ title: "Sons of the Forest", category: "games", platform: "Steam", region: "Турция", price: 1290, oldPrice: 1999, description: "Хоррор-выживание на острове каннибалов.", genres: ["Хоррор", "Выживание"] }),
  make({ title: "Lethal Company", category: "games", platform: "Steam", region: "Россия", price: 390, description: "Кооперативный хоррор-симулятор сборщика лома.", genres: ["Хоррор", "Кооператив"] }),
  make({ title: "Phasmophobia", category: "games", platform: "Steam", region: "Россия", price: 390, description: "Кооп-охота на призраков.", genres: ["Хоррор", "Кооператив"] }),
  make({ title: "Counter-Strike 2 Prime Status", category: "games", platform: "Steam", region: "Глобал", price: 1290, description: "Prime-аккаунт CS2.", genres: ["Шутер"] }),
  make({ title: "PUBG: Battlegrounds", category: "games", platform: "Steam", region: "Глобал", price: 0, description: "F2P. Стартовый набор.", genres: ["Шутер", "Battle Royale"] }),
  make({ title: "Dying Light 2: Reloaded Edition", category: "games", platform: "Steam", region: "Турция", price: 1690, oldPrice: 2999, description: "Зомби-паркур и ночные кошмары.", genres: ["Хоррор", "Экшен"] }),
  make({ title: "DOOM Eternal", category: "games", platform: "Steam", region: "Турция", price: 990, oldPrice: 2499, description: "Палач Рока и адские орды.", genres: ["Шутер"] }),
  make({ title: "Forza Horizon 5 Premium Edition", category: "games", platform: "Steam", region: "Турция", price: 2490, oldPrice: 4990, description: "Гонки по Мексике.", genres: ["Гонки"] }),
  make({ title: "Forza Motorsport (2023)", category: "games", platform: "Steam", region: "Турция", price: 2890, description: "Симулятор автогонок Microsoft.", genres: ["Гонки"] }),
  make({ title: "Microsoft Flight Simulator 2024", category: "games", platform: "Steam", region: "Турция", price: 3490, description: "Авиасимулятор нового поколения.", genres: ["Симулятор"], new: true }),
  make({ title: "Sea of Thieves", category: "games", platform: "Steam", region: "Турция", price: 1490, oldPrice: 2599, description: "Пиратский кооп-приключение.", genres: ["Приключения", "Кооператив"] }),
  make({ title: "Diablo IV", category: "games", platform: "Battle.net", region: "Турция", price: 2990, oldPrice: 4990, description: "Возвращение Лилит в Санктуарий.", genres: ["RPG", "Экшен"] }),
  make({ title: "Overwatch 2 Premium", category: "games", platform: "Battle.net", region: "Глобал", price: 1290, description: "Премиум-набор героев.", genres: ["Шутер"] }),
  make({ title: "Warhammer 40,000: Space Marine 2", category: "games", platform: "Steam", region: "Турция", price: 2790, description: "Капитан Тит против тиранидов.", genres: ["Экшен", "Шутер"], new: true }),
  make({ title: "Manor Lords", category: "games", platform: "Steam", region: "Турция", price: 1290, description: "Средневековый градостроительный симулятор.", genres: ["Стратегия"], new: true }),
  make({ title: "Frostpunk 2", category: "games", platform: "Steam", region: "Турция", price: 1890, description: "Город-государство во льдах.", genres: ["Стратегия"], new: true }),
  make({ title: "Civilization VI Anthology", category: "games", platform: "Steam", region: "Россия", price: 1490, oldPrice: 5999, description: "Полное издание Sid Meier's Civilization VI.", genres: ["Стратегия"] }),
  make({ title: "Total War: WARHAMMER III", category: "games", platform: "Steam", region: "Турция", price: 1990, oldPrice: 3499, description: "Глобальная стратегия Warhammer.", genres: ["Стратегия"] }),
  make({ title: "Football Manager 2024", category: "games", platform: "Steam", region: "Турция", price: 1390, oldPrice: 2799, description: "Симулятор футбольного менеджера.", genres: ["Симулятор", "Спорт"] }),
  make({ title: "NBA 2K25", category: "games", platform: "Steam", region: "Турция", price: 2890, description: "Баскетбольный симулятор сезона.", genres: ["Спорт"] }),

  // === ПОДПИСКИ ===
  make({ title: "PlayStation Plus Essential 12 мес (Турция)", category: "subscriptions", platform: "PlayStation", region: "Турция", price: 2490, oldPrice: 5999, description: "Годовая подписка PS Plus Essential. Активация на турецкий аккаунт.", features: ["12 месяцев", "Онлайн-мультиплеер", "Ежемесячные игры"], hot: true }),
  make({ title: "PlayStation Plus Extra 12 мес (Турция)", category: "subscriptions", platform: "PlayStation", region: "Турция", price: 4990, oldPrice: 8999, description: "PS Plus Extra. Каталог из 400+ игр.", features: ["12 месяцев", "Каталог игр", "Облачные сохранения"] }),
  make({ title: "PlayStation Plus Deluxe 12 мес (Турция)", category: "subscriptions", platform: "PlayStation", region: "Турция", price: 6490, oldPrice: 10999, description: "Максимальная PS Plus с классикой PS1-PS3.", features: ["12 месяцев", "Классика PS1-3", "Все игры"] }),
  make({ title: "Xbox Game Pass Ultimate 1 мес", category: "subscriptions", platform: "Xbox", region: "Турция", price: 590, oldPrice: 1299, description: "100+ игр на Xbox/PC + EA Play + xCloud.", features: ["1 месяц", "Console + PC", "EA Play"], hot: true }),
  make({ title: "Xbox Game Pass Ultimate 3 мес", category: "subscriptions", platform: "Xbox", region: "Турция", price: 1490, oldPrice: 3899, description: "Game Pass Ultimate на 3 месяца.", features: ["3 месяца", "Console + PC", "EA Play"] }),
  make({ title: "Xbox Game Pass Ultimate 12 мес", category: "subscriptions", platform: "Xbox", region: "Турция", price: 4890, oldPrice: 15999, description: "Год Game Pass Ultimate.", features: ["12 месяцев", "Console + PC", "EA Play"], hot: true }),
  make({ title: "Xbox Game Pass Core 12 мес", category: "subscriptions", platform: "Xbox", region: "Турция", price: 2490, description: "Базовая подписка для онлайн-игры.", features: ["12 месяцев", "Онлайн"] }),
  make({ title: "EA Play 12 мес", category: "subscriptions", platform: "Origin", region: "Турция", price: 990, oldPrice: 1999, description: "Подписка на каталог EA.", features: ["12 месяцев"] }),
  make({ title: "Ubisoft+ Premium 1 мес", category: "subscriptions", platform: "Ubisoft", region: "Турция", price: 890, description: "Все новинки Ubisoft с релиза.", features: ["1 месяц"] }),
  make({ title: "Nintendo Switch Online 12 мес", category: "subscriptions", platform: "PC", region: "США", price: 1490, description: "Онлайн для Switch + классика NES/SNES.", features: ["12 месяцев"] }),
  make({ title: "YouTube Premium 12 мес (Турция)", category: "subscriptions", platform: "Web", region: "Турция", price: 1290, oldPrice: 4490, description: "Без рекламы + YouTube Music.", features: ["12 месяцев", "Без рекламы", "Music"] }),
  make({ title: "Netflix Premium 1 мес (Турция)", category: "subscriptions", platform: "Web", region: "Турция", price: 490, description: "Подписка Netflix 4K UHD.", features: ["1 месяц", "4K", "4 экрана"] }),
  make({ title: "Spotify Premium 12 мес (Индия)", category: "subscriptions", platform: "Web", region: "США", price: 990, oldPrice: 4999, description: "Год Spotify без рекламы.", features: ["12 месяцев"] }),
  make({ title: "Discord Nitro 12 мес", category: "subscriptions", platform: "Web", region: "Глобал", price: 2490, oldPrice: 3990, description: "Полный Nitro со всеми бонусами.", features: ["12 месяцев", "100 МБ", "HD-стримы"] }),
  make({ title: "Discord Nitro Basic 1 мес", category: "subscriptions", platform: "Web", region: "Глобал", price: 290, description: "Базовый Nitro.", features: ["1 месяц"] }),
  make({ title: "ChatGPT Plus 1 мес", category: "subscriptions", platform: "Web", region: "Глобал", price: 1890, description: "Подписка на ChatGPT Plus от OpenAI.", features: ["1 месяц", "GPT-4o", "DALL·E"] }),
  make({ title: "Apple Music 6 мес (Турция)", category: "subscriptions", platform: "Web", region: "Турция", price: 590, description: "Полгода Apple Music.", features: ["6 месяцев"] }),
  make({ title: "HBO Max 1 мес", category: "subscriptions", platform: "Web", region: "Аргентина", price: 390, description: "Доступ к HBO Max.", features: ["1 месяц"] }),
  make({ title: "Crunchyroll Premium 12 мес", category: "subscriptions", platform: "Web", region: "Глобал", price: 1990, description: "Аниме без рекламы.", features: ["12 месяцев"] }),

  // === ВНУТРИИГРОВАЯ ВАЛЮТА / IN-GAME ===
  make({ title: "Genshin Impact: Благословение Полой Луны", category: "ingame", platform: "PC", region: "Глобал", price: 449, description: "30 дней благословения. +90 примогемов в день.", features: ["30 дней"], hot: true }),
  make({ title: "Genshin Impact: 6480 кристаллов сотворения", category: "ingame", platform: "PC", region: "Глобал", price: 8990, description: "Топ-пак примогемов.", features: ["6480 + бонус"] }),
  make({ title: "Honkai: Star Rail — 4040 Oneiric Shard", category: "ingame", platform: "PC", region: "Глобал", price: 5290, description: "Премиум-валюта HSR.", features: ["4040 + бонус"] }),
  make({ title: "Brawl Stars — 950 гемов", category: "ingame", platform: "PC", region: "Глобал", price: 3490, description: "Гемы для Brawl Stars.", features: ["950 гемов"] }),
  make({ title: "Clash of Clans — 14000 гемов", category: "ingame", platform: "PC", region: "Глобал", price: 6990, description: "Огромный пак гемов.", features: ["14000 гемов"] }),
  make({ title: "Standoff 2 — Gold Pass", category: "ingame", platform: "PC", region: "Глобал", price: 590, description: "Премиум-пропуск сезона.", features: ["Сезон"] }),
  make({ title: "Fortnite — 5000 V-Bucks", category: "ingame", platform: "Epic Games", region: "Турция", price: 2490, oldPrice: 3299, description: "В-баксы для Fortnite.", features: ["5000 V-Bucks"] }),
  make({ title: "Fortnite Crew (месяц)", category: "ingame", platform: "Epic Games", region: "Турция", price: 590, description: "Подписка Crew с боевым пропуском.", features: ["1 месяц"] }),
  make({ title: "Roblox — 4500 Robux", category: "ingame", platform: "PC", region: "Глобал", price: 3990, description: "Робаксы для Roblox.", features: ["4500 Robux"] }),
  make({ title: "Valorant Points — 2050 VP", category: "ingame", platform: "Riot", region: "Турция", price: 1290, oldPrice: 1999, description: "VP для скинов и боевого пропуска.", features: ["2050 VP"] }),
  make({ title: "League of Legends — 3250 RP", category: "ingame", platform: "Riot", region: "Турция", price: 1490, description: "Riot Points.", features: ["3250 RP"] }),
  make({ title: "World of Warcraft 60 дней", category: "ingame", platform: "Battle.net", region: "Турция", price: 1490, oldPrice: 2490, description: "Game Time на 2 месяца.", features: ["60 дней"] }),
  make({ title: "Apex Legends — 6700 монет", category: "ingame", platform: "Steam", region: "Турция", price: 2990, description: "Apex Coins.", features: ["6700 монет"] }),
  make({ title: "Mobile Legends — 1412 алмазов", category: "ingame", platform: "PC", region: "Глобал", price: 1990, description: "Алмазы MLBB.", features: ["1412 алмазов"] }),
  make({ title: "PUBG Mobile — 8100 UC", category: "ingame", platform: "PC", region: "Глобал", price: 7990, description: "Unknown Cash для PUBG Mobile.", features: ["8100 UC"] }),
  make({ title: "Free Fire — 2200 алмазов", category: "ingame", platform: "PC", region: "Глобал", price: 1890, description: "Алмазы FF.", features: ["2200 алмазов"] }),
  make({ title: "Dota 2 Battle Pass", category: "ingame", platform: "Steam", region: "Глобал", price: 690, description: "Боевой пропуск Dota 2.", features: ["Сезон"] }),

  // === ПОДАРОЧНЫЕ КАРТЫ / GIFT CARDS ===
  make({ title: "Steam Кошелёк 1000 ₽", category: "giftcards", platform: "Steam", region: "Россия", price: 1090, description: "Пополнение Steam-кошелька.", features: ["Российский регион"] }),
  make({ title: "Steam Кошелёк 2500 ₽", category: "giftcards", platform: "Steam", region: "Россия", price: 2690, description: "Подарочная карта Steam.", features: ["Российский регион"] }),
  make({ title: "Steam Кошелёк 5000 ₽", category: "giftcards", platform: "Steam", region: "Россия", price: 5290, description: "Карта Steam на 5000 ₽.", features: ["Российский регион"] }),
  make({ title: "Steam Wallet $20 (Казахстан)", category: "giftcards", platform: "Steam", region: "Казахстан", price: 1990, description: "Активация на казахстанский Steam.", features: ["KZ регион"] }),
  make({ title: "Steam Wallet $50 (Казахстан)", category: "giftcards", platform: "Steam", region: "Казахстан", price: 4790, description: "Карта Steam KZ.", features: ["KZ регион"] }),
  make({ title: "PlayStation Network 1500 ₽", category: "giftcards", platform: "PlayStation", region: "Россия", price: 1990, description: "Карта PSN.", features: ["RU аккаунт"] }),
  make({ title: "PlayStation Network 250 TL (Турция)", category: "giftcards", platform: "PlayStation", region: "Турция", price: 1290, description: "PSN-карта Турция.", features: ["TR аккаунт"] }),
  make({ title: "PlayStation Network 500 TL (Турция)", category: "giftcards", platform: "PlayStation", region: "Турция", price: 2390, description: "PSN-карта Турция 500 ₺.", features: ["TR аккаунт"] }),
  make({ title: "Xbox Live Gift Card $25 (USA)", category: "giftcards", platform: "Xbox", region: "США", price: 2790, description: "Карта Xbox Live US.", features: ["US аккаунт"] }),
  make({ title: "Xbox Live Gift Card $50 (USA)", category: "giftcards", platform: "Xbox", region: "США", price: 5490, description: "Карта Xbox Live US.", features: ["US аккаунт"] }),
  make({ title: "Nintendo eShop $35 (USA)", category: "giftcards", platform: "PC", region: "США", price: 3790, description: "Подарочная карта Nintendo eShop.", features: ["US"] }),
  make({ title: "Google Play 1000 ₽", category: "giftcards", platform: "Web", region: "Россия", price: 1090, description: "Карта Google Play.", features: ["RU"] }),
  make({ title: "App Store & iTunes $25 (USA)", category: "giftcards", platform: "Web", region: "США", price: 2890, description: "Карта Apple iTunes US.", features: ["US"] }),
  make({ title: "Razer Gold 1000 ₽", category: "giftcards", platform: "Web", region: "Россия", price: 1190, description: "Universal-валюта для игр.", features: ["Универсальная"] }),
  make({ title: "Amazon Gift Card $20 (USA)", category: "giftcards", platform: "Web", region: "США", price: 2190, description: "Amazon US.", features: ["US"] }),

  // === КЛЮЧИ Steam / Epic / Battle.net ===
  make({ title: "Steam Random Premium Key", category: "keys", platform: "Steam", region: "Глобал", price: 299, oldPrice: 999, description: "Случайный ключ премиум-игры в Steam.", features: ["Steam ключ", "Random"], hot: true }),
  make({ title: "Steam Random Top Key", category: "keys", platform: "Steam", region: "Глобал", price: 590, oldPrice: 1499, description: "Случайный ТОП-ключ Steam.", features: ["Steam ключ", "Top tier"] }),
  make({ title: "Steam Random AAA Key", category: "keys", platform: "Steam", region: "Глобал", price: 1290, description: "AAA-тайтл рандомом.", features: ["AAA"] }),
  make({ title: "DLC: Cyberpunk 2077 — Phantom Liberty", category: "keys", platform: "Steam", region: "Турция", price: 1490, description: "Дополнение Phantom Liberty.", features: ["DLC"] }),
  make({ title: "DLC: Elden Ring — Shadow of the Erdtree", category: "keys", platform: "Steam", region: "Турция", price: 1990, description: "Большое DLC Elden Ring.", features: ["DLC"] }),
  make({ title: "World of Warcraft: The War Within", category: "keys", platform: "Battle.net", region: "Турция", price: 2890, description: "Новое дополнение WoW.", features: ["Battle.net"], new: true }),
  make({ title: "Path of Exile 2: Early Access Pack", category: "keys", platform: "PC", region: "Глобал", price: 2390, description: "Ранний доступ к PoE 2.", features: ["EA"], new: true }),

  // === ПО ===
  make({ title: "Windows 11 Pro OEM", category: "software", platform: "PC", region: "Глобал", price: 990, oldPrice: 14999, description: "Лицензионный ключ Windows 11 Pro.", features: ["Бессрочно", "1 ПК"] }),
  make({ title: "Windows 10 Pro OEM", category: "software", platform: "PC", region: "Глобал", price: 590, oldPrice: 12999, description: "Ключ Windows 10 Pro.", features: ["Бессрочно", "1 ПК"] }),
  make({ title: "Office 2021 Professional Plus", category: "software", platform: "PC", region: "Глобал", price: 1490, oldPrice: 24999, description: "Word, Excel, PowerPoint, Outlook.", features: ["Бессрочно", "1 ПК"], logoTile: true }),
  make({ title: "Microsoft 365 Family 12 мес", category: "software", platform: "PC", region: "Турция", price: 2990, description: "6 пользователей, 1 ТБ OneDrive.", features: ["12 месяцев"] }),
  make({ title: "ESET NOD32 Internet Security 1 год", category: "software", platform: "PC", region: "Глобал", price: 890, description: "Антивирус на 1 ПК.", features: ["1 год"] }),
  make({ title: "Kaspersky Plus 1 год / 3 устр.", category: "software", platform: "PC", region: "Россия", price: 1390, description: "Антивирус Касперского.", features: ["1 год", "3 устр."] }),
  make({ title: "NordVPN 24 мес", category: "software", platform: "Web", region: "Глобал", price: 2990, oldPrice: 9999, description: "VPN-подписка на 2 года.", features: ["24 месяца"] }),
  make({ title: "ExpressVPN 12 мес", category: "software", platform: "Web", region: "Глобал", price: 3490, description: "VPN на год.", features: ["12 месяцев"] }),
];

export const categories: Record<Category, { title: string; description: string; icon: string }> = {
  games: { title: "Игры", description: "Steam, PlayStation, Xbox", icon: "Gamepad2" },
  subscriptions: { title: "Подписки", description: "PS Plus, Game Pass, Netflix", icon: "Crown" },
  keys: { title: "Ключи и DLC", description: "Random-ключи и дополнения", icon: "Key" },
  giftcards: { title: "Подарочные карты", description: "Steam, PSN, Xbox, Google Play", icon: "Gift" },
  ingame: { title: "Внутриигровая валюта", description: "V-Bucks, Robux, VP, гемы", icon: "Coins" },
  software: { title: "Программы", description: "Windows, Office, VPN, антивирусы", icon: "AppWindow" },
};

export const platforms: Platform[] = ["Steam", "PlayStation", "Xbox", "Epic Games", "Origin", "Ubisoft", "Battle.net", "GOG", "Riot", "PC", "Web"];

export const regions: Region[] = ["Россия", "Турция", "Аргентина", "США", "Европа", "Глобал", "Казахстан", "Украина"];

export const genres = Array.from(
  new Set(products.flatMap((p) => p.genres ?? []))
).sort();

export function searchProducts(query: string, items: Product[] = products): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return items;
  return items.filter((p) =>
    [p.title, p.subtitle, p.platform, p.region, ...(p.genres ?? []), ...(p.tags ?? [])]
      .filter(Boolean)
      .some((s) => String(s).toLowerCase().includes(q))
  );
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(value) + " ₽";
}

// Детерминированная SVG-плашка — fallback, если внешний логотип не загрузился.
// Гарантирует, что у каждого товара всегда есть аккуратная картинка.
export function brandTile(title: string): string {
  const clean = title.replace(/[^A-Za-zА-Яа-я0-9\s]/g, " ").trim();
  const words = clean.split(/\s+/).filter(Boolean);
  const initials = (words.length >= 2
    ? words[0][0] + words[1][0]
    : (words[0] ?? "W").slice(0, 2)
  ).toUpperCase();
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 400'>` +
    `<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>` +
    `<stop offset='0%' stop-color='%230a0a0a'/><stop offset='100%' stop-color='%23161616'/>` +
    `</linearGradient></defs>` +
    `<rect width='300' height='400' fill='url(%23g)'/>` +
    `<circle cx='150' cy='170' r='70' fill='none' stroke='%2384e635' stroke-width='2' opacity='0.4'/>` +
    `<text x='150' y='195' text-anchor='middle' font-family='Inter,system-ui,sans-serif' font-size='72' font-weight='800' fill='%2384e635'>${initials}</text>` +
    `<text x='150' y='310' text-anchor='middle' font-family='Inter,system-ui,sans-serif' font-size='16' font-weight='600' fill='%23ffffff' opacity='0.85'>WHARP</text>` +
    `</svg>`;
  return `data:image/svg+xml;utf8,${svg}`;
}

