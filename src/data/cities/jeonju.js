// 전주 콘텐츠. 구조는 seoul.js 와 동일하다 — 설명은 그쪽 머리말을 참고.
//
// 조선 왕조(전주 이씨)의 본향이자 한옥·한지·판소리의 도시. 한옥마을 권역 다섯 곳은
// 걸어서 잇고, 덕진공원과 완주 아원고택은 차량으로 따로 들른다. 운영 정보는
// 2026-10-24 기준으로 확인한 값이다. 사진은 한국관광공사 포토코리아(한국관광콘텐츠랩)
// 공공누리 제1유형이다. 한국전통문화전당은 건물 사진 대신 한지 자체(포토코리아 '한지공예')를,
// 아원고택은 같은 마을인 오성한옥마을 사진을 쓴다 — 다른 시설 건물을 체험 장소처럼 보이게
// 하지 않으려는 것이고, imageAlt 는 사진에 실제로 찍힌 것을 적는다.
//
// 전주는 한옥마을의 차량 규칙이 핵심이다. 전주시 공식 안내는 15·25인승까지 '관광버스'로
// 보고 기린대로변 관광버스 승하차장을 쓰도록 권고하므로, 밴도 마을 안쪽 문앞 하차를
// 계획하지 않는다. 대형버스 대기 주차장은 공식 안내가 없어 사전 확인 대상이고,
// 한국전통문화전당 지하주차장은 승용차 전용(높이 2.3m), 아원고택은 45인승을 권하지 않는다.

const CHECKED = '2026-10-24'

export const jeonju = {
  slug: 'jeonju',
  group: 'more',
  ko: {
    name: '전주',
    title: '전주 프리미엄 의전 투어 | 머스트고',
    description:
      '글로벌 VIP를 위한 전주 관광지 안내. 한옥마을·경기전·한지 체험의 운영 정보와 차량 접근 조건을 정리했습니다.',
    lead: '조선 왕조를 연 전주 이씨의 본향입니다. 700여 채 한옥이 모인 한옥마을 안에 태조의 어진을 모신 경기전과 1914년의 전동성당이 마주 서 있고, 한지와 판소리 같은 살아 있는 전통이 걸어서 닿는 거리에 있습니다. 한국의 전통문화를 하루 안에 밀도 있게 보여드리기 좋은 도시입니다.',
  },
  en: {
    name: 'Jeonju',
    title: 'Jeonju Private VIP Tours | Mustgo',
    description:
      'Jeonju attractions for global VIP visitors — opening hours, admission, coach access and private tour planning notes.',
    lead: 'The ancestral seat of the family that founded the Joseon dynasty. Inside a hanok village of some 700 traditional houses, the shrine holding the founding king’s portrait faces a cathedral completed in 1914, and living crafts such as hanji paper and pansori are a short walk away. Few Korean cities show their traditional culture as densely in a single day.',
  },
}

