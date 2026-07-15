// ── Lugave clan lineage registry: Amasiga → Emituba → Ennyiriri ──────────────
//
// Source: "Ekika ky'Abolugave mu Bwakabaka bwa Buganda" (2021), the 164-page
// clan archive compiled by Mwalimu R.N. Sserunjogi for the Lugave Clan
// Archives & Records (pp. 55–94 and 137–139). Every eddiira-Olugave Muganda
// falls under one of the 17 Amasiga below or one of the 6 Emituba Emirangira
// (royal sub-lineages of the Akasolya, listed separately at the bottom).
//
// Editorial notes:
//  - Seats are given as "place, county" simplified from the archive's
//    "e Place – Gombolola – Ssaza (District)" strings.
//  - Heads (in `head`) are the lineage leaders the archive names at ssiga /
//    mutuba level (pp. 59–94, 137–139). Individual contact names the archive
//    attaches to some ennyiriri are deliberately NOT reproduced here.
//  - Where the archive says a mutuba's ennyiriri are not yet organised, the
//    list is empty and `note` explains why. This is a living record.

export interface Mutuba {
  name: string;
  seat?: string;
  head?: string;
  note?: string;
  ennyiriri: string[];
}

export interface Ssiga {
  name: string;
  seat: string;
  head?: string;
  note?: string;
  emituba: Mutuba[];
}

