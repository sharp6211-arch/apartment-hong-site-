# 🔧 로컬 환경 설정 가이드

## 문제 상황
- GitHub에 올릴 때: API 키 제거 필요 (보안)
- 로컬에서 사용할 때: API 키 필요 (전체 기능)

## ✅ 해결책: 로컬/배포 버전 분리

---

## 🏠 로컬에서 AI 챗봇 사용하기

### 방법: config.js에 API 키 임시 추가

1. **`config.js` 파일 열기**

2. **API 키 입력**
   ```javascript
   OPENAI_API_KEY: 'your-api-key-here',
   ```

3. **저장하고 브라우저에서 `index.html` 열기**

4. **모든 질문 가능!**
   - "2차 방정식이 뭐야?" ✅
   - "분양가 얼마예요?" ✅
   - "날씨 어때?" ✅

---

## 🚀 GitHub에 업로드할 때

### GitHub Desktop 사용 시

**자동으로 제외됨!**
- `.gitignore`에 `config.js`가 포함되어 있어서
- API 키가 있는 `config.js`는 업로드 안 됨
- 안전함! ✅

### 수동으로 관리하고 싶다면

1. **업로드 전**: API 키 제거
   ```javascript
   OPENAI_API_KEY: '',
   ```

2. **GitHub에 push**

3. **로컬 작업 재개**: API 키 다시 입력

---

## 🎯 권장 워크플로우

### 일상 작업
```
1. config.js에 API 키 넣기 (로컬 전용)
2. 브라우저에서 테스트
3. 작업 완료
```

### GitHub 업로드 시
```
방법 A: .gitignore 활용 (권장)
  - config.js가 자동으로 제외됨
  - 걱정 없이 작업
  
방법 B: 수동 관리
  - 업로드 전 API 키 제거
  - push
  - 로컬에서 다시 추가
```

---

## ⚡ 더 나은 해결책 (고급)

### 환경 변수 사용 (나중에 적용 가능)

1. `.env` 파일 생성
2. API 키를 환경변수로 관리
3. GitHub에는 `.env.example`만 올림

하지만 순수 HTML/CSS/JS로는 환경변수를 직접 사용할 수 없어서,
Node.js 서버나 빌드 도구가 필요합니다.

---

## 🌐 GitHub Pages 배포 시

### 문제
- GitHub Pages는 정적 호스팅
- API 키를 사용할 수 없음
- 기본 모드로만 작동

### 해결책 (고급)
1. **Netlify Functions** 사용
2. **Vercel Serverless** 사용  
3. **백엔드 API 서버** 구축

---

## 💡 현재 가장 쉬운 방법

### 로컬 사용
1. `API_KEY_BACKUP.txt`에서 키 복사
2. `config.js`에 붙여넣기
3. 사용
4. `.gitignore`가 자동으로 보호

### GitHub 업로드
- GitHub Desktop 사용
- `.gitignore`가 `config.js` 제외
- 안전하게 업로드됨

---

**결론: 로컬에서는 마음껏 API 키 사용, GitHub는 .gitignore가 보호!** ✅
