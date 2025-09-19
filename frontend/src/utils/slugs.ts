export function slugify(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-') // replace spaces with -
        .replace(/[^a-z0-9\-]/g, '') // remove non-alphanumeric and non-hyphen chars
        .replace(/\-+/g, '-'); // collapse multiple hyphens
}
