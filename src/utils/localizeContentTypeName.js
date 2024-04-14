export function localizeContentTypeName(name) {
    switch (name) {
        case "animated-series":
            return "Анимированный Сериал";
        case "anime":
            return "Аниме";
        case "cartoon":
            return "Мультфильм";
        case "movie":
            return "Фильм";
        case "tv-series":
            return "Сериал";
        default:
            return name;
    }
}
