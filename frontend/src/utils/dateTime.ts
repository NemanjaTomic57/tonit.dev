interface DateTimeOffsetPayload {
    dateTime: string; // Local wall-clock time (no offset)
    offset: string; // Offset from UTC in "+HH:mm" or "-HH:mm" format
}

export function formatMeetingTimeToDateTimeOffset(input: string): DateTimeOffsetPayload {
    const normalized = input.replace(' at ', ' ');
    const date = new Date(normalized);

    // Convert to UTC parts
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');

    // Get the local offset from the original date
    const offsetMinutes = -date.getTimezoneOffset(); // positive east of UTC
    const sign = offsetMinutes >= 0 ? '+' : '-';
    const abs = Math.abs(offsetMinutes);
    const offsetHours = String(Math.floor(abs / 60)).padStart(2, '0');
    const offsetMins = String(abs % 60).padStart(2, '0');

    return {
        dateTime: `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`,
        offset: `${sign}${offsetHours}:${offsetMins}`,
    };
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
