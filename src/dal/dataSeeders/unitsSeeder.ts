import { Db, ObjectId } from "mongodb";
import { BaseSeeder } from "./baseSeeder";
import { DataSeeder } from "./dataSeeder";
import { UnitEntity } from "../entities/unitEntity";
import { EnvConfig } from "../../config/environment";
import { seedingConstants } from "./seedingConstants";
import { SocialNetwork } from "../../enums/socialNetwork";

export class UnitsSeeder extends BaseSeeder implements DataSeeder {
    constructor(private envConfig: EnvConfig) {
        super();
    }

    async seed(db: Db): Promise<void> {
        var unitsCollection = db.collection(this.envConfig.dbUnitsCollection);

        await this.seedEntities(unitsCollection);
    }

    async getSeedData(): Promise<any[]> {
        var data: UnitEntity[] = [
            {
                _id: new ObjectId(seedingConstants.units.azov),
                name: "АЗОВ",
                description: `12-та бригада спеціального призначення «Азов» — професійне військове формування в складі Національної гвардії України, засноване 5 травня 2014 року. З першого дня свого існування «Азов» забезпечує захист територіальної цілісності держави, її законів та конституційного ладу, активно бере участь у відбитті російської агресії на території України.
Фундаментальні цінності 12-ої бригади «Азов»: захист держави Україна, її незалежності та безпеки її громадян, патріотизм і відданість державі, людська гідність.`,
                type: 0,
                foundationDate: new Date(2014, 5, 5),
                imageUrl: "https://pik.net.ua/wp-content/uploads/2024/10/462228690_1063990435728218_8531819207706704481_n-1-scaled11-scaled.jpg",
                socialNetworks: {
                    [SocialNetwork.website] : "https://azov.org.ua",
                    [SocialNetwork.instagram] : "https://www.instagram.com/12th.azov.brigade",
                    //[SocialNetwork.twitter]: "https://x.com/azov_media",
                    [SocialNetwork.youtube]: "https://www.youtube.com/@AZOVmedia",
                    // [SocialNetwork.facebook]: "https://www.facebook.com/azov.media4308",
                    // [SocialNetwork.tiktok]: "https://www.tiktok.com/@1st.corps.azov",
                    // [SocialNetwork.telegram]: "https://t.me/azov_brigade_ngu",
                },
                // workouts: [
                //     {
                //         name: "",
                //         date: new Date(),
                //         description: ""
                //     },
                //     {
                //         name: "",
                //         date: new Date(),
                //         description: ""
                //     }
                // ]
            },
            {
                _id: new ObjectId(seedingConstants.units.bratstvo),
                name: "Братство",
                description: `Військовий підрозділ "Братство" був сформований 24 лютого 2022 року добровольцями, учасниками однойменної громадської організації, заснованої у 1995 році українським громадським діячем та письменником Дмитром Корчинським.

На початку повномасштабного вторгнення небайдужі християни різних конфесій об’єдналися та стали на захист України. Батальйон "Братство" брав участь у запеклих боях на різних напрямках, включаючи оборону Київщини, "Дорогу Життя" на Бахмутському напрямку, бої за Харківщину, Херсонщину (Нова Каховка, Енергодар), Авдіївку, висадки в Криму, утримання Вовчанська на Харківському напрямку, повернення під контроль України "Вишок Бойка" у Чорному морі.

Наразі "Братство" входить до складу "Спецпідрозділу Тимура" ГУР МО України, спеціалізується на виконанні диверсійних операцій в глибокому тилу ворога та стабілізує найгарячіші ділянки фронту.
Із Братством пов'язують найбільш небезпечну та відчайдушну роботу, і це небезпідставно.`,
                type: 0,
                foundationDate: new Date(2022, 1, 24),
                imageUrl: "https://bratstvo.army/logo.png",
                socialNetworks: {
                    [SocialNetwork.website] : 'https://bratstvo.army'
                }
            },
            {
                _id: new ObjectId(seedingConstants.units.daVinciWolfs),
                name: "Вовки Да Вінчі",
                description: `Батальйон «Вовки Да Вінчі» (108-й окремий механізований батальйон) — батальйон Сил безпілотних систем Збройних сил України, який входить до складу 59-ї окремої штурмової бригади імені Якова Гандзюка. Командиром батальйону є капітан Сергій Філімонов.

108 окремий механізований батальйон 59 ОШБр утворено на основі «Вовків Да Вінчі», які в лютому 2024 року вийшли зі складу 1-го окремого штурмового батальйону 67 ОМБр.`,
                type: 0,
                foundationDate: new Date(2022, 4, 8),
                imageUrl: "https://scontent-waw2-2.xx.fbcdn.net/v/t39.30808-6/358357536_648204767357184_4535080849947393637_n.png?stp=dst-png_p720x720&_nc_cat=102&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=IG5MXwp3pocQ7kNvgHJ87WN&_nc_zt=23&_nc_ht=scontent-waw2-2.xx&_nc_gid=A1aA0neEeAEngiAZgMp9dcD&oh=00_AYDazkr8FjfTL6mqiMXAntEETosynoz1DLc0j2RLVZxbuA&oe=6784FD62"
            },
            {
                _id: new ObjectId(seedingConstants.units.nobody),
                name: "Nobody",
                description: `ЗАГІН СПЕЦІАЛЬНИХ ДІЙ У СКЛАДІ ГОЛОВНОГО УПРАВЛІННЯ РОЗВІДКИ МО УКРАЇНИ, ЯКИЙ ВИКОНУЄ ДИВЕРСІЙНІ, РОЗВІДУВАЛЬНІ ТА БОЙОВІ ЗАДАЧІ НА ТЕРИТОРІЇ УКРАЇНИ ТА ЗА ЇЇ МЕЖАМИ.

ПІДРОЗДІЛ ВИКОНУЄ БОЙОВІ ЗАВДАННЯ В НЕБІ, НА СУШІ ТА НА ВОДІ — МИ ДІСТАНЕМО ЇХ ВСЮДИ, НАВІТЬ ТАМ, ДЕ ВОРОГ ВВАЖАЄ СЕБЕ НЕДОСЯЖНИМ.

КОЖЕН НАШ БОЄЦЬ — УНІВЕРСАЛЬНИЙ СПЕЦІАЛІСТ, ЯКИЙ ОПЕРУЄ РІЗНИМИ ВИДАМИ ОЗБРОЄННЯ ТА ТЕХНІКИ. МИ СИСТЕМНО ВПРОВАДЖУЄМО НОВІТНІ ТЕХНОЛОГІЇ ТА ТАКТИКИ ПРОВЕДЕННЯ ОПЕРАЦІЙ, ВИПЕРЕДЖАЮЧИ ВОРОГА НА ДЕКІЛЬКА КРОКІВ.`,
                type: 0,
                foundationDate: new Date(2022, 1, 24),
                imageUrl: "https://nobody.army/assets/img/bg-5.webp",
                socialNetworks: {
                    [SocialNetwork.instagram] : "https://www.instagram.com/nobody_we_are",
                    [SocialNetwork.website]: "https://nobody.army"
                },
            },
            {
                _id: new ObjectId(seedingConstants.units.artan),
                name: "АРТАН",
                description: `Спецпідрозділ «АРТАН» — підрозділ активних дій Головного управління розвідки Міністерства оборони України.

Девіз: Scimus. Invenimus. Delemus. (укр: Знаємо. Знаходимо. Знищуємо.).

Спецпідрозділ сформований під час повномасштабного російського вторгнення в Україну з добровольців, є підрозділом активних дій Головного управління розвідки Міністерства оборони України та став відомим завдяки зухвалим та унікальним операціям.

За час повномасштабного російського вторгнення в Україну воїни підрозділу брали участь у битвах за Київщину, Донеччину, обороняли Бахмут, Куп'янськ, Часів Яр, звільняли Харківщину, повернули «вишки Бойка» та змінили розстановку сил в акваторії Чорного моря, сприяли розблокуванню зернового коридору, а також виконували складні та успішні операції в тилу ворога.

Бійців підрозділу активних дій ГУР МО України «Артан» кілька разів у своїх щоденних зверненнях відзначав Президент України Володимир Зеленський.`,
                type: 0,
                foundationDate: new Date(2022, 5, 1),
                imageUrl: "https://scontent.fkun1-2.fna.fbcdn.net/v/t39.30808-6/438097482_122143117406101106_8330186646644860787_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=mdXIbE1CZeIQ7kNvwFtfees&_nc_oc=Adnm7lOH8ee7b5T66BCQsWVDNHQknvgIW4OgC-sYnvtGgc72Jx2N8ixxT2hitb8OAxM&_nc_zt=23&_nc_ht=scontent.fkun1-2.fna&_nc_gid=0c1icHItF7y6mbK8V9R_3w&oh=00_AfQB_n16a0XW0I_ncxTrw2aRAzgdr0v8AzmjpDcS-02vCg&oe=6875FCB5",
                socialNetworks: {
                    [SocialNetwork.instagram] : "https://www.instagram.com/artan.gur",
                    [SocialNetwork.website]: "https://www.artan-gur.com"
                },
            },
            {
                _id: new ObjectId(seedingConstants.units.shamanbat),
                name: "Шаманбат",
                description: `Батальйон «Шаман» («Шаманбат»)  — підрозділ спеціального призначення ГУР МО.

Бійці загону відзначаються навичками в дайвінгу, парашутному спорті та альпінізмі. Члени батальйону воювали пліч-о-пліч з американськими та британськими колегами в Афганістані та заробили славу вершків українських спецпризначенців. Імовірно, ідеться про «зухвалу» спецоперацію українських військових з евакуації біженців із Кабулу.`,
                type: 0,
                foundationDate: new Date(2022, 1, 23),
                imageUrl: "https://cdn.prod.website-files.com/65f1832aa515715046fe6caa/65f1a28c9626b4fee346f8d1_intro-logo.png",
                socialNetworks: {
                    [SocialNetwork.website]: "https://www.pirateship.company"
                },
            },
            {
                _id: new ObjectId(seedingConstants.units.kraken),
                name: "Kraken",
                description: `KRAKEN - підрозділ активних дій Головного управління розвідки Міністерства оборони України, сформований ветеранами полку «АЗОВ», офіцерами ГУР МОУ, футбольними фанатами та добровольцями 24 лютого 2022 року у Харкові, на початку повномасштабного вторгнення.`,
                type: 0,
                foundationDate: new Date(2022, 1, 24),
                imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/97/Kraken_Special_Unit_Insignia.png",
                socialNetworks: {
                    [SocialNetwork.website]: "https://kraken-gur.army"
                },
            },
            {
                _id: new ObjectId(seedingConstants.units.assault3rd),
                name: "3 ОШБ",
                description: `Третя окрема штурмова бригада – добровольчий підрозділ, сформований у перші дні повномасштабного вторгнення. Засновник – перший командир полку «Азов» Андрій Білецький.

Третя окрема штурмова бригада сформована на тих самих принципах, на яких стоїть легендарний «Азов» та весь Азовський рух. Базові світоглядні засади азовських підрозділів – україноцентризм, традиціоналізм, ієрархія й відповідальність. Пройшовши складний відбір, до наших лав потрапляють лише високомотивовані та сильні духом бійці,
готові до постійного вдосконалення та важких боїв з ворогом на передовій.

Кістяком добровольчого загону ТрО, створеного 24 лютого 2022 р., з якого починається історія бригади, стали ветерани ОЗСП «Азов» НГУ та представники Азовського руху.

9 березня загін був розширений до ОПСП «Азов» у складі
Збройних Сил України, а згодом реформований в окремий підрозділ ССО «Азов» ЗСУ. У січні 2023 р. ССО «Азов» перейшов
до складу Сухопутних військ ЗСУ та був розширений до бригади.`,
                type: 0,
                foundationDate: new Date(2022, 1, 24),
                imageUrl: "https://sz.uzhgorod.ua/wp-content/uploads/2024/03/prapor-3-oshbr-okrema-shturmova-brygada.jpg",
                socialNetworks: {
                    [SocialNetwork.website]: "https://ab3.army",
                    [SocialNetwork.instagram]: "https://www.instagram.com/ab3.army",
                    [SocialNetwork.youtube]: "https://www.youtube.com/@ab3army",
                    [SocialNetwork.spotify]: "https://open.spotify.com/artist/5PchdBWAnESzmi6rBbxq4M?si=sMTLorLBSnu2mo7uvXkknw"
                },
            },
            {
                _id: new ObjectId(seedingConstants.units.internationalLegion),
                name: "Міжнародний легіон ГУР МО",
                description: `Міжнародний легіон при ГУР МО України – окремий спецпідрозділ Інтернаціонального легіону оборони України.

Міжнародний легіон — підрозділ, підпорядкований Головному управлінню розвідки Міністерства оборони України.

До складу Легіону входять бійці, які мають високий рівень професіоналізму, попередній військовий досвід, демонструють високу моральну та стресостійкість, цілеспрямовані, надійні та відповідальні, готові виконувати завдання в екстремальних умовах, мають високу фізичну витривалість, є хорошими командними гравцями.

До пріоритетних якостей бійців підрозділу керівництво відносить: професіоналізм, товариськість, надійність, відповідальність, совісність, чесність, ініціативність, самовдосконалення.

Станом на 7 березня 2022 року стати до лав Легіону виявили бажання добровольці та ветерани з 52 країн світу, загальною чисельністю понад 20 тисяч осіб. Це переважно досвідчені бійці, які брали участь у багатьох миротворчих кампаніях в різних куточках світу.

Зокрема, відомо про бійців з Польщі, Шотландії, Греції, Бразилії, Колумбії, США, Сакартвело, Норвегії, Австралії та Нової Зеландії.`,
                type: 0,
                foundationDate: new Date(2022, 2, 7),
                imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/LegionDIU.webp/600px-LegionDIU.webp.png",
                socialNetworks: {
                    [SocialNetwork.website]: "https://uadd.me/DIULegion",
                    [SocialNetwork.instagram]: "https://www.instagram.com/international_legion_diu"
                },
            },
            {
                _id: new ObjectId(seedingConstants.units.cgt),
                name: "Company Group Team",
                description: `Мілітарне ком‘юніті «Company Group Team» – команда ветеранів  та діючих військовослужбовців.`,
                type: 1,
                foundationDate: new Date(2018, 1, 1),
                imageUrl: "https://static.wixstatic.com/media/5a33ce_9748a8d3161f48ee9f0a9a0f310d61d3~mv2.png/v1/fill/w_1080,h_1080,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/1.png",
                socialNetworks: {
                    [SocialNetwork.instagram] : "https://www.instagram.com/company_group_team",
                    [SocialNetwork.youtube]: "https://www.youtube.com/@CompanyGroupTeam"
                },
            }
        ]

        return data;
    }
}