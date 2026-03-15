export type MDReference = {
    videoId: string;
    author: string;
    tags: string[];
    timecode: number;
}

export const references: MDReference[] = [
    {
        videoId: "DRc7ISfv6GA",
        timecode: 10 * 60 + 55,
        author: "Joyca",
        tags: ["text"],
    },
    {
        videoId: "DRc7ISfv6GA",
        timecode: 11 * 60,
        author: "Joyca",
        tags: ["jingle"],
    },
    {
        videoId: "cTsONdoPgiU",
        timecode: 7 * 60 + 10,
        author: "Amixem",
        tags: ["transition"],
    },
    {
        videoId: "JJcKDAMb27k",
        timecode: 17 * 60 + 55,
        author: "Amixem",
        tags: ["carte"],
    },
]
