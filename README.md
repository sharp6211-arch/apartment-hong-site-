# 🏢 아파트 분양 웹사이트

OpenAI API를 활용한 AI 챗봇이 포함된 아파트 분양 홍보 사이트입니다.

## 📋 주요 기능

- ✨ 반응형 디자인
- 🌓 다크/라이트 모드
- 💬 OpenAI API 기반 AI 챗봇
- 📝 방문 상담 신청 폼
- 🏠 4개 아파트 분양 정보

## 🚀 시작하기

### 1. 파일 구조

```
아파트/
├── index.html          # 메인 HTML
├── styles.css          # 스타일시트
├── script.js           # 메인 스크립트
├── config.js           # 설정 파일 (API 키 포함)
└── README.md           # 이 파일
```

### 2. OpenAI API 키 설정

#### 방법 1: API 키 발급

1. [OpenAI Platform](https://platform.openai.com/signup)에서 계정 생성
2. [API Keys](https://platform.openai.com/api-keys) 페이지에서 새 API 키 생성
3. 생성된 키 복사

#### 방법 2: config.js 파일 수정

`config.js` 파일을 열고 `OPENAI_API_KEY`에 본인의 API 키를 입력하세요:

```javascript
const CONFIG = {
    OPENAI_API_KEY: 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',  // 여기에 API 키 입력
    // ... 나머지 설정
};
```

### 3. 실행하기

1. `index.html` 파일을 웹 브라우저에서 열기
2. 우측 하단 💬 버튼 클릭
3. AI 챗봇과 대화 시작!

## 💡 챗봇 기능

### AI 모드 (API 키 설정 시)

- 🤖 OpenAI GPT-3.5 Turbo 모델 사용
- 💬 자연스러운 대화 가능
- 🧠 문맥 이해 및 맞춤형 답변
- 📚 대화 내역 기억 (최근 20개)

### 기본 모드 (API 키 미설정 시)

- 📝 키워드 기반 응답
- ⚡ 빠른 응답 속도
- 🔒 인터넷 연결 불필요

## ⚙️ 설정 옵션 (config.js)

```javascript
const CONFIG = {
    OPENAI_API_KEY: '',           // OpenAI API 키
    MODEL: 'gpt-3.5-turbo',       // 사용할 모델
    MAX_TOKENS: 500,              // 최대 토큰 수
    TEMPERATURE: 0.7,             // 창의성 (0.0 ~ 1.0)
    SYSTEM_PROMPT: '...'          // 시스템 프롬프트
};
```

## 🔒 보안 주의사항

### ⚠️ 중요: API 키 보안

**현재 `config.js`는 API 키가 비어있어 안전하게 GitHub에 업로드 가능합니다!**

- ✅ `config.js`: API 키 없음 (GitHub 업로드 가능)
- 🔒 `API_KEY_BACKUP.txt`: 실제 API 키 포함 (로컬 전용, .gitignore에 등록됨)
- ✅ `.gitignore`: `API_KEY_BACKUP.txt` 자동 제외

**로컬에서 API 사용하는 방법:**
1. `API_KEY_BACKUP.txt` 파일에서 API 키 복사
2. `config.js` 파일 열기
3. `OPENAI_API_KEY: ''` 부분에 키 붙여넣기
4. 저장하고 사용
5. **GitHub 업로드 전에 다시 빈 문자열로 변경!**

### GitHub 업로드 시

`.gitignore` 파일을 만들고 다음 내용 추가:

```
config.js
```

그리고 `config.example.js` 파일을 만들어서 예제 제공:

```javascript
const CONFIG = {
    OPENAI_API_KEY: 'your-api-key-here',
    // ... 나머지 설정
};
```

## 🌐 인터넷 주소로 공개하기 (GitHub Pages)

다른 사람이 브라우저로 접속할 수 있는 주소를 만들려면 **GitHub에 올린 뒤 Pages 설정**을 하면 됩니다.

**자세한 단계(복사해서 따라 하기):** 프로젝트 안의 **`깃허브_Pages_공개.txt`** 파일을 여세요.

**요약:**

1. [github.com](https://github.com) 에서 **새 저장소** 생성 (이름 예: `apartment-site`).
2. 이 `아파트` 폴더 전체를 그 저장소에 **push** (GitHub Desktop 또는 `git` 명령).
3. 저장소 **Settings → Pages** → Branch **main**, 폴더 **/(root)** → Save.
4. 몇 분 후 주소: **`https://본인아이디.github.io/저장소이름/`**  
   → 여기서 **`index.html`** 이 메인 화면으로 열립니다.

루트에 **`.nojekyll`** 파일이 있으면 GitHub Pages에서 정적 파일이 깨지지 않습니다.

**Supabase 로그인/리다이렉트**를 쓰면, Supabase **Authentication → URL Configuration**에 위 GitHub Pages 주소를 **Site URL / Redirect URLs**에 추가하세요.

### 주의: API 키

GitHub Pages는 코드가 **전부 공개**됩니다. `config.js`에 **비밀 API 키**를 넣은 채로 push 하면 노출됩니다. 공개 전 키 제거 또는 `config.example.js`만 올리는 방식을 검토하세요.

#### 옵션: 기본(키워드) 모드로 배포
- `OPENAI_API_KEY`를 비우면 키워드 기반 챗봇으로 동작

#### 옵션: 백엔드 / Netlify / Vercel
- API 키는 서버·환경 변수에서만 보관

## 📞 분양 문의

- 전화: 1588-0000
- 이메일: contact@apartment.co.kr
- 운영시간: 평일 09:00-18:00, 주말 10:00-17:00

## 📄 라이선스

이 프로젝트는 개인/상업적 용도로 자유롭게 사용 가능합니다.

## 🛠️ 기술 스택

- HTML5
- CSS3 (Variables, Grid, Flexbox)
- Vanilla JavaScript (ES6+)
- OpenAI API (GPT-3.5 Turbo)

---

**만든이**: 아파트 분양 센터  
**버전**: 1.0.0  
**최종 업데이트**: 2026-03-08