export const AMASIGA: Ssiga[] = [
  {
    name: "Natiigo",
    seat: "Magala, Ssekanyonyi – Ssingo (Mityana)",
    head: "Omutaka Godfrey Katende Mukiibi — also Katikkiro w'Ekika, who installs every new Ndugwa",
    emituba: [
      {
        name: "Kiwanda",
        seat: "Magala, Ssekanyonyi – Ssingo",
        ennyiriri: [
          "Naluyinda — Kirinnya, Ssingo",
          "Kidda — Kikyusa, Bulemeezi",
          "Ssendyabane — Kiyonga (Ddegeya), Bulemeezi",
          "Nawolovu — Katadda, Nangabo – Kyaddondo",
          "Nakumanyanga — Kakute, Bulemeezi",
          "Ssemakula Ssaalongo — Kkotwe, Nazigo – Bugerere",
          "Semyoni Zavuga — Kaggaba, Katende – Mawokota",
          "Kibugo Zaakayo — Nnyimbwa, Bulemeezi",
          "Kaakiika — Kaggaba, Mawokota",
          "Sewaali — Ngogolo, Bulemeezi",
          "Mukiibi — Bumera, Busiro",
          "Mugambwa — Kkungu, Kyaddondo",
          "Paulo Mulindirawala — Kiwaazi, Busiro",
          "Magala Nagawonye — Mubanda, Bulemeezi",
          "Kibunga — Magala, Ssingo",
          "Nakalanguse — Butanza, Bulemeezi",
          "Kawulukusi — Kuku (Nalubabwe), Kasawo – Kyaggwe",
        ],
      },
      {
        name: "Sserutenga",
        seat: "Ttula, Nabweru – Kyaddondo",
        ennyiriri: ["Mayanja Mbwateyekuusa", "Kalyamatovu", "Buyindo", "Lulika"],
      },
      {
        name: "Mayanja Kabangala",
        seat: "Bundeke, Magala – Ssingo",
        ennyiriri: [
          "Ssewamala — Kabumbi, Nansana – Kyaddondo",
          "Siira Mwanuukuzi Lukooya — Kasiinkombe, Ssingo",
          "Kikooti — Butega, Ssingo",
          "Luwemba Ssemwogerere — Lusenke, Woobulenzi – Bulemeezi",
          "Wantambira Ssemakula Ssebaana — Naluvule, Kabulengwa – Busiro",
          "Lumonde — Kabongezo, Kimaanya–Bambula – Ssingo",
          "Kaaya Mabuliro — Mitala Maria, Mawokota",
          "Namalere — Busuubuzi, Ssingo",
          "Bitagume — Bukuya, Ssingo",
          "Nsisinkano Ssemakula — Kalangaalo, Ssingo",
          "Tekiryamunaku Ssemwogerere — Ssanga, Mukono – Kyaggwe",
        ],
      },
      {
        name: "Kigenge",
        seat: "Bulamu, Nakaseeta – Ssingo",
        ennyiriri: [
          "Kiwanda — Nabwojo, Mawokota",
          "Siiramunewamuyiisa Kubabiswa — Nakaseeta, Magala – Ssingo",
          "Kibago — Kikandwa, Kasawo – Bukoba",
          "Masuudi Mbuga Mutyaba — Bweya, Kajjansi – Busiro",
          "Kazooba — Kiti, Kyaddondo",
        ],
      },
      {
        name: "Bikande",
        seat: "Kikangula, Ssingo",
        ennyiriri: [
          "Muzaale Lukabazi — Wattuba, Ssingo",
          "Settuba — Kalule, Bulemeezi",
          "Nkoola — Makulungo, Butambala",
          "Bannyikidde — Bukoba, Kyaggwe",
          "Wakibi — Seeta, Bulemeezi",
        ],
      },
      {
        name: "Minyanya",
        seat: "Kisaasi, Kira – Kyaddondo",
        ennyiriri: ["Musuulira — Bbumbu, Ssekanyonyi – Ssingo"],
      },
      {
        name: "Kasugga",
        seat: "Bukasa, Mumyuka Wakiso – Busiro",
        ennyiriri: [
          "Kikwaku Ssalongo Sserunjogi — Busunju, Ssingo",
          "Galuwazo — Bbaale, Nnyimbwa – Bulemeezi",
          "Bakale — Sekundi, Kakiri – Busiro",
          "Mitikanya — Sebbanda, Ssingo",
          "Kakoni — Sekanyonyi, Kyaggwe",
          "Nantagya — Buwambo, Kyaddondo",
        ],
      },
      {
        name: "Kazzukulu",
        seat: "Kabaseke, Ssekanyonyi – Ssingo",
        ennyiriri: [
          "Ssekimwanyi — Kanyogoga, Magala",
          "Akuwokulya — Bwetamiza, Kibibi",
          "Musoke Lukomera — Kilokola, Kibibi",
          "Tegaliike — Lubuzi, Kawule – Buddu",
          "Khalid Bikongolo — Kanyogoga, Butambala",
        ],
      },
      {
        name: "Waggumbulizi Kiyenje",
        seat: "Bulindo, Kira – Kyaddondo",
        ennyiriri: [
          "Katoggo Kyendira — Bulindo, Kyaddondo",
          "Kalyabuguga — Nabulo, Kikunyu – Bulemeezi",
          "Ntuddebuleku — Nnamaliri, Ndese – Kyaggwe",
        ],
      },
      {
        name: "Nvubatemulya",
        seat: "Namasuba, Makindye – Kyaddondo",
        ennyiriri: ["Bakaluba", "Bisunsa", "Kalimikamwewozi"],
      },
      {
        name: "Musikaggye Nkata",
        seat: "Nansana, Mutuba I Nabweru – Busiro",
        ennyiriri: [
          "Kikambi — Kyampisi, Busiro",
          "Mayanja",
          "Kisubi Kyoto — Ggulu, Mukono",
          "Wayononye — Bukomero, Ssingo",
          "Mukiibi — Bukomero & Mukono",
          "Kubugu — Entebbe",
        ],
      },
      {
        name: "Mujumbi",
        seat: "Nansana, Busiro",
        note: "Descends through Kakumirizi Natiigo.",
        ennyiriri: [
          "Wajwala Banabakintu — Nansana, Busiro",
          "Baamundaga — Nansana, Wakiso – Busiro",
          "Kiwo Ssemutumba",
          "Mukeerwa",
          "Ssemakula Nasanayiri — Matugga (Kirwanira), Kyaddondo",
        ],
      },
      {
        name: "Luttendeka",
        seat: "Kojjo, Bulemeezi",
        note: "Descendants of Kiwe-amaaso, out of the Sserutenga line — no ennyiriri are itemised in the archive.",
        ennyiriri: [],
      },
      {
        name: "Kibugo",
        seat: "Bulamu, Bulera – Ssingo",
        note: "Separated from the Bikande mutuba.",
        ennyiriri: [
          "Kwezi — Bulamu, Ssingo",
          "Kwesembere — Birigambwa",
          "Battibwaki — Lukakaba",
        ],
      },
      {
        name: "Ssenkima",
        seat: "Mwera, Busujju",
        note: "Descends from Batulumayo Bikande.",
        ennyiriri: [
          "Mukiibi Tadeo — Lubugo, Busujju",
          "Ssemakula Gerald — Mwera, Busujju",
          "Sserunjogi Edward — Kikumbi, Ssingo",
          "Mukiibi John — Jjeza, Mawokota",
        ],
      },
      {
        name: "Muwakanya",
        seat: "Kisugula, Ggomba",
        note: "Confirmed in the archive as descendants of Mayanja Kabangala.",
        ennyiriri: [
          "Mako Mukasa — Kajumiro, Mubende – Ssingo",
          "Ibrahim Musagala — Kisugula, Ggomba",
          "Yokana Batista Kalumba — Maddu, Ggomba",
          "Katutteki Laurensio — Kiriri, Ggomba",
          "Khalid Mukiibi Musagala — Luzira, Ggomba",
          "Ali Katende — Kisigula, Ggomba",
          "Yusuf Kisenyi — Luzira, Ggomba",
          "Mako Mukasa II — Kisigula, Ggomba",
          "Zaidi Ssemakula — Luzira, Ggomba",
        ],
      },
      {
        name: "Wakibi",
        seat: "Kabaseke, Ssingo",
        note: "Confirmed in the archive as descendants of Mayanja Kabangala, after a long period under Kiwanda.",
        ennyiriri: [
          "Ssemakula Musoke — Kabaseke, Ssingo",
          "Mujjumbire Ssemakula — Bbugga, Bulemeezi",
          "Kinene Palatine — Bbaale, Waluleeta – Bulemeezi",
          "Njalampandi Masulubu — Nakikoota, Luweero – Bulemeezi",
          "Lulika Lasto — Bugerusi, Kamuli – Nakaseke",
          "Batabuuza Ssimwogerere — Kigulu, Wobulenzi – Bulemeezi",
          "Sserunjogi Lukulwase — Nakakona, Bulemeezi",
          "Ssebbunza Ayubu — Kakinzi, Bulemeezi",
          "Kabiine Isaaka — Kakinzi, Bulemeezi",
          "Mukasa Katende — Luzira, Ggomba",
        ],
      },
    ],
  },
  {
    name: "Kasoma Nnakatanza",
    seat: "Migadde, Kyaddondo (Wakiso)",
    emituba: [
      {
        name: "Bukulubwawadda",
        seat: "Vvuga, Migadde – Kyaddondo",
        ennyiriri: [
          "Nkambwe — Vvuga, Migadde – Kyaddondo",
          "Luyima — Jjinja, Kaloli – Kyaddondo",
          "Nabbowa Lugonvu — Butanza, Bulemeezi",
          "Mulinnya-Kiriba — Ttula, Kawempe – Kyaddondo",
          "Byuma Mazimwe — Nakawere, Ssingo",
        ],
      },
      {
        name: "Ssekyanda Buliba Luggi",
        seat: "Kawumu, Busiro",
        note: "One lunnyiriri (Buliba, son of Luggi) with four recorded compounds (empya) — per the late Silvesita Ssekyanda Buliba Luggi's own account, 2010.",
        ennyiriri: ["Buliba — with four empya recorded under it"],
      },
      {
        name: "Mpinga Wakkonyi",
        seat: "Jjokolera, Kyaddondo",
        ennyiriri: [
          "Lyawunnya — Jjokolera, Nangabo – Kyaddondo",
          "Kaddugala — Manya, Kyaddondo (now settled under Lyawunnya)",
          "Naddunga — Mwami, Buwambo – Kyaddondo",
          "Muganwa — Bbanda, Lugo Musale – Kyaddondo (now settled under Lyawunnya)",
          "Kategere — Jjokolera, Nangabo – Kyaddondo (split off Lyawunnya)",
          "Musula — Kasirye, Sekanyonyi – Ssingo (split off Lyawunnya)",
        ],
      },
      {
        name: "Kasujju Lubinga",
        seat: "Mwera, Busujju",
        ennyiriri: [
          "Nandere — Mweramukadde, Malangala – Busujju",
          "Bassajjakambwe — Kakindu, Malangala – Busujju",
          "Sserwanga — Mwera, Busiro",
          "Lubinga — Ttojjo, Busiro",
          "Kagolo — Nabweri, Malangala – Busujju",
          "Mulera — Kyanja, Gayaza – Kyaddondo",
          "Nantaggya — Kkiku, Gombe – Kyaddondo",
          "Kamenyamigo — Katikammuli, Busujju – Ssingo",
          "Njuki — Nakakoola, Buluuli",
        ],
      },
      {
        name: "Kabumba Luseke",
        seat: "Ngalomyambe, Kyaddondo",
        ennyiriri: [
          "Luseke Nafumbambi — Kavule, Ssabawaali Gombe – Kyaddondo",
          "Kafumbirwango — Kiyingidde, Migadde – Kyaddondo",
          "Nkaada Kkukulakwetta — Mpata Kibbujjo, Namayumba – Busiro",
          "Mubiinge — Buyoga, Kibiinge – Buddu",
          "Banadda — Kizzang'anda, Kiyonganyi – Ssingo",
        ],
      },
      {
        name: "Kawuula",
        seat: "Ttamu, Ssingo",
        note: "The Kawuula is the Kabaka's chief drummer, keeper of the Mujaguzo drum Kawulugumo.",
        ennyiriri: [
          "Lusambya — Ttamu, Ssingo (the head line, led by the Kawuula himself)",
          "Muganda-wasula — Mitimbojje, Ssingo",
          "Katagula Sekajoolo — Nakyesanja, Kyaddondo",
          "Masswa Sengatusa — Mpigi, Busujju",
          "Sergent Alipo Mulumba — Kirumba, Buddu",
          "Kivebulaya Mukiibi Petero — Kawolongojjo, Ssingo",
          "Semukaaya — Namayumba, Busiro",
        ],
      },
    ],
  },
  {
    name: "Ssebwana",
    seat: "Gganda, Busiro (Wakiso)",
    emituba: [
      {
        name: "Sseggulu",
        seat: "Butakana, Mende – Busiro",
        note: "Sseggulu forged the Naluwangula spear presented to the Kabaka at installation.",
        ennyiriri: [
          "Kkuuma — Mmende, Butakana – Busiro",
          "Mutasenya — Wakiso, Busiro",
          "Setete — Kakute, Nnakaseeta – Bulemeezi",
          "Kituzi — Sambwe, Ggombe – Kyaddondo",
          "Teerute — Galamba, Ggombe – Kyaddondo",
          "Mazuku — Bunyiri",
        ],
      },
      {
        name: "Kabombo",
        seat: "Gganda, Nsumbi – Busiro",
        ennyiriri: [
          "Basudde — Ddundu, Ssisa – Busiro",
          "Mukaneende — Kisala, Kyaggwe",
          "Serubugo — Bbanda, Mmende – Busiro",
        ],
      },
      {
        name: "Mukomba Mulyowansozi",
        seat: "Katubwe, Busiro",
        ennyiriri: [],
      },
      {
        name: "Kokko",
        seat: "Kawuna, Nakisunga – Kyaggwe",
        ennyiriri: ["Semusambwa — Wabukwa, Bugerere"],
      },
      {
        name: "Ssaanyaga",
        seat: "Kawanda, Gombe – Kyaddondo",
        ennyiriri: [
          "Alipo Ssekadde — Kalimira, Bigasa – Buddu",
          "Balamaze — Ndese, Kanaana – Kyaggwe",
        ],
      },
      {
        name: "Ssekajja (Ssekaggya)",
        seat: "Mpungamuyaga, Busiro",
        ennyiriri: ["Mugolera"],
      },
      {
        name: "Kiyimba",
        seat: "Nkakkwa, Kyaggwe",
        ennyiriri: [
          "Mututumuzi — Namulesa, Kyaggwe",
          "Takirambule — Kiyoola, Kyaggwe",
          "Ntengo Yokana — Kayindu, Bulemeezi",
          "Nkoola — Kyampisi, Bulemeezi",
        ],
      },
      {
        name: "Kkubo",
        seat: "Nabutiiti, Kyaddondo",
        ennyiriri: ["Serwadda — Nnamirembe, Nazigo – Bugerere"],
      },
      {
        name: "Kateenga-Katengeesa",
        seat: "Mugomba, Ntenjeru – Kyaggwe",
        ennyiriri: ["Efulaimu Mukasa Ssemakula — Mpuuge, Kojja – Kyaggwe"],
      },
      {
        name: "Ssenkanze",
        seat: "Kojja, Ngoggwe – Kyaggwe",
        ennyiriri: [
          "Kanamagulu — Waga, Kyaggwe",
          "Mpitanye — Kojja, Kyaggwe",
          "Kiyaaya — Kojja, Kyaggwe",
          "Sale — Busi, Koome – Kyaggwe",
        ],
      },
    ],
  },
  {
    name: "Kagolo Ssebugulu",
    seat: "Kanyike, Mawokota (Mpigi)",
    note: "The Kagolo Ssebugulu line traditionally keeps the Nnaalinnya Lubuga (the Kabaka's ritual sister).",
    emituba: [
      {
        name: "Muwuule Gonga",
        seat: "Naziri, Mawokota",
        ennyiriri: [
          "Kibuzi — Naziri, Mawokota",
          "Mabira — Kitakula, Namutamba – Ssingo",
          "Kikomaga — Naziri, Mawokota",
        ],
      },
      {
        name: "Namaleego",
        seat: "Kanyike, Mawokota",
        ennyiriri: [
          "Ngubi Kirudde — Kanyike, Mawokota",
          "Kawuka — Kanyike, Mawokota",
          "Kiwanga — Kibombo, Ggomba",
          "Kibandula–Galusanja — Kanabulemu, Buddu",
          "Kiweddemu-Kazooba — Kaweeri, Mawokota",
        ],
      },
      { name: "Kalikkumi", seat: "Kanyike, Mawokota", ennyiriri: [] },
      {
        name: "Mukiibi",
        seat: "Kaweri, Mawokota",
        ennyiriri: [
          "Mukasa Kinyira — Kaweeri, Mawokota",
          "Muwanga Kirimegga — Ggolo, Mawokota",
          "Bbulira Kannyiniliiso — Lulagala, Busujju",
          "Vvubya Ssekibaala — Mawuugulu, Busiro",
        ],
      },
      {
        name: "Ssekalongo",
        seat: "Buwere, Mawokota",
        ennyiriri: [
          "Mukiibi Njiya Kinenennyumba",
          "Mitala-ekooya — Mako, Busiro",
          "Njovuyafeeta — Gunda, Mawokota",
          "Wayita-otya — Buwanda, Mawokota",
          "Kiwanga — Kibombo, Ggomba",
          "Kabinga — Mpambire, Mawokota",
          "Kamunye — Kabira, Mawokota",
          "Kikwalo — Ggunda, Mawokota",
          "Mpomya — Mpambire, Mawokota",
        ],
      },
    ],
  },
  {
    name: "Ssettuba",
    seat: "Ddundu, Ssisa – Busiro (Wakiso)",
    note: "Ssettuba traditionally carried the ceremonial reed (olumuli) to Ssese for the shrine of Wannema.",
    emituba: [
      {
        name: "Kirimagamba",
        seat: "Ddundu, Ssisa – Busiro",
        note: "The archive records its ennyiriri as not yet organised (tezinatereezebwa).",
        ennyiriri: [],
      },
      {
        name: "Kyansimbi",
        seat: "Kabanga, Kyaggwe",
        note: "Descendants of Kyansimbi devised the royal Entenga drums.",
        ennyiriri: ["Kaluguyu — Kabanga (near Kyasa hill), Kyaggwe"],
      },
      {
        name: "Mpambo (Biswanka)",
        seat: "Maala, Ddamba – Koome, Kyaggwe",
        ennyiriri: ["Kwalo Kyosambuza"],
      },
      {
        name: "Ndogobukaba",
        seat: "Kasokoso, Kyaggwe",
        ennyiriri: [
          "Danieri Lule Kyazze — Kasokoso, Kyaggwe",
          "Womeraka — Buwoola, Kyaggwe",
          "Nawambira — Kiyoola, Buikwe – Kyaggwe",
        ],
      },
      { name: "Bijjo", seat: "Buwaya, Kasenge – Busiro", ennyiriri: [] },
      {
        name: "Kyasi Ssemawagga",
        seat: "Lukuli, Makindye – Kyaddondo",
        ennyiriri: ["Kibuzi — with the empya of Kezekia Mukiibi (Bigo, Mawanga – Ssingo) and Patuure Ssemakula (Kateera, Bukomera – Ssingo)"],
      },
      {
        name: "Mwotassubi",
        seat: "Nabuti, Mwanyanjiri – Kyaggwe",
        note: "Still being reconciled — the Ssebiiso Myamba ssiga also claims this mutuba, a link dating to the reign of Ssekabaka Mulondo.",
        ennyiriri: ["Ssamamba"],
      },
      { name: "Kazimuggulu", seat: "Nŋanjo, Busiro", ennyiriri: [] },
      {
        name: "Kibuguma",
        seat: "Katuumu, Bulemeezi",
        note: "Created out of the Kirimagamba mutuba.",
        ennyiriri: [],
      },
      { name: "Bwaddene", seat: "Kitiko, Ssisa – Busiro", ennyiriri: [] },
    ],
  },
  {
    name: "Ssebiiso Myamba",
    seat: "Nakalanda, Ndugu – Kyaggwe",
    note: "Formally recognised by Ndugwa Aligizanda Katamba Muddembuga in the reign of Ssekabaka Daudi Chwa II, out of the Kyansimbi mutuba of Ssettuba.",
    emituba: [
      {
        name: "Manu Kambazza",
        seat: "Kabanga, Gobero – Kyaggwe",
        ennyiriri: [
          "Nakatyaba — Ggobero, Kyaggwe",
          "Nasenga — Ttabiro, Kyaggwe",
          "Wampamba — Ggobero, Kyaggwe",
          "Mutyanyaggwa — Lukole, Kyaggwe",
        ],
      },
      {
        name: "Kalemba",
        seat: "Nakalanda, Kyaggwe",
        ennyiriri: [
          "Senyungule — Bukangu",
          "Kakembo — Ssangu",
          "Kinyamire — Bulungulu (a royal page in the Lubiri)",
          "Kikunyi — Kalobera",
          "Sebayitambwa — Mpigi, Mawokota",
        ],
      },
      {
        name: "Mayindwe",
        seat: "Bukule, Kyaggwe",
        ennyiriri: [
          "Musoke Semafuta",
          "Makona",
          "Wayitotya",
          "Kanŋanka",
          "Lubondo",
          "Kinyolo",
          "Serugga",
          "Nkungu",
          "Matooke",
        ],
      },
      {
        name: "Ssammamba",
        seat: "Buziranjovu, Kyaggwe",
        ennyiriri: ["Mandogge"],
      },
      {
        name: "Bandoloota",
        seat: "Mugomba, Kyaggwe",
        ennyiriri: ["Sekuwala", "Sanjasa", "Bajunga"],
      },
      {
        name: "Kirungube",
        seat: "Nankima, Kyaggwe",
        ennyiriri: [
          "Wannonda Sseruyange",
          "Kikaanziira — Namulande, Bugerere",
          "Namuyenga — Buwaali, Sseeta Nazigo – Kyaggwe",
          "Mutambulire — Nalubabwe, Nakifuma – Kyaggwe",
          "Matembe — Buyobyo, Katosi – Kyaggwe",
        ],
      },
      {
        name: "Kyansimbi",
        seat: "Lugala, Kyaggwe",
        ennyiriri: ["Serumu (the remainder fall back under the Ssettuba ssiga)"],
      },
      {
        name: "Malungu",
        seat: "Lweza, Kyaggwe",
        ennyiriri: [
          "Luweke — Lusaali, Kyaggwe",
          "Miraala — Sekiwala, Kyaggwe",
          "Singawekyo — Busoke, Kyaggwe",
        ],
      },
      {
        name: "Kakembo",
        seat: "Kasokoso, Kyaggwe",
        ennyiriri: ["Mpundo", "Bagenda"],
      },
      {
        name: "Ntumbwe",
        seat: "Buwunga, Kyaggwe",
        ennyiriri: ["Mitanda"],
      },
      { name: "Luubu", seat: "Mpunge, Kyaggwe", ennyiriri: [] },
      {
        name: "Lubavu",
        seat: "Buwaya, Kyaggwe",
        ennyiriri: ["Sendigya"],
      },
      { name: "Lulendera", seat: "Budalanda, Kyaggwe", ennyiriri: [] },
    ],
  },
  {
    name: "Nnamugwanga",
    seat: "Bubwa, Ssi-Bukunja – Kyaggwe (Ntenjeru)",
    emituba: [
      {
        name: "Goobi Sekasubi",
        seat: "Buwera, Kyaggwe",
        ennyiriri: [
          "Wasswa — Kisuuto, Kyaggwe",
          "Mukwabanga — Zziba, Kyaggwe",
          "Nnyinigutwe — Nampya, Kyaggwe",
          "Ssebanenya — Mpuku, Kyaggwe",
        ],
      },
      {
        name: "Kataate",
        seat: "Nyanama, Ssi-Bukunja – Kyaggwe",
        ennyiriri: [
          "Kiwulu — Nyanama, Ssi – Kyaggwe",
          "Namutwe — Kimera, Ssi – Kyaggwe",
        ],
      },
      {
        name: "Lubaale",
        seat: "Bubwa-Gowe, Ssi-Bukunja – Kyaggwe & Ngeribalya, Ggomba",
        ennyiriri: [
          "Ntangaala",
          "Ssekisonge (the Owessiga's own line)",
          "Lusimbo",
          "Nakazaana — Mateme, Nkokonjeru – Kyaggwe",
          "Lukaddiye",
          "Wavoomukozi",
          "Gwalimanya",
          "Kawuka — Mateme, Ssi – Kyaggwe",
          "Kawuma — Gobe",
          "Nnwana — Bbaale, Mituba III Magatto Nnyimbwa – Bulemeezi",
          "Byanguye — Malube, Mawokota",
          "Semayindi",
        ],
      },
      {
        name: "Ndege (Bigambo)",
        seat: "Kyaterekera, Kikajjo – Busiro",
        note: "These call themselves the Bigambo line, named by Mukiibi who raised Namuggwanga Sserunjogi.",
        ennyiriri: [
          "Mubinge — Kyaterekera, Butambala",
          "Muyima — Kawumba, Mawokota",
          "Mugala — Bunyenye, Butambala",
          "Mukonzi — Kyengeza, Butambala",
        ],
      },
      {
        name: "Ntambi Ssemakula",
        seat: "Katoogo, Kyaggwe",
        ennyiriri: ["Kasongo", "Musoke Lubuto", "Musoke Tubuuze"],
      },
    ],
  },
  {
    name: "Ssenkusu",
    seat: "Wasozi, Busiro (Wakiso)",
    emituba: [
      {
        name: "Ssekikongo",
        seat: "Bukongo, Busiro",
        ennyiriri: ["Kiwuwa", "Duttu", "Nkwanjule", "Mugenge"],
      },
      {
        name: "Kagembe",
        seat: "Bunamwaya, Busiro",
        ennyiriri: ["Kisaawe", "Walukoko", "Mukoome", "Walubuzi", "Semuwemba"],
      },
      {
        name: "Kulwazi",
        seat: "Mukaabira, Busiro",
        ennyiriri: [
          "Ssezibwa",
          "Baddugala",
          "Nakyemalira",
          "Kikadde",
          "Mukka",
          "Sulekemba",
          "Ssekabira — Munkabira, Busiro",
          "Kalasano Ssembajjwe — Genda, Kyaggwe",
        ],
      },
    ],
  },
  {
    name: "Kakulukuku",
    seat: "Kabaale, Masuulita – Busiro (Wakiso)",
    note: "Kakulukuku was the very first Katikkiro of Buganda, serving Kabaka Kintu at Nnono, Busiro. All emituba descend through his one son Mujumbula.",
    emituba: [
      { name: "Mujumbula", seat: "Vugamira, Ssingo", ennyiriri: [] },
      { name: "Bazaalirwa", seat: "Kabaale, Busiro", ennyiriri: [] },
      { name: "Baluvuuma", seat: "Kalangaalo, Ssingo", ennyiriri: [] },
    ],
  },
  {
    name: "Kyabasinga Nnyombe",
    seat: "Nnakirama, Busiro (Wakiso)",
    note: "The Mazinga line of the Mukka mutuba supplies the Omumbowa Ssenkoole, keeper of the royal fire.",
    emituba: [
      {
        name: "Kawuma Zitemwa Muzito",
        seat: "Bulyanteete, Kyaggwe",
        note: "Kawuma was entrusted by his grandfather Mukiibi Ndugwa with the shrine of Lubaale Katonda at Butonda.",
        ennyiriri: [],
      },
      {
        name: "Mukka",
        seat: "Kasenge, Nsangi – Busiro",
        ennyiriri: [
          "Byempomwenge — Bigo, Busiro",
          "Lusambya — Gayaza, Kyaddondo",
          "Mwatika",
          "Nvubu",
          "Mazinga — Nnakirama, Busiro (the line of the Omumbowa Ssenkoole)",
        ],
      },
      {
        name: "Nawona",
        seat: "Nanvubya, Busiro",
        ennyiriri: [
          "Kinene Terugwa — Sekiwunga, Busiro",
          "Katoggo — Kakira, Kasawo – Kyaggwe",
        ],
      },
      {
        name: "Bibundigiri",
        seat: "Buwaate, Kira – Kyaddondo",
        ennyiriri: [],
      },
      { name: "Nakyewa", seat: "Bukomero, Ssingo", ennyiriri: [] },
      {
        name: "Kigongo",
        seat: "Birongo, Lwabenge – Buddu",
        ennyiriri: [],
      },
      { name: "Wasswa", seat: "Birungu, Kateera – Ssingo", ennyiriri: [] },
      {
        name: "Magiriba",
        seat: "Nakasozi, Buddo – Busiro",
        note: "The children of Magiriba string the Kabaka's drum called Katengejjo.",
        ennyiriri: [],
      },
      {
        name: "Kirembero",
        seat: "Buwaate, Kyaddondo",
        note: "The Kirembero household beats the royal drums called 'Ssaagala kwetikka'.",
        ennyiriri: [],
      },
    ],
  },
  {
    name: "Kaweekwa",
    seat: "Ggangu, Ssaabagabo Makindye – Kyaddondo (Wakiso)",
    emituba: [
      {
        name: "Bbanvu",
        seat: "Kiwenda, Busukuma – Kyaddondo",
        ennyiriri: ["Matembe — Kiwenda, Busukuma – Kyaddondo"],
      },
      {
        name: "Walonze",
        seat: "Ggombe, Mumyuka Wakiso – Busiro",
        note: "Its ennyiriri spring from Walonze's own sons.",
        ennyiriri: [
          "Nantinda",
          "Kiwotoka",
          "Navuma",
          "Kaddu",
          "Mivule",
          "Ziraye",
          "Mayengo",
          "Waggumbulizi",
          "Kasajja",
        ],
      },
      {
        name: "Kagolo Kafumbanswa",
        seat: "Bbongole, Mawokota",
        ennyiriri: [],
      },
      {
        name: "Wakisonko",
        seat: "Bbowa, Bulemeezi",
        ennyiriri: ["Lukoma Wamala — Bbowa, Bulemeezi"],
      },
      {
        name: "Kiriiti",
        seat: "Bbajjo, Butambala",
        ennyiriri: [
          "Sulemani Wasuukirawa — Semukombe, Mawokota",
          "Kezekia Kibuuka — Bbulansuku, Mawokota",
          "Nkonge — Kibugga, Butambala",
          "Nkolo — Buwere, Butambala",
        ],
      },
      {
        name: "Kabikabule Kkuku",
        seat: "Ggombe, Busiro",
        note: "Separated out of the Walonze mutuba.",
        ennyiriri: [
          "Kiyira — Nsangi, Busiro",
          "Bugeza — Ggombe, Busiro",
          "Wakiku — Ggombe, Busiro",
          "Buyego — Kansiri, Bulemeezi",
        ],
      },
    ],
  },
  {
    name: "Ssekiwala",
    seat: "Kkangave, Bulemeezi (Nakaseke)",
    emituba: [
      {
        name: "Ssekonnyo",
        seat: "Kangavve, Bulemeezi",
        ennyiriri: [
          "Paulo Vunna — Kakonde, Kijaguzo – Bulemeezi",
          "Felix Lule Ssalongo — Luvunvu (Kito), Magala – Ssingo",
        ],
      },
      {
        name: "Kakyafamba",
        ennyiriri: ["Kikonyogo", "Sserukagguba", "Bugonzi"],
      },
      { name: "Sseruyange", seat: "Kangavve, Bulemeezi", ennyiriri: [] },
      {
        name: "Byangangemuggo Mbowa",
        seat: "Kangavve, Bulemeezi",
        ennyiriri: [],
      },
      { name: "Mbyalwa", seat: "Kangavve, Bulemeezi", ennyiriri: [] },
      {
        name: "Ssekajugo",
        seat: "Bulindo, Kira – Kyaddondo",
        ennyiriri: [
          "Nuwa Kasattiro — Bulindo, Kira – Kyaddondo",
          "Isaaya Buliggwanga — Bbulabakulu, Wakiso – Kyaddondo",
          "Suleiman Waludde — Bulindo, Kira – Kyaddondo",
          "Kijjo Kagodo — Kangavve, Makulubita",
          "Semei Ssemakula — Kangavve, Bulemeezi",
        ],
      },
      {
        name: "Kyekonga",
        seat: "Kangavve, Bulemeezi",
        note: "Some members of the Ssebwana ssiga maintain this is their lunnyiriri — a claim litigated in 1964–65.",
        ennyiriri: [],
      },
      { name: "Kagomba", seat: "Bugomba, Bulemeezi", ennyiriri: [] },
    ],
  },
  {
    name: "Kigenyi Maswanswa",
    seat: "Kololo, Mawokota (Mpigi)",
    emituba: [
      {
        name: "Lukooye",
        seat: "Butenga, Kira – Kyaddondo",
        ennyiriri: [
          "Kazzukulu — Kalere, Kijjugumbya Zirobwe – Bulemeezi",
          "Mujabi Bawala-enzo — Lugasa, Kyaggwe",
          "Sseddume Kabaawo",
        ],
      },
      {
        name: "Kolokolo",
        seat: "Kololo, Mawokota (& Gayaza, Busiro)",
        ennyiriri: [
          "Mujante — Kololo, Mawokota",
          "Ssekiranga — Gayaza, Mumyuka Wakiso – Busiro",
          "Nabbambula — Katebo, Mawokota",
          "Byang'anga — Namakomo, Bukoba – Kyaggwe",
          "Kinyola — Namulonge, Kyaddondo",
        ],
      },
      {
        name: "Sserubaale",
        seat: "Bibbo, Kyaggwe",
        ennyiriri: [
          "Ssekibuuza — Ggwanika, Kyaggwe",
          "Kawungeezi — Kikondo, Kyaggwe",
          "Mwenge — Busala, Bukunja – Kyaggwe",
          "Kakyu — Kkoome, Kyaggwe",
        ],
      },
      {
        name: "Kiyemba",
        seat: "Buyira, Nkokonjeru – Kyaggwe (of Buvuma)",
        ennyiriri: [],
      },
      {
        name: "Kirenzi",
        seat: "Kyanja, Bukunja – Kyaggwe",
        note: "Separated out of the Sserubaale mutuba.",
        ennyiriri: [],
      },
    ],
  },
  {
    name: "Ntambi",
    seat: "Ggaba–Lukubo, Kyaggwe (Mukono)",
    note: "Recognised as a ssiga by Ndugwa Aligizanda Muddembuga in the 1950s and entrusted to Omukungu Semione Njuki.",
    emituba: [
      {
        name: "Gwangiriza",
        seat: "Mbiru, Kyaggwe",
        ennyiriri: [
          "Makayi Lubanga — Nsambajja, Ngoggwe – Kyaggwe",
          "Matabi Takalirya — Nkulagirire, Nakifuma – Kyaggwe",
          "Bukamba — Mayugwe, Ngoggwe – Kyaggwe",
          "Bakutenda — Kanikwa, Ngoggwe – Kyaggwe",
          "Namulalu — Kirukwe, Ngoggwe – Kyaggwe",
        ],
      },
      { name: "Mmandwa", seat: "Nnakasuku, Kyaggwe", ennyiriri: [] },
      {
        name: "Lugali",
        seat: "Kito, Kyaggwe",
        ennyiriri: ["Lusebeenju"],
      },
      {
        name: "Ttega Ssebintu Kinogga",
        seat: "Nakisunga, Kyaggwe",
        ennyiriri: ["Lunywantere — Ttaba", "Basiibye", "Nkolo"],
      },
      { name: "Lugege", seat: "Kimera, Kyaggwe", ennyiriri: [] },
      {
        name: "Nnabbambira",
        seat: "Kyabaana, Kyaggwe",
        ennyiriri: ["Kigyagyagali", "Kanyama"],
      },
      { name: "Nnamwavu", seat: "Bulunda, Kyaggwe", ennyiriri: [] },
      {
        name: "Ntenkulu",
        seat: "Lugoba, Kyaggwe",
        ennyiriri: ["Wambwa"],
      },
      {
        name: "Kamyu",
        seat: "Lugoba, Kyaggwe",
        ennyiriri: ["Talutambudde"],
      },
      { name: "Ddunta", seat: "Kitto, Kyaggwe", ennyiriri: [] },
      {
        name: "Ggwangaza",
        note: "Appears in the archive with its ennyiriri only — it is not on the ssiga's main mutuba roll.",
        ennyiriri: ["Galuwazo", "Bakitenda", "Makayu", "Mugolooba", "Ntesibe", "Mbula"],
      },
    ],
  },
  {
    name: "Ggyoggye",
    seat: "Nsonga, Nakisunga – Kyaggwe (Ntenjeru)",
    emituba: [
      {
        name: "Misanvu",
        seat: "Nsonga, Nakisunga – Kyaggwe",
        ennyiriri: ["Ssozi — Lugala, Kyaggwe", "Lwana — Kawolo, Kyaggwe"],
      },
      {
        name: "Balwananga Kezekia",
        seat: "Kibanga, Bunankanda – Kyaggwe",
        ennyiriri: [
          "Kayonda Eriya — Namasuba, Kyaddondo",
          "Wasswa Mukiibi — Kibanga, Kyaggwe",
          "Ssemakula Dison — Kibanga, Kyaggwe",
        ],
      },
      {
        name: "Sserunjogi Ddiirolikung'anya",
        seat: "Buligwe, Bulemeezi",
        ennyiriri: [
          "Sserunjogi — Buligwe, Bulemeezi",
          "Magala — Buligwe, Bulemeezi",
          "Ddamulira Dan — Buligwe, Bulemeezi",
          "Ddiiro — Buligwe, Bulemeezi",
          "Katamba — Buligwe, Bulemeezi",
          "Mutyaba — Buligwe, Bulemeezi",
        ],
      },
      {
        name: "Nakalawo Lugwanawala",
        seat: "Kitenda, Sayi Nakisunga – Kyaggwe",
        ennyiriri: [
          "Alikaadi Sserunjogi — Kyetume, Kyaggwe",
          "Ssemakula Yozefu — Sayi, Kyaggwe",
        ],
      },
    ],
  },
  {
    name: "Ggere",
    seat: "Malanga, Ssese (Kalangala)",
    head: "Owek. Joseph Mulwanyammuli Ssemwogerere, Katikkiro of Buganda 1994–2005, has been the Owessiga since 2004",
    note: "The mbuga at Malanga also keeps three royal household lines (endyo): Kaganga-Mwegereko, Musaanya-Muwummuza and Mulwanyammuli-Kirijja.",
    emituba: [
      { name: "Ssekajwanga", seat: "Lusozi, Ssese", ennyiriri: [] },
      { name: "Semuliro", seat: "Mugoye, Ssese", ennyiriri: [] },
      {
        name: "Mulwa",
        seat: "Kazi (Malanga), Ssese",
        ennyiriri: [
          "Kayirigi — Mulole, Ssese",
          "Byakusaaga",
          "Zigula-omuddu — Bukakkata, Buddu",
          "Nankasa — Kagulube, Ssese",
        ],
      },
      {
        name: "Semutumba",
        seat: "Bwamba, Luwungulu – Ssese",
        note: "Semutumba was a son of Ssebwana X Musaanya, of the mbuga household.",
        ennyiriri: [],
      },
      { name: "Muyiisa", seat: "Lusozi, Ssese", ennyiriri: [] },
      { name: "Semuziba", seat: "Kimbugu, Ssese", ennyiriri: [] },
      {
        name: "Mukwaya",
        seat: "Muvule, Ssese",
        ennyiriri: [
          "Wali-ejjemu — Muvule, Malanga",
          "Kyesaggira — Bussi, Busiro",
          "Mwasabita — Bukakkata, Buddu",
        ],
      },
    ],
  },
  {
    name: "Kabala",
    seat: "Buduggala, Kyaggwe (Ntenjeru)",
    note: "The most recently recognised ssiga — separated from Ssebwana by Ndugwa Grace Ssemakula; the first installation of an Owessiga Kabala took place on 28 April 2012 at Buduggala.",
    emituba: [
      {
        name: "Kibirango",
        seat: "Namusa, Kyaggwe",
        ennyiriri: [
          "Mutaasa Kanyanjwa — Buddugala, Kyaggwe",
          "Ssimba-omuggo — Bbira, Busiro",
          "Mugenyi-asooka — Bunyagira, Kyaggwe",
        ],
      },
      {
        name: "Ssebayigga",
        seat: "Bakijjulula, Bulemeezi",
        ennyiriri: [
          "Katambaazi — Mmonde, Bulemeezi",
          "Baligidde Basaalidde — Bbowa, Bulemeezi",
          "Ssekabira",
          "Balugwanyiza",
        ],
      },
      {
        name: "Nnyagi",
        seat: "Nakivamba, Bugiri",
        ennyiriri: ["Mukalu", "Mukiibi", "Ganyodde"],
      },
      {
        name: "Kibagulo",
        seat: "Zziba, Buwaya Ssisa – Busiro",
        ennyiriri: ["Kaweke", "Kibazo", "Lubanga"],
      },
      {
        name: "Mugule",
        seat: "Wabikokooma, Naggalama – Kyaggwe",
        ennyiriri: [
          "Kigemuzi — Naggalama, Kyaggwe",
          "Waludde Yafesi Ntulume — Kakakala, Naggalama – Kyaggwe",
          "Biswanka — Vule, Nkokonjeru – Kyaggwe",
          "Kisasa — Nddwaddemutwe, Kayunga – Kyaggwe",
          "Kitudde",
          "Namujjunga",
        ],
      },
      {
        name: "Mugubali",
        seat: "Kaggaba, Mawokota",
        ennyiriri: [
          "Kirokwa — Kaggaba, Mawokota",
          "Maswaswa — Bukusu, Bulemeezi",
          "Nkumbi — Luwuube, Bulemeezi",
          "Zziribasanga — Najjembe, Kyaggwe",
        ],
      },
      {
        name: "Mbowa-bulezi",
        seat: "Makenke, Kyaddondo",
        ennyiriri: ["Kitunzi", "Ngabo-ezaaya", "Ngabompya", "Makangisa"],
      },
    ],
  },
];

