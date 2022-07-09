// Cards are hardcoded for convience
export interface Card {
    imageUrl: string
}

// Hard-code your cards here: string }> = 
export const CARD_PATH_MAPPER = {
    0: '/images/cards/generic.png',
    1: '/images/cards/Baan A.png',
    2: '/images/cards/Baan B.png',
    3: '/images/cards/Baan C.png',
    4: '/images/cards/Baan D.png',
    5: '/images/cards/Baan E.png',
    6: '/images/cards/Baan F.png',
    7: "/images/cards/Break.png"
} as const

export type CARD_PATH_MAPPER = keyof typeof CARD_PATH_MAPPER