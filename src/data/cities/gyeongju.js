// 경주 콘텐츠. 구조는 seoul.js 와 동일하다 — 설명은 그쪽 머리말을 참고.
// 서울·부산·제주 이후에 추가된 지역이라 group: 'more' 를 단다.
//
// 운영 정보는 2026-10-24 기준으로 확인한 값이다(원자료: 한국여행일정표 경주편
// 리서치·재검증 노트). 전화 확인이 끝나지 않은 값(불국사 동절기 시간, 석굴암·불국사
// 주차 요금, 동궁과 월지·대릉원·교촌·양동의 대형버스 면수, APEC 기념관 개관 등)은
// 확정값으로 적지 않고 '사전 확인'으로 표기했다.
//
// 사진은 한국관광공사 포토코리아(한국관광콘텐츠랩) 공공누리 제1유형이며, 석굴암 한 곳만
// 포토코리아에 제1유형 사진이 없어 국가유산청 국가유산포털(공공누리 제1유형) 사진을 쓴다.
//
// 경주의 차량 조건은 "낮에는 쉽고 밤과 좁은 길에서 어렵다"로 요약된다. 사적지는 대부분
// 평지라 대형버스도 무리가 없지만, 황리단길·첨성로 일대는 버스가 들어가 설 수 없고,
// 국립경주박물관 주차장(대형 28면)은 18시(토 20시)에 닫아 야경 일정의 버스 대기지로
// 쓸 수 없다. 석굴암은 토함산 산길을 오른다. 대릉원→첨성대, 교촌→월정교처럼 하차와
// 픽업 지점을 달리하는 원웨이 동선은 밴에서만 가능하다.

const CHECKED = '2026-10-24'

export const gyeongju = {
  slug: 'gyeongju',
  group: 'more',
  ko: {
    name: '경주',
    title: '경주 프리미엄 의전 투어 | 머스트고',
    description:
      '글로벌 VIP를 위한 경주 관광지 안내. 유네스코 세계유산과 신라 왕릉·야경 명소의 운영 정보와 차량 접근 조건을 정리했습니다.',
    lead: '천년 동안 신라의 수도였던 도시입니다. 유네스코 세계유산인 불국사·석굴암과 양동마을, 시내 한가운데의 왕릉과 동궁과 월지의 야경이 한 도시 안에 모여 있습니다. 2025년 APEC 정상회의가 열린 곳이라, 각국 정상이 머문 보문호 호텔을 숙소로 삼는 일정도 가능합니다.',
  },
  en: {
    name: 'Gyeongju',
    title: 'Gyeongju Private VIP Tours | Mustgo',
    description:
      'Gyeongju attractions for global VIP visitors — UNESCO sites, royal tombs, opening hours, coach access and planning notes.',
    lead: 'For a thousand years this was the capital of the Silla kingdom. Bulguksa, Seokguram and Yangdong Village are all UNESCO World Heritage, royal burial mounds rise in the middle of town, and Donggung Palace is lit over its pond after dark. Gyeongju hosted the 2025 APEC summit, so the party can stay in the same lakeside hotels the heads of state used.',
  },
}

