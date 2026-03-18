export type MDReference = {
    videoId: string;
    author: string;
    tags: string[];
    timecode: number;
    description?: string;
    previewImageOffset?: number;
    previewVideoOffset?: number;
    previewDuration?: number;
}

export const references: MDReference[] = [
    {
        videoId: "DRc7ISfv6GA",
        timecode: 10 * 60 + 55,
        author: "Joyca",
        tags: ["text"],
        previewImageOffset: 1,
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
        previewVideoOffset: 0.5,
    },
    {
        videoId: "wrFsapf0Enk",
        timecode: 50 * 60 + 36,
        author: "Inoxtag",
        tags: ["text"],
        previewImageOffset: 2,
    },
    {
        videoId: "ZRJo0yJWdfY",
        timecode: 27 * 60 + 33,
        author: "Inoxtag",
        tags: ["carte"],
        previewImageOffset: 2,
    },
    {
        videoId: "CVMeLYKPVfE",
        timecode: 2 * 60 + 19,
        author: "Inoxtag",
        tags: ["titre"],
        previewImageOffset: 1,
    },
    {
        videoId: "CVMeLYKPVfE",
        timecode: 2 * 60 + 52,
        author: "Inoxtag",
        tags: ["carte"],
        previewImageOffset: 2,
        previewVideoOffset: 1,
    },
    {
        videoId: "CVMeLYKPVfE",
        timecode: 3 * 60 + 13,
        author: "Inoxtag",
        tags: ["carte"],
        previewDuration: 5,
        previewVideoOffset: 1,
    },
    {
        videoId: "CVMeLYKPVfE",
        timecode: 4 * 60 + 17,
        author: "Inoxtag",
        tags: ["titre"],
        previewVideoOffset: .1
    },
    {
        videoId: "LFo1Qtn9MlM",
        timecode: 3,
        author: "Antoine BM",
        tags: ["text", "icons"]
    },
    {
        videoId: "LFo1Qtn9MlM",
        timecode: 24,
        author: "Antoine BM",
        tags: ["text", "fullscreen"]
    },
    {
        videoId: "LFo1Qtn9MlM",
        timecode: 59,
        author: "Antoine BM",
        tags: ["video", "fullscreen"],
        previewImageOffset: 1,
    },
    {
        videoId: "LFo1Qtn9MlM",
        timecode: 5 * 60 + 25,
        author: "Antoine BM",
        tags: ["screenshot"]
    }
]
