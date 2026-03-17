export type MDReference = {
    videoId: string;
    author: string;
    tags: string[];
    timecode: number;
    description?: string;
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
    {
        videoId: "wrFsapf0Enk",
        timecode: 50 * 60 + 36,
        author: "Inoxtag",
        tags: ["text"]
    },
    {
        videoId: "ZRJo0yJWdfY",
        timecode: 27 * 60 + 33,
        author: "Inoxtag",
        tags: ["carte"]
    },
    {
        videoId: "CVMeLYKPVfE",
        timecode: 2 * 60 + 19,
        author: "Inoxtag",
        tags: ["title"]
    },
    {
        videoId: "CVMeLYKPVfE",
        timecode: 2 * 60 + 52,
        author: "Inoxtag",
        tags: ["carte"]
    },
    {
        videoId: "CVMeLYKPVfE",
        timecode: 3 * 60 + 12,
        author: "Inoxtag",
        tags: ["carte"]
    },
    {
        videoId: "CVMeLYKPVfE",
        timecode: 4 * 60 + 17,
        author: "Inoxtag",
        tags: ["titre"]
    }
]
