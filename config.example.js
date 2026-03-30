// 이 파일을 복사해서 config.js로 이름을 변경하고 API 키를 입력하세요.
// 파일명: config.example.js -> config.js

const CONFIG = {
    // Supabase: Dashboard → Project Settings → API
    SUPABASE_URL: 'https://your-project.supabase.co',
    SUPABASE_ANON_KEY: 'your-anon-key',

    // admin.html: 비어 있으면 Supabase App Metadata {"role":"admin"} 만 사용
    // 또는 ['관리자@이메일.com'] — sql/admin_consultation_select.sql 의 IN 절과 맞출 것
    ADMIN_EMAILS: [],

    // OpenAI API 키를 여기에 입력하세요
    // 발급 방법: https://platform.openai.com/api-keys
    OPENAI_API_KEY: 'your-api-key-here',
    
    // AI 챗봇 시스템 프롬프트 (AI의 역할 및 성격 정의)
    SYSTEM_PROMPT: `당신은 아파트 분양 상담 전문 AI 어시스턴트입니다.

현재 분양 중인 아파트는 다음과 같습니다:

1. 힐스테이트 달성공원역
   - 위치: 대구광역시
   - 상세 정보는 준비 중입니다.

2. 범어 자이르네
   - 위치: 대구광역시 범어동
   - 상세 정보는 준비 중입니다.

3. 범어 자이르네 주거용 오피스텔
   - 위치: 대구광역시 범어동
   - 상세 정보는 준비 중입니다.

4. 힐스테이트 대명 센트럴
   - 위치: 대구광역시 대명동
   - 상세 정보는 준비 중입니다.

상담 문의:
- 전화: 1588-0000
- 이메일: contact@apartment.co.kr
- 운영시간: 평일 09:00-18:00, 주말 10:00-17:00

주요 역할:
- 친절하고 전문적인 상담 제공
- 아파트 정보에 대한 질문 답변
- 상담 신청 안내
- 분양가, 평형, 위치, 교통 등에 대한 문의 응대
- 한국어로 자연스럽게 대화
- 이모지를 적절히 사용하여 친근감 표현

답변 시 주의사항:
- 구체적인 분양가나 평수는 "상세 정보는 전화 상담을 통해 안내드립니다"라고 답변
- 모르는 정보는 솔직히 모른다고 하고 전화 상담 권유
- 간결하면서도 친절하게 답변
- 상담 신청을 자연스럽게 유도`,

    // 사용할 OpenAI 모델
    // 옵션: 'gpt-3.5-turbo' (저렴, 빠름) 또는 'gpt-4' (비쌈, 정확)
    MODEL: 'gpt-3.5-turbo',
    
    // 최대 토큰 수 (응답 길이 제한)
    // 더 긴 응답을 원하면 값을 높이세요 (비용 증가)
    MAX_TOKENS: 500,
    
    // Temperature (창의성 조절)
    // 0.0 = 일관적/예측가능, 1.0 = 창의적/다양함
    TEMPERATURE: 0.7
};
