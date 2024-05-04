export interface AfterTalk {
    meeting: string[];
    afterTalk: string;
    totalPoint: number;
    meetingPhoto: File[];
    wineNames: string[];
    wineRegion: string;
    wineFactory: string;
    wineVintage: Date;
    wineVariety: string;
    inputDate: Date;
    sweetness: number;
    acidity: number;
    body: number;
    tannins: number;
    alcohol: number;
    totalWinePoint: number;
    wineNumber: string;
    wineColor: string;
    wineFruitSmell: string;
    wineFlowerSmell: string;
    wineSpacy: number;
    wineHerb: string;
    wineOak: number;
    other: string;
    detailNote: string;
}

export interface JoinedMeetingList {
    uuid: String,
    subject : String;
}
