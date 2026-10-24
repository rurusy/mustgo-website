// 강원 콘텐츠. 구조는 seoul.js 와 동일하다 — 설명은 그쪽 머리말을 참고.
//
// 강원은 세 권역으로 나뉜다. 강릉(오죽헌·선교장·경포·커피거리), 속초·양양
// (설악산·낙산사), 평창(월정사·대관령 고원). 일정의 거점은 강릉 해안이고,
// 서울에서는 KTX(서울역↔강릉역 약 2시간)로 들어오는 구성을 기본으로 한다.
//
// 운영 정보는 2026-10-24 기준으로 확인한 값이다(재검증 결과가 원조사와 다르면
// 재검증 값을 따랐다). 사진은 한국관광공사 포토코리아(한국관광콘텐츠랩)
// 공공누리 제1유형이다.
//
// 차량 조건은 계절과 도로가 좌우한다. 안목 해안도로는 좁아 대형버스 정차가
// 어렵고, 월정사→상원사 구간의 대형버스 통행은 확인되지 않았으며, 삼양라운드힐은
// 겨울(11~4월)에 개인 차량만 정상까지 올라간다. 설악케이블카에는 전용 주차장이
// 없다. 그래서 facts 의 차량 항목을 대형버스/밴으로 나눠 적는다. 대형 주차 면수·
// 요금처럼 전화 확인이 끝나지 않은 값은 숫자로 쓰지 않고 '사전 확인'으로 둔다.

const CHECKED = '2026-10-24'

export const gangwon = {
  slug: 'gangwon',
  group: 'more',
  ko: {
    name: '강원',
    title: '강원 프리미엄 의전 투어 | 머스트고',
    description:
      '글로벌 VIP를 위한 강원 관광지 안내. 강릉·속초·평창 명소의 운영 정보와 차량 접근 조건을 정리했습니다.',
    lead: '동해 바다와 백두대간이 한 지역에 있습니다. 강릉의 고택과 커피, 속초·양양의 설악산과 바닷가 사찰, 평창 대관령의 고원과 전나무숲이 각기 다른 하루를 만듭니다. 서울역에서 KTX로 약 2시간이면 강릉에 닿으므로, 강릉역에서 의전 차량이 손님을 맞이하는 구성이 가장 깔끔합니다.',
  },
  en: {
    name: 'Gangwon',
    title: 'Gangwon Private VIP Tours | Mustgo',
    description:
      'Gangwon attractions for global VIP visitors — Gangneung, Sokcho and Pyeongchang opening hours, admission and coach access.',
    lead: 'The East Sea and the Baekdudaegan mountain range share one province. Gangneung brings heritage houses and coffee, Sokcho and Yangyang bring Seoraksan and a temple on the sea cliffs, and Pyeongchang brings the Daegwallyeong highlands and an old fir forest — each a different day. Gangneung is about two hours from Seoul Station by KTX, so the simplest arrangement is for the vehicle to meet the party at Gangneung Station.',
  },
}

