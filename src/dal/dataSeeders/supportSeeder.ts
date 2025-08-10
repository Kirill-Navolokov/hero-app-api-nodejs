import { Db } from "mongodb";
import { EnvConfig } from "../../config/environment";
import { BaseSeeder } from "./baseSeeder";
import { DataSeeder } from "./dataSeeder";

export class SupportSeeder extends BaseSeeder implements DataSeeder {
    constructor(private envConfig: EnvConfig) {
        super();
    }

    async seed(db: Db): Promise<void> {
        var supportCollection = db.collection(this.envConfig.dbSupportCollection);

        await this.seedEntities(supportCollection);
    }

    
    async getSeedData(): Promise<any[]> {
        var data: any[] = [
            {
                _id: "advices",
                advices: [
                    {
                        author: "Грєнка",
                        advices: [
                            "Любіть маму", "Їжте кашу", "Любіть Україну"
                        ]
                    },
                    {
                        author: "Hero Book",
                        advices: [
                            "Тренуйте ноги так, наче це єдине, що приносить задоволення"
                        ]
                    },
                ]
            },
            {
                _id: "faqs",
                faqs: [
                    {
                        question: "Навіщо це?",
                        answer: "Щоб пам'ятати."
                    },
                    {
                        question: "Ми підрозділ/спільнота, хочемо потрапити на платформу",
                        answer: "Пишіть в телеграм https://t.me/herobook_dev"
                    },
                    {
                        question: "Чи треба усім підрозділам мати сторінку на платформі?",
                        answer: `Якщо ви не плануєете регулярно публікувати свої тренування та заохочувати людей до цього, то ні.
Решта соц. мерeж та медіа ресурсів задовільнять і перекриють усі ваши потреби.`
                    },
                    {
                        question: "Запропонувати воркаут на честь героя чи події",
                        answer: "Пишіть в телеграм https://t.me/herobook_dev"
                    },
                    {
                        question: "Якщо я/ми запропонували воркаут чи буде він обовʼязково доданий?",
                        answer: `Ні. Кожен воркаут на честь героя чи події, розглядається з точки зору історичності, медійності та інших факторів.

Але це не ввідміняє того, що кожен наш воїн це - герой/героїня, завдяким яким світ навколо нас досі існує.`
                    },
                ]
            }
        ];

        return data;
    }

}