export function formatMeetingTimeToDateTimeOffset(input: string): string {
    const withoutDay = input.replace(/^[A-Za-z]{3},\s*/, '');
    const normalized = withoutDay.replace(' at ', ' ');
    const localDate = new Date(normalized);
    if (isNaN(localDate.getTime())) {
        throw new Error('Invalid date format');
    }

    const pad = (n: number) => String(n).padStart(2, '0');

    return (
        `${localDate.getUTCFullYear()}-` +
        `${pad(localDate.getUTCMonth() + 1)}-` +
        `${pad(localDate.getUTCDate())}T` +
        `${pad(localDate.getUTCHours())}:` +
        `${pad(localDate.getUTCMinutes())}:` +
        `${pad(localDate.getUTCSeconds())}+00:00`
    );
}

export function formatDateToLocale(isoDate: string) {
    const dt = new Date(isoDate);
    const dateStr = new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }).format(dt);
    return dateStr;
}

export function formatDateTimeToMeetingTime(isoString: string): string {
    const date = new Date(isoString);

    // Format in European style with local timezone
    return date.toLocaleString(undefined, {
        weekday: 'short', // e.g. Thu
        day: '2-digit', // 18
        month: 'long', // September
        year: 'numeric', // 2025
        hour: '2-digit', // 09
        minute: '2-digit',
        hour12: false, // 24h format (common in EU)
    });
}

export function readingTimeMinutes(text: string, wordsPerMinute = 200) {
    const words = (text.trim().match(/\S+/g) ?? []).length;
    return Math.max(1, Math.ceil(words / wordsPerMinute));
}
