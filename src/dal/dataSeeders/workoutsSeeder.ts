import { Db, ObjectId } from "mongodb";
import { BaseSeeder } from "./baseSeeder";
import { DataSeeder } from "./dataSeeder";
import { EnvConfig } from "../../config/environment";
import { WorkoutEntity } from "../entities/workoutEntity";
import { seedingConstants } from "./seedingConstants";

export class WorkoutsSeeder extends BaseSeeder implements DataSeeder {
    constructor(private envConfig: EnvConfig) {
        super()
    }

    async Seed(db: Db): Promise<void> {
        var workoutsCollection = db.collection(this.envConfig.dbWorkoutsCollection);

        await this.SeedEntities(workoutsCollection);
    }

    async getSeedData(): Promise<any[]> {
        var data: WorkoutEntity[] = [
            {
                _id: new ObjectId(seedingConstants.workouts.azov1),
                unitId: new ObjectId(seedingConstants.units.azov),
                date: new Date(),
                description: `Розминка
3 rounds:
10 calories row
10 push ups
5 single arm db strict press light
5 pull ups
10 box step ups

Силова частина
5x5 pause bench press hold weight on your chest for 2 seconds
go light here 50-55%

Dumbbell incline bench
3x15 speed reps

Single arm dumbbell bench
3x8 each arm

Функціональна частина
20 minutes AMRAP
10 calories row
10 slam balls
10 prison burpee (burpee with 3 push ups)`
            },
            {
                _id: new ObjectId(seedingConstants.workouts.azov2),
                unitId: new ObjectId(seedingConstants.units.azov),
                name: "Тестовий",
                date: new Date(),
                description: `Розминка
3 rounds
10 burpee
10 air squats
15 seconds high knees
10 balboas light weight

Силова
5x3 back squats with 2 seconds pause at bottom 55-60%

Split squats
3x10 hold dumbbell

Функціональна частина
4 rounds
25 calories row
100feets sled push
10 pull ups

Силова
3x12-15 leg extensions
3x30 seconds L-sit holds`
            },
            {
                _id: new ObjectId(seedingConstants.workouts.cgt1),
                unitId: new ObjectId(seedingConstants.units.cgt),
                date: new Date(),
                description: `Розминка
3 rounds
10 calories bike
50 single unders

Силова
4x8-10 dumbbell rows single arm
3x10 back extensions
3x15 single arm lat pull down each arm
    
Функціональна частина
1 mile run - every minute 5 burpees
* start run and run till 1st minute stop clock do burpees
then start clock again and run till 2nd minute do burpees
and so on`
            }
        ];

        return data;
    }

}