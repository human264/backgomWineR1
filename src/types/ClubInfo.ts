export interface ClubInfo {
    id: number;
    clubSubject: string;
    clubUrl: string;
    clubMemberNo?: number;
    location?: string;
    theJungMoExists?: boolean;
    theBunGaeExists?: boolean;
    point?: number;
    clubImagePath?: string;
}

export interface ClubMeetingCreate {
    uuid?: string;
    subject?: string;
    detail?: string;
    wineName?: [string?];
    meetingDate?: Date
    meetingTime?: [Date, Date]
    location?: string
    locatedPoint?: string
    jointedCost?: number
    joinCount?: number
    totalJoinCount?: number
    createdClub?: string
}

export interface WineInfo {
    name: "",
    type:"",
    region: "",
    winery: "",
    vintage: "",
    sweetness: 0.0,
    acidity: 0.0,
    alcohol: 0.0,
    body: 0.0,
    density: 0.0,
    tannins: 0.0,
    anoma: ""
}

export interface MeetingTableDto {
    uuid: string;
    subject: string;
    detail: string;
    wineName: string[];

    meetingDate: Date; // Assuming meetingDate is formatted as "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"

    meetingTime: Date[]; // Assuming meetingTime is an array of strings formatted as "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"

    meetingTimeStart: Date; // Assuming meetingTimeStart is formatted as "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
    meetingTimeEnd: Date; // Assuming meetingTimeEnd is formatted as "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"

    location: string;
    locatedPoint: string;
    jointedCost: number;
    joinCount: number;
    totalJoinCount: number;
    createdClub: string;

    isCanJoin: boolean;
}


export interface MeetingJoinInDto {
    email: String,
    meetingUUid : String;
}



