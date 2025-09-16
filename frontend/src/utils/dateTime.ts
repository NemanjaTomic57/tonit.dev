export function translateIsoDateToLocale(isoDate: string) {
    const dt = new Date(isoDate);
    const dateStr = new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }).format(dt);
    return dateStr;
}

export function readingTimeMinutes(text: string, wordsPerMinute = 200) {
    const words = (text.trim().match(/\S+/g) ?? []).length;
    return Math.max(1, Math.ceil(words / wordsPerMinute));
}