// ── The 6 Emituba Emirangira (royal sub-lineages of the Akasolya) ────────────
//
// These carry the blood of Ssimwogerere Mulangwa – Ndugwa II, and only they
// may produce a Ndugwa (whoever is elected sits as head of the Kaakikka
// Mbegera mutuba at the Mbuga, Katende/Mabuye). Kabaka-level recognition,
// per the archive (pp. 57, 88–94, 139).

export const EMITUBA_EMIRANGIRA: Mutuba[] = [
  {
    name: "Kaakikka Mbegera",
    seat: "Katende (Mabuye), Mawokota",
    note: "The mutuba of the sitting Ndugwa — it carries the whole descent of Muleera Jjooga II, Ndugwa IX. Its former 'Kasana' renaming was reversed by the clan council.",
    ennyiriri: [
      "Kaakikka Mbegera — Kaggaba, Mawokota",
      "Kinenenyumba — Kapeeka, Busiro",
      "Luttamaguzi — Kaggaba, Mawokota",
      "Kirinnyamayega — Nakyesanja, Busiro",
      "Bijja — Magadda, Namataba – Kyaggwe",
      "Ssewabbi — Mabuye, Mawokota",
      "Wakyasi Musowooko — Kiteredde, Busiro",
      "Naluswa — Bukalasa, Bulemeezi",
      "Kiwana — Senene, Mawokota",
      "Sekaggo — Mabuye, Mawokota",
      "Ssezzigo — Mabuye, Mawokota",
      "Kigobero — Baamunaanika, Bulemeezi",
      "Muwuluzi-Katanyoleka — Kaggaba, Mawokota",
      "Kyeza — Serinnya, Busiro",
      "Nkedi-Nkole-Sembuzi — Kakuba, Kyaggwe",
      "Biboyere-Jjembelyambwa — Bbika, Busiro",
      "Ddanze-Ttukke — Bbuye, Bulemeezi",
      "Mitala Musajjawaza — Buwere, Mawokota",
      "Mbaggo — Kabumba, Bulemeezi",
      "Bajunga — Temanekali, Kasokolindo Bukomero – Ssingo",
      "Dauda Mireera — Kaggaba, Mawokota (out of Bijja–Kirinnyamayega)",
      "Kattwanga — Nnama, Nakifuma – Kyaggwe (out of Bijja–Kirinnyamayega)",
      "Kyekango Kisawuzi — Nsangi, Mawokota (out of Muwuluzi-Katanyoleka)",
      "Kigaanira — Kammengo, Mawokota (out of Malunda e Nkonya)",
      "Waludde — Kasaayi, Kyaggwe",
      "Mutyaba Munywanyi — Mpugwe, Buddu",
      "Kasooli — Ttinkalu, Kyaddondo",
    ],
  },
  {
    name: "Mukungu",
    seat: "Kaaliro (Villa Maria), Kalungu – Buddu",
    note: "The blood of Mukungu, eldest son of Tebuseeke, Ndugwa VI. Recognised at the request of Ssekabaka Daudi Chwa II, whose great-grandmother Majolo of this line is buried at Kaaliro.",
    ennyiriri: [
      "Muyise — Namasumbi, Bukoba – Kyaggwe",
      "Musindikwa — Kaabakedi, Bulemeezi",
      "Kkukulakwetta — Mabuye, Kirigente – Mawokota",
      "Nkaaga — Kaaliro, Villa Maria – Buddu",
      "Mwasanje — Kyamukama, Kiwangala – Buddu",
      "Kiwagu — Buyana, Ggomba",
      "Kyekulidde — Kimwanyi, Gayaza – Kyaddondo",
      "Mangaliba — Nabusanke, Mawokota",
      "Lusiisira — Kasanŋombe, Masuulita – Bulemeezi",
      "Kinaayera — Ttinkalu, Ssingo",
      "Nkobakasswaguzi — Gganda, Wakiso – Busiro",
      "Mukasa Maanyigeeka — Butenga, Kalungu – Buddu",
      "Bamutalira — Kiriri, Ggomba",
      "Nkoolazibike — Ssekamuli, Baamunaanika – Bulemeezi",
    ],
  },
  {
    name: "Nnalungu",
    seat: "Ssumba, Ssabagabo Nsangi – Busiro",
    note: "Carries the descent of Katambaazi, Ndugwa VIII. The Nalungu traditionally played the royal board game (omweeso) with the Kabaka.",
    ennyiriri: [
      "Malunda — Nkonya, Busiro",
      "Kibunga — Namagala, Bulemeezi",
      "Kataaleke — Mizinda, Busiro",
      "Matia Kalinda Butanziba — Bulyamagunju",
      "Sserubuzi-Jjooga — Kirembwe, Bulemeezi",
      "Bisobye — Ggambwa, Ssingo",
      "Batulumayo Kipanda — Nkoowe, Busiro",
      "Ntayiro — Buzungu, Busiro",
      "Ntambaazi — Kiwugu, Kyaggwe",
      "Musamya — Ssekiwunga, Mawokota",
      "Makaanaga — Sekiwunga, Katende – Mawokota",
      "Ssempiri — Nkonya, Busiro",
      "Mulyanimire Kezekia — Ddegeya, Bulemeezi",
      "Yowana Tabula — Mukabira, Gayaza – Kyaddondo",
    ],
  },
  {
    name: "Kalyabukejje",
    seat: "Kingo / Mmanzi, Buddu",
    note: "Split off the Kaakikka Mbegera mutuba.",
    ennyiriri: [
      "Ddamulira Kikwangire — Mmanzi, Buwunga – Buddu",
      "Ssebwana — Kulambiro, Kira – Kyaddondo & Kanywa, Buddu",
      "Naddamaga — Lusango, Kalungu – Buddu",
      "Kakinda — Kinyerere, Kako – Buddu",
      "Munywanyi — Lwanda, Mpugwe – Buddu",
    ],
  },
  {
    name: "Ssebiranda",
    seat: "Kkunywa, Busimbi – Ssingo",
    note: "The blood of Ssempappe, a son of Muleera Jjooga II – Ndugwa IX; split off the Kaakikka Mbegera mutuba.",
    ennyiriri: [
      "Lusaalidde — Kazinga, Busiro",
      "Lujuuka — Kikajjo, Busiro",
      "Wamala — Nfuufu, Ssingo",
      "Sserumpanise — Kizingabuliri, Ssingo",
    ],
  },
  {
    name: "Nnalukadde",
    seat: "Bukeerere, Kyaggwe",
    note: "Split off the Nnalungu mutuba; recognised in the reign of Ssaabasajja Kabaka Ronald Muwenda Mutebi II.",
    ennyiriri: [
      "Bulikyalo — Nakagere, Kyaggwe",
      "Luvuuma — Nakagere, Kyaggwe",
      "Nyunge — Kasaayi, Kyaggwe",
      "Lugendenjala — Nakagere, Kyaggwe",
      "Kireetenjala — Katoogo, Kyaggwe",
      "Sekasula — Nakagere, Kyaggwe",
    ],
  },
];
