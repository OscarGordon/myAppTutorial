export class WodModel {
    constructor(public goal: string,
                public rx: boolean,
                public timecap: string,
                public timecapped: boolean,
                public time: string,
                public repsdone: number,
                public roundsdone: number,
                public rounds: any[]
                ){

    }
}
