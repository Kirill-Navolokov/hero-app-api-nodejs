import { injectable } from 'inversify';
import { WodHonorship } from '../enums/wodHonorship';
import { Wod } from '../models/wod';

@injectable()
export default class WodsService {
    private wods: Wod[];

    constructor() {
        this.wods = [
            {
                id: 1,
                name: 'Test WOD 1',
                description: 'Test WOD 1 description',
                imageUrl: '',
                honorship: [WodHonorship.Hero, WodHonorship.Memorial],
                scheme: 'Test WOD scheme',
                createdAt: new Date(Date.now()),
                wodDate: new Date(Date.now()),
                isDeleted: false
            },
            {
                id: 2,
                name: 'Test WOD 2',
                description: 'Test WOD 2 description',
                imageUrl: '',
                honorship: [WodHonorship.Memorial],
                scheme: 'Test WOD scheme',
                createdAt: new Date(Date.now()),
                wodDate: new Date(Date.now()),
                isDeleted: false
            },
            {
                id: 3,
                name: 'Test WOD 3',
                description: 'Test WOD 3 description',
                imageUrl: '',
                honorship: [WodHonorship.Hero],
                scheme: 'Test WOD scheme',
                createdAt: new Date(Date.now()),
                wodDate: new Date(Date.now()),
                isDeleted: false
            }
        ]
    }
    public getWods(): Wod[] {
        return this.wods;
    }

    public getWod(id: number): Wod | undefined {
        var wod = this.wods.find(w => w.id == id);

        return wod;
    }

    public createWod(wod: Wod): Wod {
        wod.createdAt = new Date(Date.now());
        wod.isDeleted = false;

        this.wods.push(wod);

        return wod;
    }

    public updateWod(id: number, wodUpdate: Wod): Wod | undefined{
        var wodIndex = this.wods.findIndex(wod => wod.id == id);
        var wodExists = wodIndex !== -1;
        if(wodExists) {
            this.wods[wodIndex] = wodUpdate;
        } 
        
        return wodExists ? wodUpdate : undefined;
    }

    public deleteWod(id: number) {
        var wod = this.wods.find(w => w.id == id);
        if(wod) {
            wod.isDeleted = true;
        }
    }
}