export const gyeongjuAttractions = [
  {
    slug: 'bulguksa',
    city: 'gyeongju',
    photo: '/photos/attractions/gyeongju_bulguksa.jpg',
    photoCredit: 'ⓒ한국관광공사 포토코리아-이병현',
    photoLicense: '공공누리 제1유형',
    checkedOn: CHECKED,
    ko: {
      name: '불국사',
      tagline: '751년 창건, 석굴암과 함께 유네스코 세계유산에 오른 신라 사찰',
      title: '불국사 프라이빗 투어 | 머스트고',
      description:
        '신라 불교 건축의 정수로 꼽히는 유네스코 세계유산 불국사. 운영시간과 주차 조건, 의전 일정 설계 포인트를 정리했습니다.',
      imageAlt: '불국사 전경',
      body: [
        '불국사는 751년에 창건된 신라 불교 건축의 정수입니다. 1995년 석굴암과 함께 유네스코 세계유산에 등재되어, 해외 손님께 한국의 문화유산을 한 곳으로 소개해야 할 때 가장 먼저 꼽히는 자리입니다.',
        '대표 볼거리는 국보인 다보탑과 석가탑, 그리고 대웅전으로 오르는 청운교·백운교 석축입니다. 돌을 다듬어 쌓은 방식만으로도 이야기가 길어지므로, 전담 해설이 붙으면 같은 시간에 훨씬 많은 것을 보실 수 있습니다. 법당 안은 촬영할 수 없습니다.',
        '2023년부터 관람료가 면제되어 입장은 무료입니다. 차량은 불국사 공영주차장을 대형버스와 밴이 함께 쓰고, 요금은 차종에 따라 다릅니다. 4월 겹벚꽃과 가을 단풍철에는 주차장 진입부터 정체가 생기므로, 의전 일정에서는 아침 첫 시간을 권합니다.',
      ],
      facts: [
        ['운영시간', '09:00~18:00 · 계절별 변동 사전 확인'],
        ['휴관일', '연중무휴'],
        ['입장료', '무료'],
        ['권장 관람 시간', '1시간 ~ 1시간 30분'],
        ['차량 접근 — 대형버스', '불국사 공영주차장 (대형 요금 사전 확인)'],
        ['차량 접근 — 밴', '같은 공영주차장 (소형 요금 적용)'],
      ],
      planning: [
        '아침 첫 시간에 들어가면 단체 인파가 적어 의전 동선이 깔끔합니다.',
        '4월 겹벚꽃·가을 단풍철에는 주차장 진입이 막히므로 도착 시간을 앞당겨 잡습니다.',
        '동절기 운영시간은 출처마다 달라, 11~2월 일정은 출발 전에 사찰 측에 다시 확인합니다.',
        '석굴암과 같은 토함산 자락에 있어 한 오전에 두 세계유산을 묶어 드립니다.',
      ],
      cta: '이 일정으로 맞춤 견적 요청하기',
    },
    en: {
      name: 'Bulguksa Temple',
      tagline: 'A Silla temple founded in 751, inscribed by UNESCO with Seokguram',
      title: 'Bulguksa Temple Private Tour',
      description:
        'The UNESCO-listed temple regarded as the high point of Silla Buddhist architecture. Hours, parking and private tour planning notes.',
      imageAlt: 'The halls and stone terraces of Bulguksa Temple',
      body: [
        'Bulguksa was founded in 751 and is regarded as the finest surviving work of Silla Buddhist architecture. It was inscribed as UNESCO World Heritage in 1995 together with Seokguram Grotto, and when a guest has room for one piece of Korean heritage, this is usually it.',
        'The two stone pagodas, Dabotap and Seokgatap, are both National Treasures, and the stone stairways of Cheongungyo and Baegungyo climb to the main hall on terraces of cut stone. The masonry alone carries a long story, so a dedicated guide makes the same hour go much further. Photography is not permitted inside the halls.',
        'Admission has been free since 2023. Coaches and vans share the Bulguksa public car park, with the fee set by vehicle size. During the April double cherry blossom and the autumn foliage, queues start at the car park entrance, so for a protocol itinerary we recommend the first hour of the morning.',
      ],
      facts: [
        ['Opening hours', '09:00–18:00 · seasonal changes to be confirmed'],
        ['Closed', 'Open year round'],
        ['Admission', 'Free'],
        ['Suggested time', '1 – 1.5 hours'],
        ['Vehicle access — coach', 'Bulguksa public car park (confirm coach fee)'],
        ['Vehicle access — van', 'Same car park (small-vehicle rate)'],
      ],
      planning: [
        'Arriving at opening time means fewer groups and a clean route for the party.',
        'In blossom and foliage season the car park entrance backs up, so we bring the arrival forward.',
        'Winter hours differ between sources, so for November to February we reconfirm with the temple before departure.',
        'Seokguram sits on the same mountain, so both World Heritage sites fit one morning.',
      ],
      cta: 'Request a custom quote for this itinerary',
    },
  },
  {
    slug: 'seokguram',
    city: 'gyeongju',
    photo: '/photos/attractions/gyeongju_seokguram.jpg',
    photoCredit: 'ⓒ국가유산청 국가유산포털',
    photoLicense: '공공누리 제1유형',
    checkedOn: CHECKED,
    ko: {
      name: '석굴암',
      tagline: '토함산 중턱, 동해를 바라보는 8세기 석굴 사원',
      title: '석굴암 프라이빗 투어 | 머스트고',
      description:
        '토함산의 8세기 인공 석굴 사원 석굴암. 계절별 운영시간과 산길·숲길 조건, 의전 일정 설계 포인트입니다.',
      imageAlt: '석굴암 본존불 정면',
      body: [
        '석굴암은 토함산 중턱에 돌을 쌓아 만든 8세기 인공 석굴 사원입니다. 동해를 바라보고 앉은 본존불은 신라 조각의 최고 걸작으로 꼽히고, 건축과 수학, 종교예술이 한 공간에 결합된 유산입니다. 1995년 불국사와 함께 유네스코 세계유산에 올랐습니다.',
        '본존불은 유리벽 밖에서만 볼 수 있어 석굴 앞에 머무는 시간은 짧습니다. 그래도 상징성이 워낙 커서, 도착 전에 차 안에서 석굴의 구조와 본존불 이야기를 먼저 들려드리면 짧은 관람이 훨씬 깊어집니다.',
        '가는 길이 일정의 변수입니다. 불국사에서 굽은 산길을 차로 올라가고, 석굴암 주차장에서 석굴까지는 완만한 숲길을 걸어야 합니다. 대형버스도 주차장까지 올라가지만, 산길 회전이 잦아 밴 쪽이 빠르고 승차감도 편합니다. 입장료는 없습니다.',
      ],
      facts: [
        ['운영시간', '3~9월 09:00~18:00 · 11~1월 09:00~17:00 · 2·10월 사전 확인'],
        ['입장료', '무료'],
        ['권장 관람 시간', '40 ~ 50분 (숲길 도보 포함)'],
        ['차량 접근 — 대형버스', '석굴암 주차장 · 산길 진입 (대형 요금 사전 확인)'],
        ['차량 접근 — 밴', '석굴암 주차장 · 산길 이동이 빠르고 편안'],
      ],
      planning: [
        '주차장에서 석굴까지 숲길을 걸으므로 편한 신발을 사전에 안내드립니다.',
        '보행이 불편한 손님이 계시면 출발 전에 동선을 함께 상의합니다.',
        '동절기에는 마감이 17:00으로 당겨지므로 오전 일정에 넣습니다.',
        '1월 1일 해맞이 때는 진입로가 통제된 전례가 있어, 연초에는 이 날을 피해 잡습니다.',
      ],
      cta: '이 일정으로 맞춤 견적 요청하기',
    },
    en: {
      name: 'Seokguram Grotto',
      tagline: 'An eighth-century cave shrine on Tohamsan, facing the East Sea',
      title: 'Seokguram Grotto Private Tour',
      description:
        'The eighth-century stone grotto on Tohamsan. Seasonal hours, the mountain road and forest path, and planning notes.',
      imageAlt: 'The seated Buddha of Seokguram Grotto seen from the front',
      body: [
        'Seokguram is an artificial grotto built of stone on the slopes of Tohamsan in the eighth century. The seated Buddha inside looks out toward the East Sea and is counted among the masterpieces of Silla sculpture — architecture, geometry and devotional art brought together in one chamber. It was inscribed as UNESCO World Heritage in 1995 alongside Bulguksa.',
        'The Buddha is seen from behind a glass screen, so the time at the grotto itself is short. Its significance far outweighs those few minutes, and we find that telling the story of the chamber in the vehicle on the way up makes the brief visit far richer.',
        'Getting there is the planning variable. The road climbs from Bulguksa in tight bends, and from the Seokguram car park a gentle forest path leads to the grotto on foot. Coaches can reach the car park, but the turns favour a van, which is quicker and more comfortable. There is no admission charge.',
      ],
      facts: [
        ['Opening hours', 'Mar–Sep 09:00–18:00 · Nov–Jan 09:00–17:00 · Feb and Oct to be confirmed'],
        ['Admission', 'Free'],
        ['Suggested time', '40 – 50 minutes (including the forest walk)'],
        ['Vehicle access — coach', 'Seokguram car park via the mountain road (confirm coach fee)'],
        ['Vehicle access — van', 'Seokguram car park · quicker and smoother on the mountain road'],
      ],
      planning: [
        'The forest path from the car park means comfortable shoes, which we mention in advance.',
        'Where anyone in the party has limited mobility, we agree the route with them before the day.',
        'Closing moves forward to 17:00 in winter, so we place it in the morning.',
        'The access road has been closed for New Year’s Day sunrise in the past, so we avoid 1 January.',
      ],
      cta: 'Request a custom quote for this itinerary',
    },
  },
  {
    slug: 'donggung-wolji',
    city: 'gyeongju',
    photo: '/photos/attractions/gyeongju_donggung.jpg',
    photoCredit: 'ⓒ한국관광공사 포토코리아-박장용',
    photoLicense: '공공누리 제1유형',
    checkedOn: CHECKED,
    ko: {
      name: '동궁과 월지',
      tagline: '복원 전각이 연못에 비치는 경주 야경의 첫 번째 장면',
      title: '동궁과 월지 야경 투어 | 머스트고',
      description:
        '신라 왕궁의 별궁과 연못 동궁과 월지. 야간 운영시간과 단체 요금, 야경 일정의 버스 대기 조건을 정리했습니다.',
      imageAlt: '연못에 비친 동궁과 월지의 복원 전각',
      body: [
        '동궁과 월지는 신라 왕궁의 별궁과 연못입니다. 복원된 전각에 조명이 들어오면 그 모습이 수면에 그대로 비치는데, 이 야경은 한국관광공사 \'야간관광 100선\'에 올라 있습니다. 만찬 뒤 산책 일정으로 저희가 가장 확실하게 권하는 곳입니다.',
        '밤 10시까지 열고 입장은 21:30에 마감합니다. 해가 진 직후가 가장 아름다워, 계절에 따라 만찬 앞이나 뒤로 순서를 옮깁니다. 겨울에는 해가 일찍 져서 저녁 식사 전에 야경을 넣을 수 있고, 7~8월에는 바로 옆 연꽃단지가 볼거리를 더합니다.',
        '야간 일정에서는 버스 대기 장소가 핵심입니다. 인근 국립경주박물관 주차장은 18시(토요일 20시)에 닫아 쓸 수 없으므로, 동궁과월지 무료 주차장의 대형 면수와 야간 대기를 미리 확보합니다. 밴은 정문 앞에서 내려드리고 주차장에서 기다립니다.',
      ],
      facts: [
        ['운영시간', '09:00~22:00 (입장 마감 21:30)'],
        ['휴관일', '연중무휴'],
        ['입장료', '성인 3,000원 (20인 이상 단체 2,400원)'],
        ['권장 관람 시간', '40분 ~ 1시간'],
        ['차량 접근 — 대형버스', '동궁과월지 주차장 (무료) · 대형 면수·야간 대기 사전 확인'],
        ['차량 접근 — 밴', '정문 앞 하차 후 주차장 대기'],
      ],
      planning: [
        '해 진 직후에 맞춰 들어가도록 만찬 시간을 앞뒤로 조정합니다.',
        '21:30 입장 마감이라 만찬이 길어질 경우에 대비해 여유를 둡니다.',
        '박물관 주차장은 저녁에 닫으므로 야간 버스 대기지는 출발 전에 따로 확보합니다.',
        '주말 저녁과 연꽃철에는 붐비므로 평일 저녁을 우선 제안드립니다.',
      ],
      cta: '이 일정으로 맞춤 견적 요청하기',
    },
    en: {
      name: 'Donggung Palace & Wolji Pond',
      tagline: 'Restored pavilions reflected in a royal pond — Gyeongju’s defining night view',
      title: 'Donggung Palace & Wolji Pond at Night',
      description:
        'The Silla royal detached palace and its pond. Evening hours, group admission and where the coach waits after dark.',
      imageAlt: 'The restored pavilions of Donggung Palace reflected in Wolji Pond',
      body: [
        'Donggung was a detached palace of the Silla court, built beside an ornamental pond. When the restored pavilions are lit, they appear again in the still water, and the view is listed among the Korea Tourism Organization’s 100 best night-time attractions. As an after-dinner walk, it is the one we recommend with the most confidence.',
        'It stays open until 22:00, with last entry at 21:30. The moment just after sunset is the best, so depending on the season we place it before or after dinner. In winter the early dusk lets it come before the meal; in July and August the lotus fields next door add to the visit.',
        'For an evening stop, the question is where the coach waits. The nearby Gyeongju National Museum car park closes at 18:00 (20:00 on Saturdays) and cannot be used, so we secure coach space and evening waiting at the free Donggung car park in advance. Vans set down at the main gate and wait in the car park.',
      ],
      facts: [
        ['Opening hours', '09:00–22:00 (last entry 21:30)'],
        ['Closed', 'Open year round'],
        ['Admission', 'KRW 3,000 adult (KRW 2,400 for groups of 20 or more)'],
        ['Suggested time', '40 minutes – 1 hour'],
        ['Vehicle access — coach', 'Donggung car park (free) · confirm coach bays and evening waiting'],
        ['Vehicle access — van', 'Set-down at the main gate, then waits in the car park'],
      ],
      planning: [
        'We move dinner earlier or later so the party arrives just after sunset.',
        'Last entry is 21:30, so we leave a margin in case dinner runs long.',
        'The museum car park closes in the evening, so the coach’s waiting place is arranged before the day.',
        'Weekend evenings and the lotus season are busy, so we suggest a weekday evening first.',
      ],
      cta: 'Request a custom quote for this itinerary',
    },
  },
  {
    slug: 'daereungwon',
    city: 'gyeongju',
    photo: '/photos/attractions/gyeongju_daereungwon.jpg',
    photoCredit: 'ⓒ한국관광공사 포토코리아-박자양',
    photoLicense: '공공누리 제1유형',
    checkedOn: CHECKED,
    ko: {
      name: '대릉원 · 첨성대',
      tagline: '거대한 신라 왕릉 사이를 걸어 7세기 천문대까지',
      title: '대릉원·첨성대 프라이빗 투어 | 머스트고',
      description:
        '신라 왕릉 23기가 이어진 대릉원과 천마총, 첨성대. 운영시간과 해설, 원웨이 차량 동선을 정리했습니다.',
      imageAlt: '봄날 대릉원의 신라 왕릉',
      body: [
        '대릉원은 거대한 신라 왕릉 23기가 능선처럼 이어진 고분공원입니다. 그중 금관이 출토된 천마총은 내부를 공개하고 있어, 무덤 안에서 발굴 당시의 구조를 직접 보실 수 있습니다. 도시 한가운데에서 왕릉 사이를 걷는 경험은 경주가 아니면 하기 어렵습니다.',
        '대릉원에서 걸어서 5~10분이면 7세기에 세운 천문대 첨성대(국보)에 닿습니다. 대릉원에서는 매시 정각에 무료 해설이 진행되고 영어도 포함되지만, 의전 일정에서는 전담 통역 가이드가 동행해 손님의 속도에 맞춰 설명드립니다.',
        '차량 동선은 밴과 버스가 크게 다릅니다. 밴은 대릉원 정문에서 내려드린 뒤 손님이 대릉원을 지나 첨성대까지 걸으시는 동안 첨성대 쪽으로 돌아가 기다립니다. 주변 첨성로·황남동 일대는 길이 좁아, 대형버스는 대릉원 주차장이나 2026년 1월 문을 연 황리단길 공영주차장에서 승하차합니다.',
      ],
      facts: [
        ['운영시간', '대릉원 09:00~22:00 (입장 마감 21:30) · 천마총 ~21:30'],
        ['휴관일', '연중무휴'],
        ['입장료', '대릉원·첨성대 무료 · 천마총 성인 3,000원 (단체 2,400원)'],
        ['권장 관람 시간', '1시간 ~ 1시간 30분'],
        ['차량 접근 — 대형버스', '대릉원 주차장 또는 황리단길 공영주차장 승하차 (대형 면수 사전 확인)'],
        ['차량 접근 — 밴', '대릉원 정문 하차 → 첨성대 쪽 픽업'],
      ],
      planning: [
        '밴으로 정문 하차·첨성대 픽업의 원웨이 동선을 짜면 되돌아 걷는 거리가 없어집니다.',
        '4월 초 돌담길 축제 기간에는 돌담길 차량이 전면 통제되므로 그 주는 밴과 도보로 동선을 바꿉니다.',
        '주말 오후에는 바로 옆 황리단길 인파가 넘어오므로 평일 오전이나 저녁을 권합니다.',
        '저녁까지 열려 있어 동궁과 월지와 묶은 야간 산책 코스로도 쓸 수 있습니다.',
      ],
      cta: '이 일정으로 맞춤 견적 요청하기',
    },
    en: {
      name: 'Daereungwon Tombs & Cheomseongdae',
      tagline: 'A walk between Silla royal tombs to a seventh-century observatory',
      title: 'Daereungwon Tombs & Cheomseongdae',
      description:
        'Twenty-three Silla royal tombs, the open Cheonmachong tomb and Cheomseongdae. Hours, guiding and the one-way vehicle route.',
      imageAlt: 'Grassy Silla royal burial mounds at Daereungwon in spring',
      body: [
        'Daereungwon is a park of twenty-three great Silla royal tombs, rising one after another like a line of low hills. Cheonmachong, where a gold crown was excavated, is open inside, so guests can stand within the structure of the tomb itself. Few places let you walk between royal burial mounds in the middle of a living city.',
        'Five to ten minutes on foot brings the party to Cheomseongdae, a seventh-century observatory and National Treasure. Daereungwon runs free guided tours on the hour, English included, but on a protocol itinerary a dedicated interpreter-guide walks with the party at their own pace.',
        'Vehicle routes differ sharply between van and coach. A van sets down at the main gate of Daereungwon, then drives round to Cheomseongdae while the party walks through the tombs to meet it. The surrounding streets are narrow, so coaches set down at the Daereungwon car park or at the Hwangnidan-gil public car park, which opened in January 2026.',
      ],
      facts: [
        ['Opening hours', 'Daereungwon 09:00–22:00 (last entry 21:30) · Cheonmachong until 21:30'],
        ['Closed', 'Open year round'],
        ['Admission', 'Daereungwon and Cheomseongdae free · Cheonmachong KRW 3,000 adult (KRW 2,400 groups)'],
        ['Suggested time', '1 – 1.5 hours'],
        ['Vehicle access — coach', 'Daereungwon or Hwangnidan-gil public car park (confirm coach bays)'],
        ['Vehicle access — van', 'Set-down at the main gate, pick-up at Cheomseongdae'],
      ],
      planning: [
        'A van allows the one-way route — drop at the gate, collect at Cheomseongdae — with no walking back.',
        'During the early-April stone-wall festival the lane is closed to traffic, so that week runs by van and on foot.',
        'Weekend afternoons draw the crowds from neighbouring Hwangnidan-gil, so we prefer a weekday morning or evening.',
        'Open into the evening, it pairs with Donggung Palace for a night walk.',
      ],
      cta: 'Request a custom quote for this itinerary',
    },
  },
  {
    slug: 'national-museum',
    city: 'gyeongju',
    photo: '/photos/attractions/gyeongju_museum.jpg',
    photoCredit: 'ⓒ한국관광공사 포토코리아-이범수',
    photoLicense: '공공누리 제1유형',
    checkedOn: CHECKED,
    ko: {
      name: '국립경주박물관',
      tagline: '신라 금관과 성덕대왕신종, 천년 왕국의 유물이 모인 곳',
      title: '국립경주박물관 VIP 관람 | 머스트고',
      description:
        '신라 유물의 본산 국립경주박물관. 관람시간과 휴관일, 2026년 9월 바뀐 주차 조건과 일정 배치 포인트입니다.',
      imageAlt: '국립경주박물관',
      body: [
        '국립경주박물관은 신라 천년 유물의 본산입니다. 신라 금관과 성덕대왕신종(에밀레종), 동궁과 월지에서 출토된 유물을 모은 월지관이 대표 전시입니다. 낮에 유적을 걷고 이곳에서 그 유적에서 나온 물건을 보면, 경주라는 도시가 한 번에 이어집니다.',
        '상설전은 무료이고, 3~10월 토요일에는 저녁 8시까지 엽니다. 실내 관람이라 비가 오거나 한여름·한겨울에 야외 일정을 대신할 수 있어, 경주 일정에서 날씨 대안으로 가장 먼저 제안드리는 곳입니다.',
        '주차 조건이 2026년 9월 2일부터 바뀌었습니다. 정문 주차장 출입구를 닫고 동측 출입구 하나로 통합해 유료로 운영하며, 대형버스 28면이 있습니다. 주차장은 18시(토요일 20시)에 닫으므로, 동궁과 월지 야경과 묶는 날에는 이곳을 버스 대기지로 쓸 수 없습니다.',
      ],
      facts: [
        ['운영시간', '10:00~18:00 · 3~10월 토요일 ~20:00 (입장은 30분 전까지)'],
        ['휴관일', '1월 1일 · 설날 · 추석 / 3·6·9·12월 둘째 월요일 실내 전시실 휴실'],
        ['입장료', '상설전 무료'],
        ['권장 관람 시간', '1시간 ~ 1시간 30분'],
        ['차량 접근 — 대형버스', '동측 주차장 (대형 28면 · 2026년 9월 유료화, 대형 요금 사전 확인)'],
        ['차량 접근 — 밴', '동측 출입구로 진입'],
      ],
      planning: [
        '우천·혹서·혹한 때 야외 일정을 대신할 실내 코스로 먼저 제안드립니다.',
        '3·6·9·12월 둘째 월요일에는 실내 전시실이 쉬므로 그 날짜는 피합니다.',
        '성덕대왕신종 앞에서 신라 이야기를 시작하면 이후 유적 일정이 쉽게 이어집니다.',
        '단체 관람 협조와 해설은 박물관과 사전에 협의합니다.',
      ],
      cta: '이 일정으로 맞춤 견적 요청하기',
    },
    en: {
      name: 'Gyeongju National Museum',
      tagline: 'Silla gold crowns and the Divine Bell of King Seongdeok',
      title: 'Gyeongju National Museum VIP Visit',
      description:
        'The principal collection of Silla artefacts. Hours, closing days, the parking changes of September 2026 and scheduling notes.',
      imageAlt: 'Gyeongju National Museum',
      body: [
        'Gyeongju National Museum holds the core of what survives from the Silla kingdom: its gold crowns, the great bronze Divine Bell of King Seongdeok, and a hall of objects recovered from Wolji Pond. Seen after a day among the sites, it shows the party what came out of the ground they have just walked.',
        'The permanent galleries are free, and from March to October the museum stays open until 20:00 on Saturdays. Being indoors, it stands in for the outdoor programme in rain or in the height of summer and winter, and it is the first weather alternative we reach for in Gyeongju.',
        'Parking changed on 2 September 2026. The main-gate car park entrance has closed and everything now runs through a single east entrance as paid parking, with 28 coach bays. The car park closes at 18:00 (20:00 on Saturdays), so on a day that ends at Donggung Palace it cannot serve as the coach’s evening waiting place.',
      ],
      facts: [
        ['Opening hours', '10:00–18:00 · Saturdays Mar–Oct until 20:00 (last entry 30 minutes before)'],
        ['Closed', '1 January, Seollal and Chuseok · galleries closed 2nd Monday of Mar, Jun, Sep, Dec'],
        ['Admission', 'Permanent galleries free'],
        ['Suggested time', '1 – 1.5 hours'],
        ['Vehicle access — coach', 'East car park (28 coach bays · paid since Sep 2026, confirm coach fee)'],
        ['Vehicle access — van', 'Enter by the east entrance'],
      ],
      planning: [
        'Our first indoor substitute when rain, heat or cold takes out an outdoor stop.',
        'The galleries close on the second Monday of March, June, September and December, so we avoid those dates.',
        'Starting the Silla story at the Divine Bell makes the rest of the sites easier to follow.',
        'Arrangements for a group visit and guiding are agreed with the museum in advance.',
      ],
      cta: 'Request a custom quote for this itinerary',
    },
  },
  {
    slug: 'gyochon',
    city: 'gyeongju',
    photo: '/photos/attractions/gyeongju_gyochon.jpg',
    photoCredit: 'ⓒ한국관광공사 포토코리아-이환우',
    photoLicense: '공공누리 제1유형',
    checkedOn: CHECKED,
    ko: {
      name: '교촌마을 · 최부잣집 · 월정교',
      tagline: '300년 만석꾼 가문의 가훈과 국내 최대 목조 다리',
      title: '교촌마을·월정교 프라이빗 투어 | 머스트고',
      description:
        '경주 최부잣집 고택이 있는 교촌마을과 복원된 목조 다리 월정교. 운영시간과 원웨이 차량 동선, 일정 구성입니다.',
      imageAlt: '남천 위에 놓인 월정교',
      body: [
        '교촌마을은 신라 국학 터 위에 자리한 한옥마을로, "12대 300년 만석꾼"으로 불린 경주 최부잣집 고택이 있습니다. \'재산은 만석 이상 모으지 말라\', \'사방 백 리 안에 굶어 죽는 이가 없게 하라\' 같은 가훈이 전해져, 기업 임원 손님께는 한국판 노블레스 오블리주이자 ESG 이야기로 전해드립니다.',
        '마을에서 걸어서 몇 분이면 월정교입니다. 신라 왕궁 월성과 남산을 잇던 다리를 2018년에 복원한 것으로, 국내에서 가장 큰 목조 다리입니다. 밤 10시까지 열려 있고, 남천에 비친 누각 조명은 동궁과 월지와 함께 경주 야경의 양대 명소로 꼽힙니다.',
        '차량은 밴이 유리합니다. 교촌마을 입구에서 내려드리고 월정교 쪽에서 다시 태우는 원웨이 동선이 가능합니다. 대형버스는 교촌·월정교 공영주차장을 쓰되 대형 면수를 미리 확인합니다. 지금도 주민이 사는 가옥이 있어 정숙과 사진 예절을 사전에 안내드립니다.',
      ],
      facts: [
        ['운영시간', '마을 상시 개방 · 월정교 09:00~22:00'],
        ['입장료', '무료'],
        ['권장 관람 시간', '약 1시간'],
        ['차량 접근 — 대형버스', '교촌·월정교 공영주차장 (대형 면수 사전 확인)'],
        ['차량 접근 — 밴', '교촌마을 하차 → 월정교 픽업'],
      ],
      planning: [
        '최부잣집 가훈 이야기는 기업 대표단에게 반응이 좋아 해설 시간을 넉넉히 잡습니다.',
        '최부잣집 옆 한정식 요석궁1779와 묶어 오찬을 넣을 수 있습니다 — 매주 화요일 휴무라 날짜를 맞춥니다.',
        '고택 개방 시간과 교동법주 시음 가능 여부는 일정 확정 전에 미리 확인합니다.',
        '해 질 무렵 월정교에서 마치면 동궁과 월지 야경으로 바로 이어집니다.',
      ],
      cta: '이 일정으로 맞춤 견적 요청하기',
    },
    en: {
      name: 'Gyochon Village & Woljeonggyo Bridge',
      tagline: 'A family that kept its fortune for 300 years, and Korea’s largest wooden bridge',
      title: 'Gyochon Village & Woljeonggyo Bridge',
      description:
        'The hanok village of the Choi family house and the restored Woljeonggyo bridge. Hours, the one-way vehicle route and itinerary notes.',
      imageAlt: 'Woljeonggyo, the restored wooden bridge over the Namcheon stream',
      body: [
        'Gyochon is a hanok village on the site of the Silla royal academy, and home to the house of the Choi family of Gyeongju, who kept their wealth for twelve generations over three hundred years. Their house rules — never hold more than ten thousand sacks of rice; let no one within a hundred li go hungry — make a Korean story of noblesse oblige, and for corporate leaders, an early account of what is now called ESG.',
        'A few minutes’ walk away is Woljeonggyo, the bridge that once linked the royal palace at Wolseong to Namsan. Restored in 2018, it is the largest wooden bridge in Korea. It is open until 22:00, and its lit pavilions reflected in the stream rank with Donggung Palace as one of the two great night views of the city.',
        'A van suits this stop. It can set down at the village entrance and collect the party at the bridge, a one-way route that removes any walking back. Coaches use the Gyochon and Woljeonggyo public car parks, with coach space confirmed beforehand. Some houses are still lived in, so we brief the party on quiet and on photography.',
      ],
      facts: [
        ['Opening hours', 'Village always open · Woljeonggyo 09:00–22:00'],
        ['Admission', 'Free'],
        ['Suggested time', 'About 1 hour'],
        ['Vehicle access — coach', 'Gyochon and Woljeonggyo public car parks (confirm coach bays)'],
        ['Vehicle access — van', 'Set-down at Gyochon, pick-up at Woljeonggyo'],
      ],
      planning: [
        'The Choi family’s house rules land well with executive delegations, so we allow time for the story.',
        'Lunch at Yoseokgung 1779, the Korean restaurant beside the Choi house, fits naturally — it closes on Tuesdays, so we set the date around that.',
        'Opening times for the Choi house and a tasting of Gyodong beopju are confirmed before the itinerary is fixed.',
        'Finishing at Woljeonggyo around dusk leads straight on to Donggung Palace at night.',
      ],
      cta: 'Request a custom quote for this itinerary',
    },
  },
  {
    slug: 'yangdong',
    city: 'gyeongju',
    photo: '/photos/attractions/gyeongju_yangdong.jpg',
    photoCredit: 'ⓒ한국관광공사 포토코리아-김계호',
    photoLicense: '공공누리 제1유형',
    checkedOn: CHECKED,
    ko: {
      name: '양동마을',
      tagline: '두 양반 가문이 500여 년을 지켜 온 유네스코 세계유산 마을',
      title: '양동마을 프라이빗 투어 | 머스트고',
      description:
        '지금도 사람이 사는 유네스코 세계유산 씨족마을 양동. 관람시간과 단체 요금, 외국어 해설 예약과 차량 조건입니다.',
      imageAlt: '언덕을 따라 앉은 양동마을 한옥',
      body: [
        '양동마을은 경주 손씨와 여강 이씨 두 양반 가문이 500여 년 동안 지켜 온 씨족마을입니다. 지금도 후손들이 살고 있어 민속촌이 아닌 살아 있는 마을이고, 2010년 \'한국의 역사마을: 하회와 양동\'으로 유네스코 세계유산에 올랐습니다.',
        '시내에서 차로 30분쯤 떨어져 있어 인파가 적고 조용합니다. 그래서 1박 2일 일정의 깊이 있는 반나절로 잘 맞고, 가까운 옥산서원과 묶을 수도 있습니다. 영어·일본어·중국어 해설은 사전 문의로 운영되므로, 일정이 정해지면 저희가 먼저 신청해 둡니다.',
        '마을 안 길은 좁은 비탈길이라 차량은 들어가지 않습니다. 대형버스와 밴 모두 마을 주차장에서 내린 뒤 걸어서 관람합니다. 사람이 사는 가옥은 주인의 허락 없이 들어갈 수 없고, 보물급 가옥도 안채를 제외한 바깥만 개방합니다.',
      ],
      facts: [
        ['운영시간', '4~9월 09:00~19:00 · 10~3월 09:00~18:00 (입장 마감 1시간 전)'],
        ['입장료', '성인 4,000원 (30인 이상 단체 3,400원)'],
        ['권장 관람 시간', '1시간 ~ 1시간 30분'],
        ['차량 접근 — 대형버스', '양동마을 주차장 (무료 · 대형 진입 사전 확인)'],
        ['차량 접근 — 밴', '마을 주차장 하차 후 도보 · 마을 안 비탈길 진입 자제'],
      ],
      planning: [
        '외국어 해설은 사전 문의제라 일정 확정과 함께 신청합니다.',
        '실제 거주 가옥이라 출입 범위와 사진 예절을 가이드가 미리 안내드립니다.',
        '비탈길을 걷는 코스이므로 고령 손님이 계시면 아랫마을 중심으로 동선을 줄입니다.',
        '운영시간은 출처마다 차이가 있어 방문 전 마을 측에 다시 확인합니다.',
      ],
      cta: '이 일정으로 맞춤 견적 요청하기',
    },
    en: {
      name: 'Yangdong Folk Village',
      tagline: 'A UNESCO-listed clan village kept by two families for over 500 years',
      title: 'Yangdong Folk Village Private Tour',
      description:
        'A lived-in clan village inscribed by UNESCO. Hours, group admission, booking an English-speaking guide and vehicle access.',
      imageAlt: 'Hanok houses along the hillside at Yangdong Village',
      body: [
        'Yangdong is a clan village that two yangban families, the Son of Gyeongju and the Yi of Yeogang, have kept for more than five hundred years. Their descendants still live here, which makes it a living village rather than a folk museum, and in 2010 it was inscribed as UNESCO World Heritage together with Hahoe, as the Historic Villages of Korea.',
        'It lies about thirty minutes’ drive from the city centre, so it is quiet and rarely crowded. That makes it the unhurried half day of a two-day programme, and it pairs with nearby Oksan Seowon. Guiding in English, Japanese or Chinese is arranged by advance enquiry, so we request it as soon as the date is set.',
        'The lanes inside the village are narrow and steep, and vehicles stay out. Coaches and vans alike set down at the village car park and the visit continues on foot. Occupied houses cannot be entered without the owner’s permission, and even the most important historic houses open only their outer quarters.',
      ],
      facts: [
        ['Opening hours', 'Apr–Sep 09:00–19:00 · Oct–Mar 09:00–18:00 (last entry 1 hour before)'],
        ['Admission', 'KRW 4,000 adult (KRW 3,400 for groups of 30 or more)'],
        ['Suggested time', '1 – 1.5 hours'],
        ['Vehicle access — coach', 'Village car park (free · confirm coach access)'],
        ['Vehicle access — van', 'Set down at the car park and walk · no driving on the village lanes'],
      ],
      planning: [
        'Foreign-language guiding is by advance enquiry, so we book it together with the itinerary.',
        'Families live in these houses; the guide briefs the party on where to go and what to photograph.',
        'The village is a walk on slopes, so for older guests we keep mainly to the lower lanes.',
        'Published hours vary between sources, so we reconfirm with the village before the visit.',
      ],
      cta: 'Request a custom quote for this itinerary',
    },
  },
  {
    slug: 'bomun-lake',
    city: 'gyeongju',
    photo: '/photos/attractions/gyeongju_bomun.jpg',
    photoCredit: 'ⓒ한국관광공사 포토코리아-김지호',
    photoLicense: '공공누리 제1유형',
    checkedOn: CHECKED,
    ko: {
      name: '보문호 · APEC 레거시',
      tagline: '2025 APEC 정상회의가 열린 호숫가 리조트 단지',
      title: '보문호·APEC 레거시 투어 | 머스트고',
      description:
        '2025 APEC 정상회의장과 정상들의 숙소가 모인 보문관광단지. 엑스포대공원 운영 정보와 행사일 교통 통제를 정리했습니다.',
      imageAlt: '경주 보문관광단지와 보문호',
      body: [
        '보문관광단지는 경주 일정의 숙박 거점이 되는 호숫가 리조트 단지입니다. 2025년 10월 27일부터 11월 1일까지 APEC 정상회의가 이곳 경주화백컨벤션센터(HICO)에서 열렸고, 각국 정상단은 단지 안 호텔에 묵었습니다. 미국 대표단은 힐튼 경주, 중국 대표단은 코오롱호텔, 일본 대표단은 라한셀렉트 경주였고, 공식 만찬도 라한셀렉트 대연회장에서 열렸습니다.',
        '그래서 이동 없이 "정상들이 모였던 그 자리"를 일정에 넣을 수 있습니다. 다만 HICO 정상회의장은 2025년 11월 닷새 동안만 시민에게 공개되었고 상시 공개는 아니어서, 현재는 외관 위주로 안내드립니다. 경주엑스포대공원 안에 정상회의장 기념관이 조성되고 있으며, 개관 여부와 관람 조건은 방문 시점에 맞춰 확인합니다.',
        '보문호를 따라 호반길이 이어져, 4월 초에는 벚꽃 터널이 됩니다. 호텔 정문에서 바로 걸어 나갈 수 있어 아침 산책 일정으로 좋습니다. 대형버스는 엑스포대공원 무료 주차장을 쓰고, 밴은 호텔 정문에서 곧바로 출발합니다.',
      ],
      facts: [
        ['운영시간', '보문호 상시 · 엑스포대공원 10:00~22:00 (전시관 ~18:00)'],
        ['입장료', '보문호 무료 · 엑스포대공원 성인 12,000원'],
        ['권장 체류 시간', '1 ~ 2시간'],
        ['차량 접근 — 대형버스', '엑스포대공원 주차장 (무료)'],
        ['차량 접근 — 밴', '호텔 정문에서 바로 출발'],
      ],
      planning: [
        '정상들이 묵은 호텔을 숙소로 잡으면 레거시 투어가 숙소에서부터 시작됩니다.',
        '4월 초 벚꽃철에는 호반길을 아침 산책으로 넣습니다.',
        '4월 첫 주말 벚꽃마라톤처럼 큰 행사가 있는 날은 보문 일대 도로가 통제되므로 이동 시간을 피해 잡습니다.',
        'APEC 기념관은 개관·관람 조건이 확정되는 대로 일정에 반영합니다.',
      ],
      cta: '이 일정으로 맞춤 견적 요청하기',
    },
    en: {
      name: 'Bomun Lake & the APEC 2025 Legacy',
      tagline: 'The lakeside resort where the 2025 APEC summit met',
      title: 'Bomun Lake & APEC 2025 Legacy',
      description:
        'The resort complex that hosted the 2025 APEC summit and its leaders. Expo Park hours, admission and event-day road closures.',
      imageAlt: 'Bomun Lake Resort in Gyeongju',
      body: [
        'Bomun Lake Resort is where most Gyeongju itineraries are based. From 27 October to 1 November 2025 the APEC summit met here at the Gyeongju Hwabaek Convention Center (HICO), and the leaders stayed in the resort’s hotels: the United States delegation at the Hilton Gyeongju, China’s at the Kolon Hotel and Japan’s at LAHAN SELECT Gyeongju, whose grand ballroom also hosted the official banquet.',
        'That puts the summit venue within walking distance of the party’s hotel. The summit hall at HICO, however, was opened to the public for only five days in November 2025 and is not open on a regular basis, so for now we present it from the outside. A summit memorial hall is being created inside Gyeongju Expo Park; whether it is open, and on what terms, we confirm for the date of the visit.',
        'A path runs around the lake and becomes a tunnel of cherry blossom in early April. It starts at the hotel doors, which makes it a good early-morning walk. Coaches use the free Expo Park car park, and vans leave straight from the hotel entrance.',
      ],
      facts: [
        ['Opening hours', 'Lake always open · Expo Park 10:00–22:00 (exhibition halls until 18:00)'],
        ['Admission', 'Lake free · Expo Park KRW 12,000 adult'],
        ['Suggested time', '1 – 2 hours'],
        ['Vehicle access — coach', 'Expo Park car park (free)'],
        ['Vehicle access — van', 'Departs directly from the hotel entrance'],
      ],
      planning: [
        'Staying in one of the summit hotels means the legacy tour begins at check-in.',
        'In early April we add the lakeside path as a morning walk under the cherry blossom.',
        'On major event days, such as the cherry blossom marathon on the first weekend of April, roads around Bomun close and we schedule transfers around them.',
        'The APEC memorial hall joins the itinerary once its opening and visiting terms are confirmed.',
      ],
      cta: 'Request a custom quote for this itinerary',
    },
  },
]
