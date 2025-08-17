import { Db, ObjectId } from "mongodb";
import { DataSeeder } from "./dataSeeder";
import { EnvConfig } from "../../config/environment";
import { WodEntity } from "../entities/wodEntity";
import { seedingConstants } from "./seedingConstants";
import { BaseSeeder } from "./baseSeeder";

export class WodsSeeder extends BaseSeeder implements DataSeeder {
    constructor(private envConfig: EnvConfig) {
        super()
    }

    async seed(db: Db): Promise<void> {
        var wodsCollection = db.collection(this.envConfig.dbWodsCollection);

        await this.seedEntities(wodsCollection);
    }

    async getSeedData() : Promise<any[]> {
        var data: WodEntity[] = [
            {
                _id: new ObjectId(seedingConstants.wods.mali),
                unitId: new ObjectId(seedingConstants.units.gur),
                name: "Малі",
                description: `Народився на Полтавщині, родом із Селещини Машівського району.
В 19 років Євгеній кинув університет і вступив до лав Французького іноземного легіону, де відслужив 5 років. Бувши легіонером, брав участь у військових відрядженнях до Абу-Дабі, Малі (Африка) та Французької Гвіани (Південна Америка).
Після військової служби залишився у Франції, працював особистим охоронцем на Лазурному узбережжі.
Після повномасштабного вторгнення Євгеній кинув роботу і повернувся в Україну. Служив у добровольчому батальйоні, Силах спеціальних операцій, а також в Головному управлінні розвідки Міністерства оборони України (спецпідрозділ «Тимура»).
Нагороджений Орденом за мужність ІІІ ступеня посмертно.
Медаллю «Хрест свободи».`,
                scheme: `10 rounds
200 meters run
5 devil presses (you pick weight)`,
                executionDate: new Date("2022-09-21"),
                creationDate: new Date(),
                type: 0,
                imageUrl: "https://i1.poltava.to/uploads/2022/09/2022-09-24/mali.jpg",
                imageName: "Mali.jpg"
            },
            {
                _id: new ObjectId(seedingConstants.wods.daVinci),
                unitId: new ObjectId(seedingConstants.units.daVinciWolfs),
                name: "Да Вінчі",
                description: `Російське вторгнення Дмитро з підрозділом зустріли на Донбасі, в лютому 2022 року рота воювала поблизу Щастя на Луганщині. Навесні 2022 року штурмову роту «Вовки Да Вінчі» переформовано на 1-й окремий штурмовий батальйон «Вовки Да Вінчі» у складі 67-ї окремої механізованої бригади ЗСУ.
7 березня 2023 року Коцюбайло загинув у битві за Бахмут. За словами свого заступника, Капусти, після втримання траси на Хромове вони повернулися до міста Часів Яр, де їх накривала ворожа артилерія. Їх було троє: Капуста, Мітчел і Да Вінчі. Мітчел забіг у під'їзд, а Капуста з Дмитром були в дверях, коли стався вибух. Дмитро розвернувся й видавлював з себе, що він поранений, а за хвилину знепритомнів. Попри швидку евакуацію поранення Дмитра було в шию і несумісне з життям.
9 березня 2023 року відбулося прощання з Дмитром у Бовшеві та Бурштині, наступного дня, 10 березня, відбулося прощання в Києві. Тисячі українців прощалися з Дмитром на Майдані. Віддати останню честь прийшли президент Володимир Зеленський і вище військове керівництво України: головнокомандувач Валерій Залужний, начальник ГУР Кирило Буданов, міністр оборони Олексій Резніков і бригадні генерали ЗСУ.
Дмитра поховано на Аскольдовій Могилі.`,
                scheme: `5 rounds
16 calories fan bike
10-12 dumbbell bench presses (you pick weight)
--into--
16 calories fan bike
8-10 incline dumbbell bench presses`,
                executionDate: new Date("2023-03-07"),
                creationDate: new Date(),
                type: 1,
                imageUrl: "https://static.espreso.tv/uploads/photobank/215000_216000/215080_17358834_409464116086617_8068708098408737869_o_new_960x380_0.webp",
                imageName: "DaVinci.webp"
            },
            {
                _id: new ObjectId(seedingConstants.wods.grenka),
                unitId: new ObjectId(seedingConstants.units.azov),
                name: "Грєнка",
                description: `Народився 10 березня 2003 року в місті Вінниця. Ще до свого повноліття таємно пройшов курс молодого бійця в «Азові».
Парамедик, наймолодший серед азовців під час оборони Маріуполя. 19-й день народження зустрів, обороняючи Маріуполь від росіян.
20 травня 2022 року командир загону спецпризначення «Азов» Денис Прокопенко повідомив, що на 86-й день кругової оборони Маріуполя був отриманий наказ про припинення оборони міста. Першочергові вимоги про евакуацію цивільних, поранених та загиблих були виконані. Гринцевич, разом зі своїми побратимами, потрапив у полон до росіян, де провів 4 місяці. Після звільнення повернувся на службу.
21 вересня 2022 року визволений з полону при обміні військовополоненими. Після звільнення він разом із товаришами заснував підрозділ «Контакт 12». Там «Грєнка» був командиром взводу оптичних спостерігачів.
Загинув в бою 6 травня 2024 року. Без Назарія лишились мати, сестра, брат та кохана дівчина Анастасія.
18 листопада 2024 біля Назара було поховано його друга Віктора Хетчикова, уродженця Маріуполя`,
                scheme: `4 rounds
300 meters run
10 power cleans 65%PR
10 toes to bar`,
                executionDate: new Date("2024-05-06"),
                creationDate: new Date(),
                type: 1,
                imageUrl: "https://vn.20minut.ua/img/cache/news_main/news/0034/83/3382350-moe-zhittya-nichogo-ne-varte-porivnyano-z-natsieyu-istoriya-zhittya-poleglogo-geroya-nazariya-grintsevicha.jpeg?hash=2024-05-08-20-18-25",
                imageName: "Grenka.jpeg"
            }
        ]

        return data;
    }
}