export type MDReference = {
    url: string;
    author: string;
    tags: string[];
    timecode: number;
}

export const references: MDReference[] = [
    {
        url: "https://www.youtube.com/watch?v=DRc7ISfv6GA",
        timecode: 10 * 60 + 55,
        author: "Joyca",
        tags: ["text"],
    },
    {
        url: "https://www.youtube.com/watch?v=DRc7ISfv6GA",
        timecode: 11 * 60,
        author: "Joyca",
        tags: ["jingle"],
    },
    {
        url: "https://www.youtube.com/watch?v=cTsONdoPgiU",
        timecode: 7 * 60 + 10,
        author: "Amixem",
        tags: ["transition"],
    },
    {
        url: "https://www.youtube.com/watch?v=JJcKDAMb27k",
        timecode: 17 * 60 + 55,
        author: "Amixem",
        tags: ["carte"],
    },
]