export const gangwonAttractions = [
  {
    slug: 'ojukheon',
    city: 'gangwon',
    photo: '/photos/attractions/gangwon_ojukheon.jpg',
    photoCredit: 'ⓒ한국관광공사 포토코리아-마이픽쳐스',
    photoLicense: '공공누리 제1유형',
    checkedOn: CHECKED,
    ko: {
      name: '오죽헌',
      tagline: '한국 지폐 두 장의 주인공이 태어난 집',
      title: '오죽헌·강릉시립박물관 투어 | 머스트고',
      description:
        '율곡 이이와 신사임당이 태어난 집 오죽헌. 관람시간·요금과 해설 예약, 주차 조건을 정리했습니다.',
      imageAlt: '강릉 오죽헌 고택과 정원',
      body: [
        '오죽헌은 조선의 대학자 율곡 이이와 그 어머니 신사임당이 태어난 집입니다. 5만원권에는 신사임당이, 5천원권에는 율곡이 들어 있어, 한국 지폐 두 장의 인물이 같은 집에서 났다는 이야기가 됩니다. 외국 손님께 한국 문화를 가장 쉽게 전할 수 있는 이야기 중 하나입니다.',
        '이름은 집 주변의 검은 대나무, 오죽(烏竹)에서 왔습니다. 고택과 대나무 정원을 걷고, 같은 경내의 강릉시립박물관과 화폐전시관을 함께 봅니다. 한국어 정규 해설은 하루 여러 차례 정해진 시간에 있고 온라인으로만 신청을 받으므로, 일정이 정해지면 미리 예약합니다.',
        '동선이 평탄하고 주차장이 무료라 차량 조건이 편한 곳입니다. 다만 대형버스가 몇 대까지 들어가는지는 확인 중이라, 단체는 사전에 확인하고 만차일 때는 인근 강릉농악전수관 앞 주차장을 씁니다. 연중무휴이고, 1월 1일과 설·추석 당일에는 경내만 열고 실내 전시실은 쉽니다.',
      ],
      facts: [
        ['운영시간', '09:00~18:00 (입장 마감 17:00)'],
        ['휴관일', '연중무휴 · 1/1·설·추석 당일은 실내 전시실 휴관'],
        ['입장료', '성인 3,000원 (30인 이상 단체 2,000원) · 만 65세 이상 무료'],
        ['권장 관람 시간', '1시간 ~ 1시간 30분'],
        ['차량 접근 — 대형버스', '무료 주차장 (대형 수용 대수 사전 확인)'],
        ['차량 접근 — 밴', '같은 주차장 · 평탄한 도보 동선'],
      ],
      planning: [
        '지폐 속 두 인물의 이야기로 시작하면 이후 강릉 일정 전체의 문을 열기 좋습니다.',
        '정규 해설은 온라인으로만 신청을 받습니다 — 일정이 확정되면 바로 시간을 잡습니다.',
        '실내 박물관이 함께 있어 비나 눈이 오는 날에도 일정이 무너지지 않습니다.',
        '선교장과 가까워 같은 오전에 두 고택을 묶는 구성이 자연스럽습니다.',
      ],
      cta: '이 일정으로 맞춤 견적 요청하기',
    },
    en: {
      name: 'Ojukheon House',
      tagline: 'The birthplace of the two faces on Korean banknotes',
      title: 'Ojukheon House Private Tour',
      description:
        'The birthplace of the scholar Yulgok and his mother Shin Saimdang. Hours, admission, guided talks and parking.',
      imageAlt: 'The historic house and garden at Ojukheon, Gangneung',
      body: [
        'Ojukheon is the house where Yulgok Yi I, one of the great Joseon scholars, and his mother Shin Saimdang were born. She appears on the 50,000-won note and he on the 5,000-won note, so two of Korea’s banknotes lead back to the same house. Few stories introduce Korean culture as easily.',
        'The name comes from the black bamboo, ojuk, that grows around the house. The visit takes in the house and bamboo garden, then the Gangneung Municipal Museum and currency exhibition on the same grounds. Korean-language guided talks run at set times through the day and can only be booked online, so we reserve as soon as the itinerary is fixed.',
        'The paths are level and parking is free, which makes this an easy stop for vehicles. How many coaches the car park takes is still being confirmed, so for a group we check beforehand; when it is full, the car park at the nearby Gangneung Nongak Training Centre takes the overflow. It opens every day, though on 1 January and on Seollal and Chuseok days only the grounds are open and the indoor galleries close.',
      ],
      facts: [
        ['Opening hours', '09:00–18:00 (last entry 17:00)'],
        ['Closed', 'Open daily · indoor galleries close on 1 Jan, Seollal and Chuseok days'],
        ['Admission', 'KRW 3,000 adult (KRW 2,000 for groups of 30+) · free for 65 and over'],
        ['Suggested time', '1 – 1.5 hours'],
        ['Vehicle access — coach', 'Free car park (confirm coach capacity in advance)'],
        ['Vehicle access — van', 'Same car park · level walking route'],
      ],
      planning: [
        'Opening with the banknote story gives the rest of a Gangneung day a natural starting point.',
        'Guided talks are booked online only, so we secure a slot as soon as the dates are fixed.',
        'The indoor museum keeps the stop viable in rain or snow.',
        'Seongyojang is close by, so the two heritage houses fit the same morning.',
      ],
      cta: 'Request a custom quote for this itinerary',
    },
  },
  {
    slug: 'seongyojang',
    city: 'gangwon',
    photo: '/photos/attractions/gangwon_seongyojang.jpg',
    photoCredit: 'ⓒ한국관광공사 포토코리아-김지호',
    photoLicense: '공공누리 제1유형',
    checkedOn: CHECKED,
    ko: {
      name: '선교장',
      tagline: '300년 동안 후손이 살아온 사대부 장원',
      title: '강릉 선교장 프라이빗 투어 | 머스트고',
      description:
        '1700년대에 지어 지금도 후손이 지키는 고택 선교장. 관람시간·요금과 다식 체험, 차량 조건을 정리했습니다.',
      imageAlt: '강릉 선교장의 연못과 정자 활래정',
      body: [
        '선교장은 효령대군의 후손 이내번이 1700년대에 지은 사대부 장원입니다. 300년이 넘도록 후손이 실제로 살아온 집이라, 박물관으로 옮겨 놓은 고택과는 공기가 다릅니다. 사랑채인 열화당과 넓은 마당, 그리고 연못 위에 지은 정자 활래정이 차례로 이어집니다.',
        '활래정 앞은 이 집에서 가장 좋은 기념사진 자리입니다. 강릉시 문화관광해설사의 해설이 매 정시(점심시간 제외) 30~40분씩 있고, 경내 카페에서는 전통 과자인 다식을 직접 만들어 보는 체험을 운영합니다. 체험은 2인 이상부터 진행하며, 콩·견과·유제품 알레르기가 있는 분은 참여할 수 없습니다.',
        '대형버스는 운정길 진입로 쪽 주차장을 쓰고, 밴은 정문 앞까지 붙일 수 있는지 미리 확인해 둡니다. 다식 체험을 하는 카페는 매주 화요일에 쉬므로, 체험을 넣는 일정은 화요일을 피해 잡습니다. 단체가 한 번에 체험할 수 있는지, 몇 회로 나눠야 하는지는 인원이 정해지면 확인합니다.',
      ],
      facts: [
        ['운영시간', '09:00~18:00 (매표 마감 17:30)'],
        ['입장료', '성인 5,000원 (30인 이상 단체 4,000원)'],
        ['다식 체험', '1인 25,000원 · 2인 이상 · 체험 장소(카페) 화요일 휴무 (관람료 별도)'],
        ['권장 관람 시간', '약 1시간 (체험 시 +40분 ~ 1시간)'],
        ['차량 접근 — 대형버스', '운정길 진입로 주차장 (대형 수용 사전 확인)'],
        ['차량 접근 — 밴', '정문 앞 하차 (사전 확인)'],
      ],
      planning: [
        '활래정 앞 기념사진을 일정의 한 장면으로 따로 잡습니다.',
        '체험 장소인 카페가 화요일에 쉽니다 — 체험을 원하시면 다른 요일로 배치합니다.',
        '콩·견과·유제품 알레르기 여부를 사전에 받아 체험 참여를 미리 정합니다.',
        '오죽헌과 가까워 같은 오전에 두 고택을 이어서 봅니다.',
      ],
      cta: '이 일정으로 맞춤 견적 요청하기',
    },
    en: {
      name: 'Seongyojang House',
      tagline: 'A scholar-gentry estate lived in by one family for three centuries',
      title: 'Seongyojang House Private Tour',
      description:
        'An 18th-century estate still kept by the founding family. Hours, admission, the dasik workshop and vehicle access.',
      imageAlt: 'The Hwallaejeong pavilion over the lotus pond at Seongyojang',
      body: [
        'Seongyojang was built in the 1700s by Yi Nae-beon, a descendant of Grand Prince Hyoryeong, as the estate of a scholar-gentry family. His descendants have lived in it for more than three hundred years, and it feels like a home rather than a house moved into a museum. Yeolhwadang, the men’s quarters, the broad courtyards and Hwallaejeong, a pavilion built out over a pond, follow one after another.',
        'The front of Hwallaejeong is the best place on the estate for a photograph. Gangneung city heritage guides give 30–40 minute talks on the hour, outside the lunch break, and the café on the estate runs a workshop in making dasik, a traditional pressed confection. It needs at least two participants, and guests with soy, nut or dairy allergies cannot take part.',
        'Coaches use the car park off the Unjeong-gil approach road; whether a van can draw up at the main gate is something we confirm beforehand. The café that hosts the workshop closes every Tuesday, so a day that includes it avoids Tuesdays. Whether a larger group can take the workshop in one session or needs several is confirmed once numbers are known.',
      ],
      facts: [
        ['Opening hours', '09:00–18:00 (tickets until 17:30)'],
        ['Admission', 'KRW 5,000 adult (KRW 4,000 for groups of 30+)'],
        ['Dasik workshop', 'KRW 25,000 per person · minimum two · the café that hosts it closes on Tuesdays (admission extra)'],
        ['Suggested time', 'About 1 hour (add 40 min – 1 hour for the workshop)'],
        ['Vehicle access — coach', 'Car park on the Unjeong-gil approach (confirm coach capacity)'],
        ['Vehicle access — van', 'Set-down at the main gate (confirm in advance)'],
      ],
      planning: [
        'We schedule the photograph at Hwallaejeong as a moment of its own.',
        'The café that hosts the workshop closes on Tuesdays — if guests want the workshop, the visit goes on another day.',
        'We collect soy, nut and dairy allergies in advance so workshop places are settled early.',
        'Ojukheon is nearby, so the two houses follow one another in a single morning.',
      ],
      cta: 'Request a custom quote for this itinerary',
    },
  },
  {
    slug: 'gyeongpodae',
    city: 'gangwon',
    photo: '/photos/attractions/gangwon_gyeongpo.jpg',
    photoCredit: 'ⓒ한국관광공사 포토코리아-고요한',
    photoLicense: '공공누리 제1유형',
    checkedOn: CHECKED,
    ko: {
      name: '경포대 · 경포호',
      tagline: '관동팔경의 으뜸 누각과 평탄한 호수 둘레길',
      title: '경포대·경포호 산책 안내 | 머스트고',
      description:
        '관동팔경의 으뜸으로 꼽히는 경포대와 경포호 둘레길. 벚꽃 시기 혼잡과 주차, 산책 일정 구성입니다.',
      imageAlt: '강릉 경포호 전경',
      body: [
        '경포대는 관동팔경 가운데 으뜸으로 꼽혀 온 누각입니다. 하늘과 호수, 바다, 술잔, 그리고 마주 앉은 사람의 눈에 달이 하나씩, 모두 다섯 개가 뜬다는 이야기가 전해집니다. 누각에 올라 호수를 내려다보며 이 이야기를 들려드리면 장소의 성격이 바로 전해집니다.',
        '아래로 펼쳐진 경포호 둘레길은 평탄해서 걷기에 부담이 없고, 바로 옆 경포해변으로 이어집니다. 일정 사이에 바람을 쐬는 산책 코스로 쓰기 좋고, 여름에는 해 질 무렵의 호수 산책을 권합니다. 4월 초에는 호숫가가 벚꽃으로 덮입니다.',
        '벚꽃 시기가 이 코스의 변수입니다. 2026년 경포벚꽃축제는 4월 4일부터 11일까지였고, 축제 주말 오후에는 주변 주차장이 대부분 찹니다. 그 시기에는 평일 오전으로 일정을 당깁니다. 상시 개방에 입장료는 없고, 대형버스 주차 면수는 사전에 확인합니다.',
      ],
      facts: [
        ['운영시간', '상시 개방'],
        ['입장료', '무료'],
        ['권장 체류 시간', '40분 ~ 1시간'],
        ['차량 접근 — 대형버스', '경포대·호수광장 주차장 (대형 면수 사전 확인)'],
        ['차량 접근 — 밴', '경포대 아래 주차장'],
      ],
      planning: [
        '벚꽃 시기(4월 초)에는 평일 오전으로 배치합니다 — 축제 주말 오후에는 주차 공간을 찾기 어렵습니다.',
        '평탄한 길이라 고령 손님도 무리 없이 걸으실 수 있는 산책 코스입니다.',
        '여름에는 한낮을 피해 해 질 무렵의 호수 산책으로 넣습니다.',
        '경포해변·호텔과 바로 붙어 있어 이동 없이 하루의 시작이나 마무리로 씁니다.',
      ],
      cta: '이 일정으로 맞춤 견적 요청하기',
    },
    en: {
      name: 'Gyeongpodae Pavilion & Gyeongpoho Lake',
      tagline: 'The most celebrated pavilion on the east coast, above a level lakeside path',
      title: 'Gyeongpodae Pavilion & Lake Walk',
      description:
        'The pavilion long ranked first among the eight views of Gwandong, and the lake path below it. Blossom crowds and parking.',
      imageAlt: 'Gyeongpoho Lake in Gangneung',
      body: [
        'Gyeongpodae has long been ranked first among the Eight Views of Gwandong, the classic scenic sites of the east coast. The old story says five moons rise here: in the sky, on the lake, on the sea, in a wine cup and in the eyes of the person across from you. Told from the pavilion, looking down on the water, it explains the place at once.',
        'The path around Gyeongpoho Lake below is level and easy underfoot, and it runs on to Gyeongpo Beach. It makes a welcome breath of fresh air between fuller stops, and in summer we suggest it in the hour before sunset. In early April the lakeside is covered in cherry blossom.',
        'The blossom is also the planning variable. The 2026 Gyeongpo cherry blossom festival ran from 4 to 11 April, and on festival weekend afternoons the car parks around the lake were largely full, so in that season we move the visit to a weekday morning. It is always open and free; coach capacity at the car parks is confirmed in advance.',
      ],
      facts: [
        ['Opening hours', 'Always open'],
        ['Admission', 'Free'],
        ['Suggested time', '40 minutes – 1 hour'],
        ['Vehicle access — coach', 'Gyeongpodae and lake plaza car parks (confirm coach bays)'],
        ['Vehicle access — van', 'Car park below the pavilion'],
      ],
      planning: [
        'In blossom season, early April, we schedule a weekday morning — on festival weekend afternoons parking is hard to find.',
        'The path is level, so it suits older guests comfortably.',
        'In summer it moves out of the midday heat to the hour before sunset.',
        'It sits beside Gyeongpo Beach and the hotels, so it opens or closes a day without a transfer.',
      ],
      cta: 'Request a custom quote for this itinerary',
    },
  },
  {
    slug: 'coffee-street',
    city: 'gangwon',
    photo: '/photos/attractions/gangwon_anmok.jpg',
    photoCredit: 'ⓒ한국관광공사 포토코리아-테마상품팀 IR 스튜디오',
    photoLicense: '공공누리 제1유형',
    checkedOn: CHECKED,
    ko: {
      name: '강릉 커피거리 · 보헤미안',
      tagline: '바다 앞 로스터리 거리와 한국 1세대 바리스타의 커피',
      title: '강릉 커피거리·보헤미안 안내 | 머스트고',
      description:
        '커피 도시 강릉의 안목 커피거리와 보헤미안 박이추커피. 축제 기간 교통 통제와 차량 승하차 조건입니다.',
      imageAlt: '안목해변을 따라 늘어선 강릉커피거리',
      body: [
        '강릉은 스스로를 커피 도시라 부릅니다. 안목해변을 따라 로스터리 카페가 줄지어 있어, 창가에 앉으면 커피잔 너머로 바로 동해가 보입니다. 바쁜 일정 사이에 한 시간쯤 쉬어 가는 자리로 가장 자연스러운 곳입니다.',
        'VIP 일정이라면 저희는 보헤미안 박이추커피를 먼저 권합니다. 한국 1세대 바리스타로 꼽히는 박이추 선생의 로스터리로, 안목보다 조용하고 한 잔에 담긴 이야기를 함께 들려드릴 수 있습니다. 커피를 좋아하시는 손님께는 이곳의 한 잔이 강릉 일정의 기억으로 남습니다.',
        '차량 조건은 까다로운 편입니다. 안목 해안도로는 좁고 정체가 잦아 관광버스가 오래 서 있기 어렵습니다. 대형버스는 승하차 지점을 미리 정해 손님만 내리고 차량은 회송하며, 밴은 카페 앞까지 붙일 수 있습니다. 10월 하순 강릉커피축제 기간에는 안목 일대 차량이 통제됩니다.',
      ],
      facts: [
        ['운영시간', '카페별 상이'],
        ['입장료', '없음 (음료 별도)'],
        ['권장 체류 시간', '45분 ~ 1시간'],
        ['차량 접근 — 대형버스', '해안도로 정차 곤란 · 승하차 지점 사전 확인 후 회송'],
        ['차량 접근 — 밴', '카페 앞 하차'],
      ],
      planning: [
        '소규모 VIP는 조용한 보헤미안, 대표단은 안목의 넓은 오션뷰 카페로 나눠 제안드립니다.',
        '대형버스는 손님만 내리고 회송합니다 — 승차 지점을 미리 정해 집합 혼선을 없앱니다.',
        '10월 하순 커피축제 기간에는 안목 진입이 통제되므로 일정 자체를 조정합니다.',
        '여름 주말에는 해안도로가 막히므로 평일이나 이른 시간대로 배치합니다.',
      ],
      cta: '이 일정으로 맞춤 견적 요청하기',
    },
    en: {
      name: 'Gangneung Coffee Street & Bohemian',
      tagline: 'Roasteries facing the sea, and coffee from a first-generation Korean barista',
      title: 'Gangneung Coffee Street & Bohemian',
      description:
        "Gangneung's seafront café strip at Anmok and Bohemian Park Yi-chu Coffee. Festival closures and coach set-down.",
      imageAlt: 'The café strip along Anmok Beach in Gangneung',
      body: [
        'Gangneung calls itself a coffee city. Roasteries line the shore at Anmok Beach, and from a window seat the East Sea sits just beyond the cup. It is the most natural place for an hour’s pause in a full day.',
        'For a VIP party we usually propose Bohemian Park Yi-chu Coffee first. It is the roastery of Park Yi-chu, counted among Korea’s first generation of baristas; it is quieter than Anmok, and the coffee comes with a story worth telling. For guests who care about coffee, this is often the cup they remember from Gangneung.',
        'Vehicles are the difficulty. The Anmok coast road is narrow and often congested, with no room for a coach to stand. Coaches set the party down at an agreed point and leave; vans can draw up outside the café. During the Gangneung Coffee Festival in late October, traffic into Anmok is closed.',
      ],
      facts: [
        ['Opening hours', 'Varies by café'],
        ['Admission', 'None (drinks charged)'],
        ['Suggested time', '45 minutes – 1 hour'],
        ['Vehicle access — coach', 'Stopping on the coast road is difficult · agreed set-down point, coach then leaves'],
        ['Vehicle access — van', 'Set-down outside the café'],
      ],
      planning: [
        'A small VIP party goes to the quieter Bohemian; a delegation takes one of the larger sea-view cafés at Anmok.',
        'The coach sets down and leaves, with the pick-up point fixed beforehand to avoid confusion.',
        'Traffic into Anmok is closed during the late-October coffee festival, so the itinerary is adjusted around it.',
        'The coast road clogs on summer weekends, so we prefer weekdays or early in the day.',
      ],
      cta: 'Request a custom quote for this itinerary',
    },
  },
  {
    slug: 'seoraksan',
    city: 'gangwon',
    photo: '/photos/attractions/gangwon_seorak.jpg',
    photoCredit: 'ⓒ한국관광공사 포토코리아-김지호',
    photoLicense: '공공누리 제1유형',
    checkedOn: CHECKED,
    ko: {
      name: '설악산 케이블카 · 신흥사',
      tagline: '등산 없이 오르는 설악산, 울산바위와 동해를 한눈에',
      title: '설악산 케이블카·신흥사 투어 | 머스트고',
      description:
        '유네스코 생물권보전지역 설악산. 케이블카 현장 매표와 대기, 주차 조건과 의전 일정 설계 포인트입니다.',
      imageAlt: '설악산 울산바위',
      body: [
        '설악산은 한국을 대표하는 명산이자 유네스코 생물권보전지역입니다. 산 아래 소공원에서 케이블카를 타면 편도 5분 남짓에 권금성에 닿고, 거기서 울산바위의 바위 능선과 멀리 동해가 함께 보입니다. 등산 없이 설악의 높이를 느낄 수 있는 방법입니다.',
        '소공원 쪽으로 내려오면 신흥사와 청동 좌불인 통일대불이 있습니다. 케이블카와 신흥사를 묶으면 걷는 거리가 길지 않은 반나절 코스가 됩니다. 10월 중하순 단풍철이 가장 아름답고, 그만큼 사람도 가장 많습니다.',
        '케이블카는 사전 예약을 받지 않고 당일 현장 매표만 합니다. 운행 시간도 계절과 날씨에 따라 그날그날 공지되고, 강풍이 불면 운행하지 않습니다. 그래서 특정 시각 탑승을 약속할 수 없어 일정에 여유 시간을 둡니다. 케이블카 전용 주차장은 없고 신흥사 유료 주차장을 쓰며, 대형버스 요금과 단풍철 진입 가능 여부는 사전에 확인합니다.',
      ],
      facts: [
        ['운영시간', '계절·기상에 따라 당일 공지 · 강풍 시 운휴'],
        ['요금', '케이블카 왕복 대인 16,000원 · 단체 할인 없음 · 현장 매표만'],
        ['권장 체류 시간', '2시간 30분 ~ 3시간 (대기 포함)'],
        ['차량 접근 — 대형버스', '신흥사 유료 주차장 (대형 요금·단풍철 진입 사전 확인)'],
        ['차량 접근 — 밴', '신흥사 유료 주차장'],
      ],
      planning: [
        '현장 매표만 가능해 대기를 피할 방법이 없습니다 — 평일 이른 오전에 도착하도록 출발합니다.',
        '탑승 시각을 보장할 수 없어 30~60분의 여유를 두고, 대기가 길면 신흥사 평지 산책으로 대체합니다.',
        '강풍 운휴가 있는 코스라 출발 전에 당일 운행 공지를 확인합니다.',
        '낙산사와 같은 방향이라 하루에 설악과 바닷가 사찰을 함께 묶습니다.',
      ],
      cta: '이 일정으로 맞춤 견적 요청하기',
    },
    en: {
      name: 'Seoraksan Cable Car & Sinheungsa',
      tagline: 'Seoraksan without the climb — Ulsanbawi and the East Sea in one view',
      title: 'Seoraksan Cable Car & Sinheungsa',
      description:
        'Seoraksan, a UNESCO biosphere reserve. On-site cable car tickets, queues, parking and private tour planning notes.',
      imageAlt: 'The granite ridge of Ulsanbawi in Seoraksan',
      body: [
        'Seoraksan is one of Korea’s best-known mountains and a UNESCO biosphere reserve. From Sogongwon at its foot, a cable car reaches Gwongeumseong in about five minutes, and from the top the granite ridge of Ulsanbawi and the distant East Sea share the view. It is the way to feel the height of Seorak without hiking.',
        'Back down at Sogongwon stand Sinheungsa Temple and its great seated bronze Buddha, the Tongil Daebul. Together, the cable car and the temple make a half day without much walking. The mountain is at its finest in the autumn colour of mid to late October — which is also when it is busiest.',
        'The cable car takes no advance bookings; tickets are sold on the day, on site only. Operating hours are posted daily according to season and weather, and service stops in high wind. A boarding time can never be promised, so we build slack into the day. The cable car has no car park of its own — vehicles use the paid Sinheungsa car park, and the coach fee and autumn access are confirmed in advance.',
      ],
      facts: [
        ['Operating', 'Posted daily by season and weather · suspended in high wind'],
        ['Fare', 'Cable car return KRW 16,000 adult · no group discount · on-site tickets only'],
        ['Suggested time', '2.5 – 3 hours (including queues)'],
        ['Vehicle access — coach', 'Paid Sinheungsa car park (confirm coach fee and autumn access)'],
        ['Vehicle access — van', 'Paid Sinheungsa car park'],
      ],
      planning: [
        'With on-site tickets only there is no way around the queue, so we leave early enough to arrive on a weekday morning.',
        'Boarding times cannot be guaranteed: we hold 30–60 minutes in reserve, and if the queue is long we substitute a level walk around Sinheungsa.',
        'Service stops in high wind, so we check the day’s operating notice before departure.',
        'Naksansa lies in the same direction, so the mountain and the seaside temple share a day.',
      ],
      cta: 'Request a custom quote for this itinerary',
    },
  },
  {
    slug: 'naksansa',
    city: 'gangwon',
    photo: '/photos/attractions/gangwon_naksansa.jpg',
    photoCredit: 'ⓒ한국관광공사 포토코리아-손명권',
    photoLicense: '공공누리 제1유형',
    checkedOn: CHECKED,
    ko: {
      name: '낙산사',
      tagline: '동해 절벽 위의 관음성지, 산불을 딛고 다시 선 사찰',
      title: '양양 낙산사 프라이빗 투어 | 머스트고',
      description:
        '신라 의상대사가 창건한 동해 절벽 위 관음성지 낙산사. 볼거리와 주차, 의전 일정 설계 포인트입니다.',
      imageAlt: '양양 낙산사',
      body: [
        '낙산사는 신라의 의상대사가 창건한 관음성지입니다. 동해를 바로 마주한 절벽 위에 홍련암과 의상대가 서 있고, 바다를 향해 선 해수관음상이 손님을 맞습니다. 바닷가 절벽과 사찰이 한 장면에 들어오는 드문 곳입니다.',
        '2005년 산불로 큰 피해를 입은 뒤 다시 복원되었다는 이야기도 이곳의 일부입니다. 잃었다가 다시 세운 과정은 외국 손님께도 설명이 잘 닿는 이야기입니다. 일출 명소로도 알려져 있습니다.',
        '입장료는 없고 주차는 유료입니다. 의상대 주차장 등 주차장이 두 곳 있으며, 대형버스 면수와 요금은 사전에 확인합니다. 경내에 경사로가 있어 홍련암까지 걷는 길이 고령 손님께는 부담이 될 수 있으므로, 동선을 미리 정해 둡니다.',
      ],
      facts: [
        ['운영시간', '이른 아침 ~ 저녁 (방문 전 시간 확인)'],
        ['입장료', '무료 (주차 유료)'],
        ['권장 관람 시간', '1시간 ~ 1시간 30분'],
        ['차량 접근 — 대형버스', '의상대 주차장 등 유료 주차장 (대형 면수·요금 사전 확인)'],
        ['차량 접근 — 밴', '유료 주차장 · 경내 가까운 하차 지점 사전 확인'],
      ],
      planning: [
        '경내 경사로가 있어 고령 손님이 계시면 해수관음상·의상대 중심으로 동선을 줄입니다.',
        '산불과 복원의 이야기를 가이드가 미리 준비해 장소의 의미를 전합니다.',
        '설악산과 같은 방향이라 설악 일정 오후에 이어 붙입니다.',
        '편한 신발을 사전에 안내드립니다 — 경사와 계단이 있는 코스입니다.',
      ],
      cta: '이 일정으로 맞춤 견적 요청하기',
    },
    en: {
      name: 'Naksansa Temple',
      tagline: 'A shrine to the Bodhisattva of Compassion on the East Sea cliffs, rebuilt after fire',
      title: 'Naksansa Temple Private Tour',
      description:
        'A temple on the East Sea cliffs, founded by the Silla monk Uisang. What to see, parking and planning notes.',
      imageAlt: 'Naksansa Temple in Yangyang',
      body: [
        'Naksansa was founded by the Silla-era monk Uisang as a shrine to Gwaneum, the Bodhisattva of Compassion. The hermitage of Hongnyeonam and the Uisangdae pavilion stand on the cliffs directly above the East Sea, and a great statue of Gwaneum stands facing the sea. Few places put a temple and a sea cliff in the same frame.',
        'The temple was badly damaged in a wildfire in 2005 and has since been restored, and that story is now part of the visit — what was lost and rebuilt carries well with international guests. It is also known as a place to watch the sunrise.',
        'Admission is free; parking is charged. There are two car parks, including the one at Uisangdae, and coach bays and fees are confirmed beforehand. The grounds include slopes, and the walk down to Hongnyeonam can be demanding for older guests, so the route is decided in advance.',
      ],
      facts: [
        ['Opening hours', 'Early morning to evening (confirm times before visiting)'],
        ['Admission', 'Free (parking charged)'],
        ['Suggested time', '1 – 1.5 hours'],
        ['Vehicle access — coach', 'Paid car parks including Uisangdae (confirm coach bays and fee)'],
        ['Vehicle access — van', 'Paid car park · closest set-down point confirmed in advance'],
      ],
      planning: [
        'The grounds slope, so for older guests we keep to the Gwaneum statue and Uisangdae.',
        'The guide prepares the story of the fire and the rebuilding, which gives the visit its weight.',
        'It lies in the same direction as Seoraksan, so it follows a Seorak morning.',
        'We advise comfortable shoes in advance — the route includes slopes and steps.',
      ],
      cta: 'Request a custom quote for this itinerary',
    },
  },
  {
    slug: 'woljeongsa',
    city: 'gangwon',
    photo: '/photos/attractions/gangwon_woljeongsa.jpg',
    photoCredit: 'ⓒ한국관광공사 포토코리아-장국영',
    photoLicense: '공공누리 제1유형',
    checkedOn: CHECKED,
    ko: {
      name: '월정사 전나무숲 · 상원사',
      tagline: '1,700여 그루 전나무 사이로 걷는 1km의 평탄한 숲길',
      title: '오대산 월정사 전나무숲 투어 | 머스트고',
      description:
        '오대산 월정사로 이어지는 1km 전나무숲과 국보 동종의 상원사. 주차 요금과 상원사 구간 차량 조건입니다.',
      imageAlt: '평창 오대산 월정사',
      body: [
        '오대산 월정사의 일주문에서 금강교까지 약 1km 구간에 1,700여 그루의 전나무가 늘어서 있습니다. 길이 평탄한 흙길이라 걷는 부담이 적고, 숲 속을 천천히 걷는 것 자체가 일정의 목적이 됩니다. 일정이 빽빽한 출장 중에 가장 조용한 한 시간이 되는 곳입니다.',
        '숲길 끝에서 월정사 경내로 들어서고, 차로 더 올라가면 상원사가 있습니다. 상원사에는 현존하는 가장 오래된 동종인 국보 상원사 동종이 있습니다. 전나무는 늘 푸른 나무라, 단풍이 진 뒤에도 겨울 설경 속에서도 숲의 모습이 유지됩니다.',
        '월정사까지는 대형버스로 충분합니다. 일주문에서 내려 숲길을 걸어 월정사로 가고, 차량은 월정사 주차장에서 기다리는 방식이 효율적입니다. 다만 월정사에서 상원사까지 약 9km 구간은 대형버스 통행이 확인되지 않아, 상원사를 넣는 일정은 밴으로 움직입니다. 겨울에는 길이 얼 수 있어 당일 노면을 확인합니다.',
      ],
      facts: [
        ['운영시간', '상시 개방'],
        ['입장료', '무료 (주차 유료 · 대형 요금 사전 확인)'],
        ['권장 관람 시간', '1시간 30분 (상원사 추가 시 +1시간 30분)'],
        ['차량 접근 — 대형버스', '일주문 하차 · 월정사 주차장 승차 — 상원사 구간 통행 미확정'],
        ['차량 접근 — 밴', '상원사까지 밴 권장'],
      ],
      planning: [
        '일주문 하차, 월정사 승차로 동선을 고정하면 숲길을 한 방향으로만 걷습니다.',
        '상원사를 넣는 일정이면 대형버스 대신 밴을 권합니다 — 대형 통행이 확인되지 않은 구간입니다.',
        '겨울에는 숲길과 도로가 얼 수 있어 미끄럼에 대비한 신발을 안내드립니다.',
        '대관령 고원과 같은 평창이라 하루에 숲과 고원을 함께 묶습니다.',
      ],
      cta: '이 일정으로 맞춤 견적 요청하기',
    },
    en: {
      name: 'Woljeongsa Fir Forest & Sangwonsa',
      tagline: 'A level kilometre beneath some 1,700 fir trees',
      title: 'Woljeongsa Fir Forest Walk',
      description:
        'The kilometre of fir forest leading to Woljeongsa, and Sangwonsa with its national-treasure bell. Parking and road access.',
      imageAlt: 'Woljeongsa Temple in Odaesan, Pyeongchang',
      body: [
        'Between the Iljumun gate and Geumgang Bridge at Woljeongsa, on Odaesan, some 1,700 fir trees line a path about a kilometre long. It is a level earth track, easy underfoot, and walking it slowly is the whole point. On a crowded business trip it becomes the quietest hour.',
        'The path ends in the temple grounds of Woljeongsa, and further up the valley by road lies Sangwonsa, home to the oldest surviving Korean temple bell, a designated national treasure. Firs are evergreen, so the forest keeps its character after the autumn colour has gone and under winter snow.',
        'A coach serves Woljeongsa well: the party sets down at Iljumun, walks the forest to the temple, and the coach waits at the temple car park. The road on to Sangwonsa, about nine kilometres, has not been confirmed for coaches, so an itinerary that includes Sangwonsa runs in a van. In winter the road can ice, and we check conditions on the day.',
      ],
      facts: [
        ['Opening hours', 'Always open'],
        ['Admission', 'Free (parking charged · confirm the coach rate in advance)'],
        ['Suggested time', '1.5 hours (add 1.5 hours for Sangwonsa)'],
        ['Vehicle access — coach', 'Set down at Iljumun, pick up at the temple car park — Sangwonsa road not confirmed'],
        ['Vehicle access — van', 'Recommended for the Sangwonsa section'],
      ],
      planning: [
        'Setting down at Iljumun and picking up at the temple means the forest is walked in one direction only.',
        'With Sangwonsa on the itinerary we recommend a van — the road has not been confirmed for coaches.',
        'Path and road can ice in winter, so we advise footwear with grip.',
        'The Daegwallyeong highlands are also in Pyeongchang, so forest and plateau share a day.',
      ],
      cta: 'Request a custom quote for this itinerary',
    },
  },
  {
    slug: 'samyang-roundhill',
    city: 'gangwon',
    photo: '/photos/attractions/gangwon_samyang.jpg',
    photoCredit: 'ⓒ한국관광공사 포토코리아-이창훈',
    photoLicense: '공공누리 제1유형',
    checkedOn: CHECKED,
    ko: {
      name: '대관령 삼양라운드힐',
      tagline: '해발 1,000m 안팎 백두대간 고원의 초지와 풍력발전기 능선',
      title: '대관령 삼양라운드힐 안내 | 머스트고',
      description:
        '백두대간 고원의 목장 삼양라운드힐. 계절별 운영시간과 요금, 그린시즌·화이트시즌 차량 진입 조건입니다.',
      imageAlt: '대관령 삼양라운드힐 초지와 풍력발전기',
      body: [
        '삼양라운드힐은 해발 1,000m 안팎 백두대간 고원에 펼쳐진 목장입니다. 정상의 동해전망대에 서면 초지 능선을 따라 풍력발전기가 늘어선 모습이 한눈에 들어옵니다. 흔히 "한국의 알프스"라고 부르는 풍경입니다.',
        '고원이라 날씨가 아래와 다릅니다. 대관령은 해발 700m가 넘어 여름에도 서늘하고, 가을과 겨울에는 매우 춥습니다. 바람과 안개도 잦아, 계절과 관계없이 따뜻한 겉옷을 미리 안내드립니다. 넓은 초지를 오래 걷기 부담스러운 고령 손님께는 규모가 작은 대관령 양떼목장을 대안으로 제안드립니다.',
        '차량 조건은 계절에 따라 완전히 달라집니다. 그린시즌(대략 5~10월)에는 목장 안 무료 셔틀이 정상까지 운행하고, 25인승부터 48인승 단체 버스는 목장 안으로 진입할 수 있습니다. 화이트시즌(11~4월)에는 셔틀이 쉬고 개인 차량만 정상까지 올라갈 수 있어, 겨울에는 밴이 유리합니다. 단체 관람은 사전에 목장에 연락해 둡니다.',
      ],
      facts: [
        ['운영시간', '09:00 개장 · 매표 마감 17:00 (11~4월 16:30) · 연중무휴'],
        ['입장료', '대인 12,000원 (30인 이상 단체 10,000원)'],
        ['권장 관람 시간', '1시간 30분 ~ 2시간'],
        ['차량 접근 — 대형버스', '그린시즌 목장 내 진입 가능 · 화이트시즌(11~4월) 진입 불가'],
        ['차량 접근 — 밴', '화이트시즌에는 정상까지 차량 진입'],
      ],
      planning: [
        '계절과 관계없이 방한복을 미리 안내드립니다 — 고원은 아래보다 훨씬 춥고 바람이 셉니다.',
        '겨울에는 대형버스가 정상에 오르지 못하므로, 대표단 일정이면 밴으로 바꾸거나 다른 코스로 대체합니다.',
        '겨울 평창 일정은 당일 아침 도로 상황을 확인한 뒤 진행 여부를 정합니다.',
        '고령 손님이 계시면 걷는 거리가 짧은 대관령 양떼목장을 대안으로 준비합니다.',
      ],
      cta: '이 일정으로 맞춤 견적 요청하기',
    },
    en: {
      name: 'Daegwallyeong Samyang Roundhill',
      tagline: 'Upland pasture and a ridge of wind turbines at around 1,000 metres',
      title: 'Daegwallyeong Samyang Roundhill',
      description:
        'A highland farm on the Baekdudaegan ridge. Seasonal hours, admission and which vehicles can reach the summit.',
      imageAlt: 'Pasture and wind turbines at Samyang Roundhill, Daegwallyeong',
      body: [
        'Samyang Roundhill is a farm spread across the Baekdudaegan highlands at around 1,000 metres. From the East Sea Observatory at the summit, the wind turbines can be seen running along the grassy ridgeline. It is the landscape Koreans like to call the Korean Alps.',
        'The plateau keeps its own weather. Daegwallyeong lies above 700 metres, so it is cool even in summer and very cold in autumn and winter, with frequent wind and fog — we advise warm layers whatever the season. For older guests who would rather not walk the open pasture at length, we suggest the smaller Daegwallyeong Sheep Farm instead.',
        'Vehicle access changes completely with the season. In the green season, roughly May to October, a free shuttle runs to the summit and group buses from 25 to 48 seats may drive inside the farm. In the white season, November to April, the shuttle stops and only private vehicles may drive to the top, which makes a van the better choice in winter. Group visits are arranged with the farm in advance.',
      ],
      facts: [
        ['Opening hours', 'Opens 09:00 · tickets until 17:00 (16:30 Nov–Apr) · open daily'],
        ['Admission', 'KRW 12,000 adult (KRW 10,000 for groups of 30+)'],
        ['Suggested time', '1.5 – 2 hours'],
        ['Vehicle access — coach', 'May enter the farm in the green season · no entry Nov–Apr'],
        ['Vehicle access — van', 'Can drive to the summit in the white season'],
      ],
      planning: [
        'We advise warm clothing in every season — the plateau is far colder and windier than the coast.',
        'Coaches cannot reach the summit in winter, so a delegation either switches to vans or takes a different stop.',
        'In winter, whether the Pyeongchang day goes ahead is decided that morning after checking the roads.',
        'Where older guests are travelling we hold the shorter Daegwallyeong Sheep Farm as an alternative.',
      ],
      cta: 'Request a custom quote for this itinerary',
    },
  },
]
