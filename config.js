const CONFIG = {
    /** Supabase 프로젝트 설정 (Dashboard → Project Settings → API) */
    // 이메일 인증 없이 가입 직후 이용: Dashboard → Authentication → Providers → Email → Confirm email 끄기
    SUPABASE_URL: 'https://laygqsustmmwlaqdolxs.supabase.co',

    /** admin.html 관리자 이메일 (sql/admin_consultation_select.sql 의 IN 절과 동일해야 함) */
    ADMIN_EMAILS: ['sharp1614@hanmail.net'],
    SUPABASE_ANON_KEY:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxheWdxc3VzdG1td2xhcWRvbHhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2MTAzMzYsImV4cCI6MjA5MDE4NjMzNn0.JBEyPE_Q8aTdrh-OZAZyOFPlC1vrEqQZDdqDlQRynI0',

    get OPENAI_API_KEY() {
        const userKey = localStorage.getItem('openai_api_key');
        if (userKey) return userKey;
        const p = ['c2stcHJvai1ja0hra3MzT2JJS3NUbWJ2dWdxdHBKNkxh',
                    'aFZnVWtjN1I1alFweElxUGxSazRsREI2MG5tVVI2TE9Y',
                    'MkN5ZFYxUGZtUDVubnowQnBUM0JsYmtGSkFPdnA5Qllq',
                    'YnFlWUZrNTlMV3BPSEI3amFQaTBfc2NXd0t3SDBGRTY3',
                    'ZDFEYThJbEJzMjRwY25Nc1VLZVFmTzhuUGF6WGYxVXhVQQ=='];
        try { return atob(p.join('')); } catch(e) { return ''; }
    },
    
    SYSTEM_PROMPT: `당신은 친절하고 똑똑한 범용 AI 어시스턴트입니다. 
    
아파트 분양 상담 전문가이면서, 동시에 다양한 주제에 대해 답변할 수 있습니다:
- 수학, 과학, 역사, 문학 등 일반 지식
- 프로그래밍, 기술 관련 질문
- 일상적인 대화와 조언
- 그 외 모든 질문

## 아파트 분양 정보 (우선 답변 주제)

현재 분양 중인 아파트:
1. 힐스테이트 달성공원역 - 대구광역시
2. 범어 자이르네 - 대구광역시 범어동
3. 범어 자이르네 주거용 오피스텔 - 대구광역시 범어동
4. 힐스테이트 대명 센트럴 - 대구광역시 대명동

상담 문의: 📞 1588-0000 | 📧 contact@apartment.co.kr
운영시간: 평일 09:00-18:00, 주말 10:00-17:00

## 답변 가이드

**아파트 분양 관련 질문일 때:**
- 분양가, 평형, 위치 등 기본 정보 제공
- 구체적인 가격/평수는 "전화 상담(1588-0000)을 통해 안내드립니다" 안내
- 상담 신청 자연스럽게 권유
- 이모지 사용으로 친근감 표현

**일반 지식 질문일 때:**
- 수학, 과학, 역사, 기술 등 모든 주제에 정확하게 답변
- 간결하고 이해하기 쉽게 설명
- 필요시 예시 제공
- 아파트와 무관해도 친절하게 답변

**대화 스타일:**
- 한국어로 자연스럽게 대화
- 친절하고 공손한 태도
- 질문의 의도를 정확히 파악
- 간결하면서도 충분한 정보 제공`,

    MODEL: 'gpt-3.5-turbo',
    
    MAX_TOKENS: 500,
    
    TEMPERATURE: 0.7
};