export const jeonjuAttractions = [
  {
    slug: 'hanok-village',
    city: 'jeonju',
    photo: '/photos/attractions/jeonju_hanok.jpg',
    photoCredit: 'ⓒ한국관광공사 포토코리아-디엔에이스튜디오',
    photoLicense: '공공누리 제1유형',
    checkedOn: CHECKED,
    ko: {
      name: '전주한옥마을 · 오목대',
      tagline: '700여 채 한옥 지붕이 물결처럼 이어지는 도심 한옥 군락',
      title: '전주한옥마을·오목대 프라이빗 투어 | 머스트고',
      description:
        '700여 채 한옥이 모인 전주한옥마을과 지붕 전망 포인트 오목대. 관광버스 승하차 규칙과 일정 설계 포인트를 정리했습니다.',
      imageAlt: '전주 오목대',
      body: [
        '전주한옥마을은 한옥 700여 채가 도심 한가운데 모여 있는 곳입니다. 조선 왕조를 연 전주 이씨의 본향이라, 전주 일정은 대개 이곳에서 "왕조가 시작된 도시"라는 이야기로 문을 엽니다. 골목마다 기와지붕과 담장이 이어져, 걷는 것만으로 도시의 성격이 전해집니다.',
        '오목대는 태조 이성계가 승전 연회를 열었던 언덕입니다. 여기에 오르면 한옥 지붕이 물결처럼 겹쳐 내려다보여, 대표단 기념사진을 남기는 자리로 가장 많이 씁니다. 마을과 오목대 모두 상시 개방이고 입장료가 없습니다.',
        '차량 규칙이 이 일정의 기준이 됩니다. 전주시는 15인승·25인승까지 관광버스로 보고 기린대로변 관광버스 승하차장에서 내리도록 안내합니다. 그래서 밴이라도 마을 안쪽 문앞 하차는 계획하지 않고, 기린대로에서 내려 걸어서 둘러봅니다. 주말에는 마을 입구 구간이 30분 이상 정체된다는 보도가 있어, 의전 일정은 평일 오전 이른 시간을 권합니다.',
      ],
      facts: [
        ['운영시간', '상시 개방'],
        ['입장료', '무료'],
        ['권장 체류 시간', '1시간 ~ 1시간 30분'],
        ['차량 접근 — 대형버스', '기린대로변 관광버스 승하차장 하차 후 도보 · 대기 주차장 사전 확인'],
        ['차량 접근 — 밴', '15인승도 같은 승하차장 이용 · 마을 안쪽 진입 계획 없음'],
      ],
      planning: [
        '평일 오전 이른 시간에 방문해 인파와 주말 정체를 피합니다.',
        '오목대를 첫 순서로 잡아 한옥 지붕을 배경으로 대표단 기념사진을 먼저 남깁니다.',
        '밴도 기린대로에서 승하차하므로 걷는 동선을 기준으로 시간을 잡고, 편한 신발을 사전에 안내드립니다.',
        '경기전·전동성당이 도보로 이어져 한 번의 하차로 반나절 일정이 완성됩니다.',
      ],
      cta: '이 일정으로 맞춤 견적 요청하기',
    },
    en: {
      name: 'Jeonju Hanok Village & Omokdae',
      tagline: 'Some 700 traditional houses beneath a sea of tiled roofs',
      title: 'Jeonju Hanok Village & Omokdae',
      description:
        'A city-centre village of some 700 hanok and the Omokdae viewpoint above it. Coach set-down rules and private tour planning notes.',
      imageAlt: 'Omokdae in Jeonju',
      body: [
        'Jeonju Hanok Village gathers some 700 traditional houses in the middle of the city. This is the ancestral home of the Jeonju Yi clan, who founded the Joseon dynasty, so a Jeonju itinerary usually opens here with the story of the city where a dynasty began. Tiled roofs and stone walls run through every lane, and simply walking them says what kind of place this is.',
        'Omokdae is the hill where Yi Seong-gye, the future founding king, held a banquet to celebrate a victory. From the top, the roofs of the village overlap like waves below, which makes it the usual place for a delegation photograph. The village and Omokdae are both open at all times and free.',
        'The vehicle rule comes first. The city counts 15- and 25-seat vehicles as tour buses too, and asks that their passengers set down at the tour-bus bay on Girin-daero. Even with a van, then, we do not plan door-to-door drops inside the village; the party steps out on Girin-daero and walks. Weekend traffic at the village entrance has been reported to back up for half an hour or more, so for a protocol itinerary we recommend an early weekday morning.',
      ],
      facts: [
        ['Opening hours', 'Always open'],
        ['Admission', 'Free'],
        ['Suggested time', '1 – 1.5 hours'],
        ['Vehicle access — coach', 'Tour-bus bay on Girin-daero, then on foot · coach waiting area to be confirmed'],
        ['Vehicle access — van', 'Same bay for 15-seaters · no driving into the village'],
      ],
      planning: [
        'We visit early on a weekday morning to avoid the crowds and the weekend traffic.',
        'Omokdae goes first, so the delegation photograph is taken against the rooftops before anything else.',
        'Vans also set down on Girin-daero, so timings are planned on foot and we advise comfortable shoes in advance.',
        'Gyeonggijeon and Jeondong Cathedral follow on foot, making a full half day from a single set-down.',
      ],
      cta: 'Request a custom quote for this itinerary',
    },
  },
  {
    slug: 'gyeonggijeon',
    city: 'jeonju',
    photo: '/photos/attractions/jeonju_gyeonggijeon.jpg',
    photoCredit: 'ⓒ한국관광공사 포토코리아-디엔에이스튜디오',
    photoLicense: '공공누리 제1유형',
    checkedOn: CHECKED,
    ko: {
      name: '경기전 · 어진박물관',
      tagline: '조선을 연 태조의 초상을 모신 사당, 왕조 이야기의 출발점',
      title: '경기전·어진박물관 프라이빗 투어 | 머스트고',
      description:
        '태조 이성계의 어진을 모신 경기전과 어진박물관. 계절별 관람시간, 단체 요금, 영어 해설과 공사 일정을 정리했습니다.',
      imageAlt: '전주 경기전',
      body: [
        '경기전은 조선을 연 태조 이성계의 어진(국보)을 모신 사당입니다. 500년 왕조를 세운 사람의 초상이 그 왕조의 본향에 모셔져 있다는 점이 외국 손님께 가장 분명하게 전달됩니다. 경내에는 대나무숲과, 조선왕조실록을 보관하던 전주사고가 함께 남아 있습니다.',
        '어진박물관은 경기전 입장권으로 함께 관람합니다. 왕의 초상화를 어떻게 그리고 지켜왔는지를 이어서 설명할 수 있어, 사당과 박물관을 한 흐름으로 묶습니다. 전주시가 매일 11시와 14시에 영어 해설을 운영하고, 해외 단체 10인 이상은 2개월 전부터 1주일 전까지 해설을 예약할 수 있습니다.',
        '전주시는 2026년 3월 정전 전통 단청 복원 공사에 착수해 연말까지 마무리할 방침입니다. 공사 기간에 정전을 어디까지 볼 수 있는지는 방문 시점에 확인해 미리 안내드립니다. 자체 주차장이 없어 대형버스와 밴 모두 기린대로에서 하차해 걸어서 들어갑니다.',
      ],
      facts: [
        ['운영시간', '11~2월 09:00~18:00 · 3~5월·9~10월 09:00~19:00 · 6~8월 09:00~20:00'],
        ['입장료', '성인 3,000원 (20인 이상 단체 1인 500원 할인 · 어진박물관 포함)'],
        ['권장 관람 시간', '약 1시간'],
        ['차량 접근 — 대형버스', '자체 주차장 없음 · 기린대로 승하차 후 도보'],
        ['차량 접근 — 밴', '한옥마을과 같은 기린대로 승하차장'],
      ],
      planning: [
        '영어 해설은 매일 11시·14시입니다 — 해외 단체 10인 이상은 2개월 전부터 1주일 전까지 예약합니다.',
        '정전 단청 공사가 2026년 말 완료 예정이라, 그 전 방문이면 정전 관람 범위를 미리 확인해 알려드립니다.',
        '개장 직후 인파가 몰리기 전에 들어가 해설을 듣는 순서를 권합니다.',
        '맞은편 전동성당과 묶으면 유교 왕조의 사당과 가톨릭 성당을 한 거리에서 대비해 보실 수 있습니다.',
      ],
      cta: '이 일정으로 맞춤 견적 요청하기',
    },
    en: {
      name: 'Gyeonggijeon Shrine & Royal Portrait Museum',
      tagline: 'The shrine to the founder of Joseon, where the dynasty’s story begins',
      title: 'Gyeonggijeon Shrine & Royal Portrait Museum',
      description:
        'The shrine holding the portrait of Joseon’s founding king. Seasonal hours, group rates, English tours and restoration works.',
      imageAlt: 'Gyeonggijeon Shrine in Jeonju',
      body: [
        'Gyeonggijeon enshrines the royal portrait of Taejo, Yi Seong-gye, who founded the Joseon dynasty; the portrait is a designated National Treasure. For international guests the point is simple and clear: the founder of a dynasty that lasted five centuries is honoured in his family’s home city. A bamboo grove stands within the grounds, along with the Jeonju archive that once held the Annals of the Joseon Dynasty.',
        'The Royal Portrait Museum is included in the shrine ticket. It explains how the kings’ portraits were painted and preserved, so the shrine and the museum make one continuous visit. The city runs English-language tours daily at 11:00 and 14:00, and overseas groups of ten or more can book a guided tour between two months and one week ahead.',
        'In March 2026 the city began restoring the traditional painted decoration of the main hall, aiming to finish by the end of the year. How much of the main hall can be seen during the works is something we confirm close to the date and pass on in advance. There is no on-site parking, so coaches and vans alike set down on Girin-daero and the party walks in.',
      ],
      facts: [
        ['Opening hours', 'Nov–Feb 09:00–18:00 · Mar–May & Sep–Oct 09:00–19:00 · Jun–Aug 09:00–20:00'],
        ['Admission', 'KRW 3,000 adult (KRW 500 off each for groups of 20+ · museum included)'],
        ['Suggested time', 'About 1 hour'],
        ['Vehicle access — coach', 'No on-site parking · set down on Girin-daero and walk'],
        ['Vehicle access — van', 'Same Girin-daero bay as the hanok village'],
      ],
      planning: [
        'English tours run daily at 11:00 and 14:00; overseas groups of ten or more book between two months and one week ahead.',
        'Restoration of the main hall is due to finish at the end of 2026; before then we confirm what can be seen and brief the party.',
        'We go in soon after opening, ahead of the crowds, and take the guided tour first.',
        'Paired with Jeondong Cathedral opposite, it sets a Confucian royal shrine and a Catholic church side by side on one street.',
      ],
      cta: 'Request a custom quote for this itinerary',
    },
  },
  {
    slug: 'jeondong-cathedral',
    city: 'jeonju',
    photo: '/photos/attractions/jeonju_jeondong.jpg',
    photoCredit: 'ⓒ한국관광공사 포토코리아-김찬영',
    photoLicense: '공공누리 제1유형',
    checkedOn: CHECKED,
    ko: {
      name: '전동성당',
      tagline: '한국 최초의 천주교 순교 터에 선 1914년의 성당',
      title: '전동성당 방문 안내 | 머스트고',
      description:
        '1914년 완공된 로마네스크·비잔틴 양식의 전동성당. 내부 관람 시간과 미사 시간 조율, 관람 예절을 정리했습니다.',
      imageAlt: '전주 전동성당',
      body: [
        '전동성당은 1914년에 완공된 로마네스크·비잔틴 양식의 성당입니다. 한국에서 처음으로 천주교 순교가 있었던 자리에 세워졌습니다. 붉은 벽돌과 둥근 지붕이 한옥 지붕 사이에서 뚜렷하게 눈에 들어와, 서양 손님께 특히 반응이 좋은 장소입니다.',
        '경기전 바로 맞은편에 있다는 점이 이 성당의 이야기를 키웁니다. 유교 왕조의 사당과 가톨릭 순교지가 한 거리에서 마주 보고 있어, 두 곳을 이어서 보시면 한국이 서로 다른 전통을 어떻게 품어왔는지 자연스럽게 설명됩니다.',
        '지금도 미사가 열리는 성당입니다. 내부는 09:00부터 17:00까지 개방하지만 미사 시간에는 관람이 제한되고, 공개된 미사 시간표가 출처마다 달라 방문일 기준으로 성당에 직접 확인합니다. 차량은 경기전과 같은 기린대로 승하차장을 쓰고 걸어서 이동합니다.',
      ],
      facts: [
        ['운영시간', '내부 09:00~17:00 (미사 시간 제외)'],
        ['입장료', '무료'],
        ['권장 관람 시간', '20 ~ 30분'],
        ['차량 접근 — 대형버스', '기린대로 승하차 후 도보 · 경기전과 연계'],
        ['차량 접근 — 밴', '같은 승하차장'],
      ],
      planning: [
        '미사 시간에는 내부 관람이 제한됩니다 — 방문일 미사 시간을 미리 확인하고, 일요일 오전은 피합니다.',
        '실제 성당이라 내부에서는 정숙하고 플래시 촬영을 하지 않도록 사전에 안내드립니다.',
        '경기전과 마주 보고 있어 두 곳을 한 번에 묶으면 별도 차량 이동이 없습니다.',
        '외관 사진은 성당 앞마당에서 짧게 잡고, 내부는 조용히 둘러보는 순서로 동선을 짭니다.',
      ],
      cta: '이 일정으로 맞춤 견적 요청하기',
    },
    en: {
      name: 'Jeondong Catholic Cathedral',
      tagline: 'A 1914 cathedral on the site of Korea’s first Catholic martyrdom',
      title: 'Jeondong Catholic Cathedral Visit',
      description:
        'A Romanesque and Byzantine cathedral completed in 1914. Visiting hours, working around Mass times and the etiquette we brief.',
      imageAlt: 'Jeondong Catholic Cathedral in Jeonju',
      body: [
        'Jeondong Cathedral was completed in 1914 in a blend of Romanesque and Byzantine styles. It stands on the site where Korea’s first Catholic martyrdom took place. Its red brick and domes stand out sharply among the tiled roofs around it, and it is a stop that Western guests in particular respond to.',
        'Its position gives it a larger story. It stands directly opposite Gyeonggijeon, so a Confucian royal shrine and a Catholic site of martyrdom face each other across one street. Seen one after the other, they explain without much commentary how Korea has made room for very different traditions.',
        'It remains a working parish church. The interior is open from 09:00 to 17:00, but visits pause during Mass, and published Mass schedules differ between sources, so we confirm with the cathedral for the day in question. Vehicles use the same Girin-daero bay as Gyeonggijeon and the party walks across.',
      ],
      facts: [
        ['Opening hours', 'Interior 09:00–17:00 (except during Mass)'],
        ['Admission', 'Free'],
        ['Suggested time', '20 – 30 minutes'],
        ['Vehicle access — coach', 'Set down on Girin-daero and walk · paired with Gyeonggijeon'],
        ['Vehicle access — van', 'Same bay'],
      ],
      planning: [
        'Interior visits pause during Mass, so we confirm the schedule for the day and avoid Sunday mornings.',
        'As a working church it calls for quiet inside and no flash photography, which we brief beforehand.',
        'Directly opposite Gyeonggijeon, so the two share a single visit with no vehicle transfer.',
        'We keep the exterior photographs brief in the forecourt and let the interior be seen quietly.',
      ],
      cta: 'Request a custom quote for this itinerary',
    },
  },
  {
    slug: 'hyanggyo',
    city: 'jeonju',
    photo: '/photos/attractions/jeonju_hyanggyo.jpg',
    photoCredit: 'ⓒ한국관광공사 포토코리아-디엔에이스튜디오',
    photoLicense: '공공누리 제1유형',
    checkedOn: CHECKED,
    ko: {
      name: '전주향교',
      tagline: '400년 은행나무 아래, 조선의 지방 국립학교',
      title: '전주향교 방문 안내 | 머스트고',
      description:
        '공자 사당과 강학 공간이 남은 조선시대 지방 국립교육기관 전주향교. 휴무일과 버스 대기 방법을 정리했습니다.',
      imageAlt: '전주향교',
      body: [
        '전주향교는 조선시대 지방에 세운 국립교육기관입니다. 공자를 모신 대성전과 유생들이 공부하던 명륜당이 지금도 남아 있어, 조선이 학문과 예를 어떻게 국가의 중심에 두었는지를 실제 공간에서 설명할 수 있습니다.',
        '마당에는 400년 된 은행나무가 서 있고, 11월이면 잎이 노랗게 물들어 경내 전체가 밝아집니다. 한옥마을의 다른 명소보다 찾는 사람이 적고 조용해, 가이드와 대화하듯 천천히 둘러보는 해설 일정에 잘 맞습니다.',
        '월요일에는 문을 닫습니다. 전용 주차장이 없어, 대형버스는 승하차 후 인근 국립무형유산원 주차장에서 대기하는 방식으로 계획하되 대형 대기 가능 여부는 사전에 확인합니다. 밴은 기린대로나 국립무형유산원 쪽에서 승하차합니다.',
      ],
      facts: [
        ['운영시간', '09:00~18:00'],
        ['휴관일', '월요일'],
        ['입장료', '무료'],
        ['권장 관람 시간', '30 ~ 40분'],
        ['차량 접근 — 대형버스', '전용 주차장 없음 · 국립무형유산원 주차장 대기 (사전 확인 필요)'],
        ['차량 접근 — 밴', '기린대로 또는 국립무형유산원 쪽 승하차'],
      ],
      planning: [
        '월요일 휴무입니다 — 그날 일정이 잡히면 경기전이나 한지 체험으로 대체합니다.',
        '11월 은행나무 시기에 맞으면 체류 시간을 늘려 잡습니다.',
        '조용한 공간이라 대화형 해설로 진행하고, 대표단 규모가 크면 소그룹으로 나눕니다.',
        '국립무형유산원과 가까워 두 곳을 한 번의 정차로 묶을 수 있습니다.',
      ],
      cta: '이 일정으로 맞춤 견적 요청하기',
    },
    en: {
      name: 'Jeonju Hyanggyo Confucian School',
      tagline: 'A Joseon state school beneath a 400-year-old ginkgo',
      title: 'Jeonju Hyanggyo Confucian School',
      description:
        'A Joseon-era state school with its Confucian shrine and lecture hall intact. Closing day and how the coach waits.',
      imageAlt: 'Jeonju Hyanggyo Confucian School',
      body: [
        'Jeonju Hyanggyo was one of the state schools Joseon set up in the provinces. Its shrine to Confucius, Daeseongjeon, and its lecture hall, Myeongnyundang, both survive, which lets the guide explain in a real space how Joseon placed learning and ritual at the centre of the state.',
        'A 400-year-old ginkgo stands in the courtyard, and in November its leaves turn yellow and light up the whole compound. It draws far fewer visitors than the rest of the hanok village and stays quiet, which suits an unhurried visit where the guide talks with the party rather than at it.',
        'It is closed on Mondays. There is no dedicated parking, so the plan is for a coach to set down and then wait at the nearby National Intangible Heritage Center car park, with coach space confirmed in advance. Vans set down on Girin-daero or on the Heritage Center side.',
      ],
      facts: [
        ['Opening hours', '09:00–18:00'],
        ['Closed', 'Mondays'],
        ['Admission', 'Free'],
        ['Suggested time', '30 – 40 minutes'],
        ['Vehicle access — coach', 'No dedicated parking · waits at the Heritage Center car park (confirm first)'],
        ['Vehicle access — van', 'Set-down on Girin-daero or at the Heritage Center'],
      ],
      planning: [
        'Closed on Mondays — on that day we substitute Gyeonggijeon or the hanji workshop.',
        'When the dates fall in the November ginkgo season, we allow longer here.',
        'The quiet suits a conversational guided visit; a larger delegation is split into smaller groups.',
        'It sits close to the National Intangible Heritage Center, so both fit one vehicle stop.',
      ],
      cta: 'Request a custom quote for this itinerary',
    },
  },
  {
    slug: 'hanji',
    city: 'jeonju',
    photo: '/photos/attractions/jeonju_hanji.jpg',
    photoCredit: 'ⓒ한국관광공사 포토코리아',
    photoLicense: '공공누리 제1유형',
    checkedOn: CHECKED,
    ko: {
      name: '한국전통문화전당 · 한지 체험',
      tagline: '전주 한지를 직접 떠보는, 그대로 기념품이 되는 체험',
      title: '전주 한지 체험·한국전통문화전당 | 머스트고',
      description:
        '전주 한지의 공예 거점 한국전통문화전당. 한지 체험 예약 절차와 대형버스 승하차 조건을 정리했습니다.',
      imageAlt: '색을 들인 한지 두루마리',
      body: [
        '전주는 오래전부터 한지로 이름난 고장이고, 한국전통문화전당은 그 한지 공예의 거점입니다. 한옥마을 북쪽 길 건너편에 있어 마을 일정과 잇기 쉽고, 한지산업지원센터가 같은 주소에 함께 있습니다.',
        '이곳의 장점은 보는 데서 그치지 않고 직접 만들어 본다는 점입니다. 한지를 뜨고 공예품을 만드는 체험은 손님이 직접 손을 움직이는 프로그램이라 기억에 오래 남고, 만든 결과물이 그대로 기념품이 됩니다. 체험 내용과 요금, 영어 진행 여부는 프로그램마다 달라 예약 단계에서 확인합니다.',
        '체험은 사전 예약제로, 사용 예정일 10일 전까지 신청하고 7일 전까지 취소할 수 있습니다. 지하주차장은 승용차 전용(높이 2.3m)이라 대형버스는 건물 앞에서 승하차한 뒤 회차하고, 밴도 건물 앞 승하차를 기본으로 합니다.',
      ],
      facts: [
        ['운영시간', '09:00~18:00 · 체험은 사전 예약'],
        ['입장료', '체험 요금은 프로그램별 (사전 확인 필요)'],
        ['권장 체류 시간', '1시간 ~ 1시간 30분'],
        ['차량 접근 — 대형버스', '건물 앞 승하차 후 회차 · 지하주차장 승용차 전용'],
        ['차량 접근 — 밴', '건물 앞 승하차 (지하주차장 높이 2.3m)'],
      ],
      planning: [
        '체험은 이용일 10일 전까지 신청해야 합니다 — 일정이 확정되는 대로 바로 예약합니다.',
        '영어 진행 가능 여부와 인원별 요금은 예약 시 확인해 견적서에 반영합니다.',
        '직접 만든 한지 작품이 그대로 기념품이 되어, 별도 기념품 준비를 줄일 수 있습니다.',
        '축제·행사 기간에는 주차가 통제될 수 있어 날짜가 겹치면 승하차 위치를 다시 확인합니다.',
      ],
      cta: '이 일정으로 맞춤 견적 요청하기',
    },
    en: {
      name: 'Korea Traditional Culture Center — Hanji Workshop',
      tagline: 'Making Jeonju’s traditional paper by hand — and taking it home',
      title: 'Jeonju Hanji Paper Workshop',
      description:
        'The craft centre for Jeonju’s hanji paper. How the workshop is booked and where a coach can set down.',
      imageAlt: 'Rolls of dyed hanji paper',
      body: [
        'Jeonju has long been known for hanji, Korea’s traditional mulberry paper, and the Korea Traditional Culture Center is the city’s base for the craft. It sits just across the road north of the hanok village, which makes it easy to join to a morning there, and the hanji industry support centre shares the same address.',
        'What sets it apart is that guests make something rather than just look. Forming a sheet of hanji and turning it into a craft piece is hands-on work that stays in the memory, and what the guest makes becomes the souvenir. Content, pricing and whether a session can be run in English vary by programme, so we settle them at booking.',
        'Sessions are by reservation: bookings must be made at least ten days ahead, and can be cancelled up to seven days before. The underground car park takes cars only, with a 2.3-metre height limit, so a coach sets down in front of the building and leaves, and vans also set down at the front.',
      ],
      facts: [
        ['Opening hours', '09:00–18:00 · workshops by reservation'],
        ['Admission', 'Workshop fees vary by programme (confirm in advance)'],
        ['Suggested time', '1 – 1.5 hours'],
        ['Vehicle access — coach', 'Set down at the front and leave · car park is cars only'],
        ['Vehicle access — van', 'Set-down at the front (car park height limit 2.3m)'],
      ],
      planning: [
        'Workshops must be requested ten days ahead, so we book as soon as the itinerary is fixed.',
        'English delivery and per-person pricing are confirmed at booking and shown on the quote.',
        'The piece each guest makes is the souvenir, which can replace a separate gift.',
        'Parking can be restricted during festivals and events; if dates overlap we reconfirm the set-down.',
      ],
      cta: 'Request a custom quote for this itinerary',
    },
  },
  {
    slug: 'intangible-heritage-center',
    city: 'jeonju',
    photo: '/photos/attractions/jeonju_nihc.jpg',
    photoCredit: 'ⓒ한국관광공사 포토코리아-김지호',
    photoLicense: '공공누리 제1유형',
    checkedOn: CHECKED,
    ko: {
      name: '국립무형유산원',
      tagline: '판소리와 공예 명장, 한국의 "살아 있는 유산"을 한자리에',
      title: '국립무형유산원 방문 안내 | 머스트고',
      description:
        '판소리와 공예 등 무형유산을 전시·공연하는 국가기관. 휴관일과 단체 예약, 주차 조건을 정리했습니다.',
      imageAlt: '전주 국립무형유산원',
      body: [
        '국립무형유산원은 판소리와 전통 공예처럼 사람을 통해 이어지는 유산을 전시하고 공연하는 국가기관입니다. 건물이나 유물이 아니라 기술과 소리를 지켜온 사람들에 초점을 둔다는 점에서, 한옥마을의 사당·성당과는 다른 결의 이야기를 들려드릴 수 있습니다.',
        '상설전시는 무료이고 화요일부터 일요일까지 10시와 14시에 정기 해설이 있습니다. 공연은 날짜별로 누리집에서 예약을 받기 때문에, 방문일에 공연이 있으면 일정에 함께 넣습니다. 10명 이상 단체는 30일 전부터 사전 예약할 수 있습니다.',
        '실내 시설이라 비 오는 날 야외 일정을 대신하기에 좋습니다. 무료주차장(305면)이 있어 한옥마을 일정 중 버스 대기 장소로 먼저 검토하는 곳이지만, 대형버스 면수는 공식 안내가 없어 사전에 확인합니다. 밴은 정문 앞에서 승하차합니다.',
      ],
      facts: [
        ['운영시간', '09:30~17:30'],
        ['휴관일', '매주 월요일 · 1월 1일'],
        ['입장료', '무료'],
        ['권장 관람 시간', '40분 ~ 1시간'],
        ['차량 접근 — 대형버스', '무료주차장 305면 · 대형 면수 사전 확인 필요'],
        ['차량 접근 — 밴', '정문 앞 승하차'],
      ],
      planning: [
        '월요일 휴관입니다 — 같은 날 휴무인 전주향교와 함께 일정에서 빼고 대체합니다.',
        '방문일 공연 여부를 미리 확인해, 공연이 있으면 관람 시간에 맞춰 순서를 조정합니다.',
        '우천 시 한옥마을 야외 일정을 대신할 실내 코스로 먼저 제안드립니다.',
        '전주향교와 가까워 두 곳을 묶으면 차량 이동 없이 이어집니다.',
      ],
      cta: '이 일정으로 맞춤 견적 요청하기',
    },
    en: {
      name: 'National Intangible Heritage Center',
      tagline: 'Pansori and master craftspeople — Korea’s living heritage in one place',
      title: 'National Intangible Heritage Center',
      description:
        'The national institution exhibiting and staging Korea’s intangible heritage. Closing days, group booking and parking.',
      imageAlt: 'The National Intangible Heritage Center in Jeonju',
      body: [
        'The National Intangible Heritage Center exhibits and stages heritage that lives on through people, such as pansori singing and the traditional crafts. Its focus is not buildings or objects but the people who have kept a skill or a sound alive, which tells a different story from the shrine and cathedral in the hanok village.',
        'The permanent exhibition is free, with regular guided talks from Tuesday to Sunday at 10:00 and 14:00. Performances are booked date by date through the centre’s website, so if one falls on the day we build it in. Groups of ten or more can book from thirty days ahead.',
        'Being indoors, it is a good replacement for outdoor stops on a wet day. The free car park, with 305 spaces, is the first place we consider for a coach to wait while the party is in the hanok village, although coach bays are not published and are confirmed beforehand. Vans set down at the main entrance.',
      ],
      facts: [
        ['Opening hours', '09:30–17:30'],
        ['Closed', 'Mondays · 1 January'],
        ['Admission', 'Free'],
        ['Suggested time', '40 minutes – 1 hour'],
        ['Vehicle access — coach', 'Free car park, 305 spaces · coach bays to be confirmed'],
        ['Vehicle access — van', 'Set-down at the main entrance'],
      ],
      planning: [
        'Closed on Mondays, as is Jeonju Hyanggyo, so both come out of a Monday itinerary.',
        'We check whether a performance is on that day and arrange the order around it.',
        'Our first indoor substitute when rain affects the hanok village.',
        'It sits close to Jeonju Hyanggyo, so the two follow on without a transfer.',
      ],
      cta: 'Request a custom quote for this itinerary',
    },
  },
  {
    slug: 'deokjin-park',
    city: 'jeonju',
    photo: '/photos/attractions/jeonju_deokjin.jpg',
    photoCredit: 'ⓒ한국관광공사 포토코리아-김찬영',
    photoLicense: '공공누리 제1유형',
    checkedOn: CHECKED,
    ko: {
      name: '덕진공원 · 연화정',
      tagline: '연꽃이 연못을 덮는 공원, 물 위의 한옥 도서관',
      title: '덕진공원·연화정도서관 안내 | 머스트고',
      description:
        '여름 연꽃으로 이름난 덕진공원과 연못 위 한옥 도서관 연화정. 계절별 포인트와 휴관일, 차량 접근을 정리했습니다.',
      imageAlt: '덕진공원 연못 위 연화정도서관',
      body: [
        '덕진공원은 연못 전체를 연꽃이 덮는 공원입니다. 6월 하순부터 8월 초까지가 절정이고, 봄에는 벚꽃 명소로도 찾습니다. 한옥마을에서 조금 떨어져 있어, 오전에 마을을 걷고 오후에 숨을 돌리는 자리로 잘 맞습니다.',
        '연못 위에 지은 한옥 연화정은 지금 도서관으로 쓰입니다. 물 위에 앉은 한옥 건물과 연잎이 한 프레임에 들어와 조용한 사진 장소가 됩니다. 2026년에는 전주비빔밥축제가 이 공원으로 자리를 옮겨 열렸으니, 가을 일정이면 그해 축제 장소와 날짜도 함께 살펴봅니다.',
        '연화정도서관은 10:00부터 19:00까지 열고 월요일과 법정공휴일에 휴관합니다. 계절에 따라 운영 시간이 바뀐 적이 있어 방문 시점에 다시 확인합니다. 밴은 공원 입구에서 승하차하고, 대형버스는 덕진공원 주차장을 쓰되 대형 수용 여부를 미리 확인합니다.',
      ],
      facts: [
        ['운영시간', '연화정도서관 10:00~19:00 (계절별 변동 — 사전 확인)'],
        ['휴관일', '연화정도서관 월요일·법정공휴일'],
        ['입장료', '무료'],
        ['권장 체류 시간', '40분 ~ 1시간'],
        ['차량 접근 — 대형버스', '덕진공원 주차장 (대형 수용 사전 확인 필요)'],
        ['차량 접근 — 밴', '공원 입구 승하차'],
      ],
      planning: [
        '연꽃 절정인 6월 하순~8월 초에 맞으면 이 공원을 오후 일정의 중심에 둡니다.',
        '월요일·공휴일에는 연화정도서관 내부가 닫혀, 그날은 연못 산책 위주로 잡습니다.',
        '한옥마을이 붐비는 주말 오후, 시내 외곽으로 빠지는 일정으로 활용합니다.',
        '연화정 안은 도서관이므로 목소리를 낮추도록 사전에 안내드립니다.',
      ],
      cta: '이 일정으로 맞춤 견적 요청하기',
    },
    en: {
      name: 'Deokjin Park & Yeonhwajeong Library',
      tagline: 'A lotus-covered pond and a hanok library standing on the water',
      title: 'Deokjin Park & Yeonhwajeong Library',
      description:
        'The park known for its summer lotus and the hanok library on its pond. Seasonal highlights, closing days and vehicle access.',
      imageAlt: 'Yeonhwajeong Library on the pond at Deokjin Park',
      body: [
        'Deokjin Park is built around a pond that lotus covers from bank to bank. The flowers peak from late June to early August, and in spring the park is a cherry-blossom spot as well. It lies a little way from the hanok village, which makes it a natural place to slow down in the afternoon after a morning on foot.',
        'Yeonhwajeong, a hanok built out over the pond, now serves as a library. The building on the water and the lotus leaves around it sit in a single frame, making it a calm photo stop. In 2026 the Jeonju Bibimbap Festival moved here, so for an autumn itinerary we check that year’s festival venue and dates as well.',
        'The library opens 10:00 to 19:00 and closes on Mondays and public holidays. Its hours have changed with the season before, so we reconfirm close to the date. Vans set down at the park entrance; coaches use the Deokjin Park car park, with coach space confirmed in advance.',
      ],
      facts: [
        ['Opening hours', 'Library 10:00–19:00 (varies by season — confirm in advance)'],
        ['Closed', 'Library: Mondays and public holidays'],
        ['Admission', 'Free'],
        ['Suggested time', '40 minutes – 1 hour'],
        ['Vehicle access — coach', 'Deokjin Park car park (confirm coach space first)'],
        ['Vehicle access — van', 'Set-down at the park entrance'],
      ],
      planning: [
        'When the dates fall in the lotus peak, late June to early August, the park anchors the afternoon.',
        'The library is closed on Mondays and public holidays; on those days we keep to the walk around the pond.',
        'A good way out of the centre on a weekend afternoon, when the hanok village is at its busiest.',
        'Yeonhwajeong is a working library, so we brief the party to keep voices down inside.',
      ],
      cta: 'Request a custom quote for this itinerary',
    },
  },
  {
    slug: 'awon-gotaek',
    city: 'jeonju',
    photo: '/photos/attractions/jeonju_awon.jpg',
    photoCredit: 'ⓒ한국관광공사 포토코리아-김지호',
    photoLicense: '공공누리 제1유형',
    checkedOn: CHECKED,
    ko: {
      name: '아원고택 · 오성한옥마을(완주)',
      tagline: '산자락에 옮겨 지은 250년 고택과 현대 갤러리',
      title: '완주 아원고택·오성한옥마을 | 머스트고',
      description:
        '250년 된 고택을 옮겨 지은 완주 아원고택과 오성한옥마을. 관람시간·입장 조건과 밴 전용 접근을 정리했습니다.',
      imageAlt: '완주 오성한옥마을',
      body: [
        '아원고택은 경남 진주에 있던 250년 된 고택을 완주의 산자락으로 옮겨 지은 곳입니다. 오래된 한옥과 현대 갤러리 건축이 한 부지에서 어우러져, 도심 한가운데의 전주한옥마을과는 전혀 다른 장면을 보여드립니다. BTS 화보 촬영지로 알려져 해외 손님 가운데 이름을 먼저 알아보시는 분도 있습니다.',
        '관람 조건이 분명하게 정해져 있습니다. 관람시간은 12:00부터 16:00까지(입장 마감 15:40)이고, 입장료는 1인 10,000원이며 음료는 별도입니다. 8세 이상만 입장할 수 있고, 10인 이상 단체는 전화로 사전 예약해야 합니다. 대관이나 명절로 비정기 휴관하는 날이 있어 방문 직전에 공지를 확인합니다.',
        '전주 시내를 벗어나 완주 오성한옥마을 안으로 들어가는 길이라, 45인승 대형버스는 권하지 않습니다. 이곳이 들어가는 일정은 15인승 이하 의전 밴으로 움직이고, 고택 인근에 주차합니다.',
      ],
      facts: [
        ['운영시간', '12:00~16:00 (입장 마감 15:40)'],
        ['휴관일', '비정기 (대관·명절 — 방문 전 확인)'],
        ['입장료', '1인 10,000원 (음료 별도)'],
        ['권장 관람 시간', '약 1시간'],
        ['차량 접근 — 대형버스', '권장하지 않음 — 밴 이용'],
        ['차량 접근 — 밴', '고택 인근 주차'],
      ],
      planning: [
        '관람이 12시에 시작해 15시 40분에 입장이 마감되므로, 오전 한옥마을 뒤 오후 일정으로 배치합니다.',
        '8세 미만은 입장할 수 없습니다 — 동반 가족에 어린이가 있으면 대체 일정을 함께 준비합니다.',
        '10인 이상은 전화 사전 예약이 필요하고 비정기 휴관이 있어, 예약과 함께 방문일 운영을 확인합니다.',
        '대형버스가 어려운 곳이라, 이 일정이 들어가면 차량을 의전 밴으로 구성합니다.',
      ],
      cta: '이 일정으로 맞춤 견적 요청하기',
    },
    en: {
      name: 'Awon Gotaek & Oseong Hanok Village (Wanju)',
      tagline: 'A 250-year-old house rebuilt in the hills beside a modern gallery',
      title: 'Awon Gotaek & Oseong Hanok Village',
      description:
        'A 250-year-old house rebuilt in the hills of Wanju. Visiting hours, entry conditions and why it is a van-only stop.',
      imageAlt: 'Oseong Hanok Village in Wanju',
      body: [
        'Awon Gotaek is a 250-year-old house that was dismantled in Jinju and rebuilt in the hills of Wanju, just outside Jeonju. The old hanok and a modern gallery share one site, a scene entirely unlike the city-centre hanok village. It became known abroad as the setting of a BTS photo shoot, and some international guests recognise the name before they arrive.',
        'Its visiting conditions are fixed. The house is open 12:00 to 16:00, with last entry at 15:40; admission is KRW 10,000 per person, with drinks charged separately. Entry is limited to visitors aged eight and over, and groups of ten or more must book by telephone. It also closes on irregular days for private hire or holidays, so we check its notices just before the visit.',
        'The route leaves Jeonju and runs into Oseong Hanok Village in Wanju, and we do not recommend a 45-seat coach. When this stop is on the itinerary, the party travels in protocol vans of fifteen seats or fewer, which park near the house.',
      ],
      facts: [
        ['Opening hours', '12:00–16:00 (last entry 15:40)'],
        ['Closed', 'Irregular (private hire, holidays — check before visiting)'],
        ['Admission', 'KRW 10,000 per person (drinks extra)'],
        ['Suggested time', 'About 1 hour'],
        ['Vehicle access — coach', 'Not recommended — use a van'],
        ['Vehicle access — van', 'Parking near the house'],
      ],
      planning: [
        'With opening at 12:00 and last entry at 15:40, it takes an afternoon slot after a morning in the hanok village.',
        'Children under eight are not admitted, so if accompanying family includes young children we prepare an alternative.',
        'Groups of ten or more book by telephone, and with irregular closures we confirm the day’s opening when we book.',
        'A coach cannot serve it well, so when it is on the itinerary the vehicles are protocol vans.',
      ],
      cta: 'Request a custom quote for this itinerary',
    },
  },
]
