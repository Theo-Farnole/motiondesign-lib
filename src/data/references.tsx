export type MDReference = {
    videoId: string;
    author: string;
    tags: string[];
    timecode: number;
    description?: string;
    previewImageOffset?: number;
    previewDuration?: number;
}

export const references: MDReference[] = [
    {
        videoId: "DRc7ISfv6GA",
        timecode: 10 * 60 + 55,
        previewImageOffset: 1,
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
        timecode: 7 * 60 + 7,
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
        previewImageOffset: 2,
        author: "Inoxtag",
        tags: ["text"]
    },
    {
        videoId: "ZRJo0yJWdfY",
        timecode: 27 * 60 + 33,
        previewImageOffset: 2,
        author: "Inoxtag",
        tags: ["carte"]
    },
    {
        videoId: "CVMeLYKPVfE",
        timecode: 2 * 60 + 19,
        previewImageOffset: 1,
        author: "Inoxtag",
        tags: ["title"]
    },
    {
        videoId: "CVMeLYKPVfE",
        timecode: 2 * 60 + 52,
        previewImageOffset: 2,
        author: "Inoxtag",
        tags: ["carte"]
    },
    {
        videoId: "CVMeLYKPVfE",
        timecode: 3 * 60 + 13,
        author: "Inoxtag",
        previewDuration: 5,
        tags: ["carte"]
    },
    {
        videoId: "CVMeLYKPVfE",
        timecode: 4 * 60 + 17,
        author: "Inoxtag",
        tags: ["titre"]
    }
]
