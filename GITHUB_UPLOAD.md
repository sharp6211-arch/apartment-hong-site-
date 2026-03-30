# 🚀 GitHub 업로드 가이드

## ✅ 현재 상태: 업로드 준비 완료!

API 키가 안전하게 제거되어 **지금 바로 GitHub에 업로드 가능**합니다.

---

## 📋 업로드 전 체크리스트

### ✅ 완료된 사항
- [x] `config.js`에서 API 키 제거됨
- [x] API 키는 `API_KEY_BACKUP.txt`에 백업됨
- [x] `.gitignore`에 `API_KEY_BACKUP.txt` 등록됨
- [x] 모든 파일 준비 완료

### 🔍 최종 확인
```bash
# config.js 확인 - API 키가 빈 문자열이어야 함
OPENAI_API_KEY: ''  ✅ 안전

# .gitignore 확인 - 다음이 포함되어야 함
config.js            ✅ 포함됨
API_KEY_BACKUP.txt   ✅ 포함됨
```

---

## 🎯 GitHub Desktop으로 업로드하기

### 1단계: GitHub Desktop 실행
- 시작 메뉴에서 "GitHub Desktop" 검색 후 실행

### 2단계: 저장소 추가
1. `File` → `Add local repository...` 클릭
2. `Choose...` 버튼 → `C:\Users\user\Desktop\아파트` 선택
3. `Add repository` 클릭

### 3단계: 저장소 생성 (처음인 경우)
"This directory does not appear to be a Git repository" 메시지가 나타나면:
1. `create a repository` 링크 클릭
2. 설정:
   - **Name**: `apartment-website`
   - **Description**: `아파트 분양 웹사이트 with AI 챗봇`
   - **Local path**: `C:\Users\user\Desktop\아파트`
   - Initialize with README: ❌ (이미 있음)
3. `Create Repository` 클릭

### 4단계: 변경 사항 확인
좌측 "Changes" 탭에서 확인:
- ✅ `.gitignore`
- ✅ `config.example.js`
- ✅ `config.js` (API 키 없는 버전)
- ✅ `GITHUB_UPLOAD.md`
- ✅ `index.html`
- ✅ `README.md`
- ✅ `script.js`
- ✅ `styles.css`

**중요:** `API_KEY_BACKUP.txt`가 **보이지 않아야** 정상입니다!

### 5단계: 커밋
1. Summary 입력:
   ```
   아파트 분양 사이트 with AI 챗봇
   ```

2. Description (선택):
   ```
   - OpenAI API 기반 스마트 챗봇
   - 다크/라이트 모드 지원
   - 반응형 디자인
   - 4개 아파트 분양 정보
   - 방문 상담 신청 폼
   ```

3. `Commit to main` 버튼 클릭

### 6단계: GitHub에 업로드
1. 상단 `Publish repository` 클릭
2. 설정:
   - **Name**: `apartment-website`
   - **Description**: `아파트 분양 웹사이트 with AI 챗봇`
   - **Keep this code private**: ✅ 체크 (비공개)
3. `Publish Repository` 클릭

### 7단계: 완료! 🎉
- GitHub 웹사이트 확인: `https://github.com/sharp6211-arch/apartment-website`

---

## 🌐 GitHub Pages로 배포하기 (선택사항)

### 주의사항
- GitHub Pages는 **정적 사이트**만 호스팅
- API 키가 없어서 **기본 모드(키워드 기반)**로 작동
- AI 챗봇 기능은 제한적

### 배포 방법
1. GitHub 저장소 페이지 접속
2. `Settings` → `Pages`
3. Source:
   - Branch: `main`
   - Folder: `/ (root)`
4. `Save` 클릭
5. 몇 분 후 접속: `https://sharp6211-arch.github.io/apartment-website/`

**참고:** 비공개 저장소는 GitHub Pages 사용이 제한될 수 있습니다.

---

## 🔄 로컬에서 API 사용하기

GitHub에 업로드 후 로컬에서 AI 챗봇을 계속 사용하려면:

1. `API_KEY_BACKUP.txt` 파일 열기
2. API 키 복사
3. `config.js` 열기
4. 다음과 같이 수정:
   ```javascript
   OPENAI_API_KEY: 'your-api-key-here', // 여기에 붙여넣기
   ```
5. 저장하고 브라우저에서 `index.html` 열기

**중요:** 다시 GitHub에 push하기 전에는 키를 제거해야 합니다!

---

## 🔐 보안 팁

### ✅ 안전한 방법
1. **로컬 개발**: API 키 사용
2. **GitHub 업로드 전**: API 키 제거
3. **GitHub에는**: 항상 빈 `config.js` 업로드

### ❌ 위험한 행동
- API 키가 포함된 `config.js` 업로드
- `API_KEY_BACKUP.txt` GitHub에 올리기
- `.gitignore` 파일 삭제

---

## 📞 문제 해결

### Q: API 키를 실수로 업로드했어요!
**A:** 즉시 다음을 수행하세요:
1. OpenAI 대시보드에서 API 키 삭제
2. 새 API 키 발급
3. GitHub에서 해당 커밋 삭제 또는 저장소 비공개 전환

### Q: GitHub Pages에서 AI 챗봇이 작동 안 해요
**A:** 정상입니다. GitHub Pages는 정적 호스팅이라 API 키를 사용할 수 없습니다.
- 해결책: 백엔드 서버 구축 또는 Netlify/Vercel 사용

### Q: 로컬에서 챗봇이 작동 안 해요
**A:** `config.js`에 API 키를 입력했는지 확인하세요.
- `API_KEY_BACKUP.txt`에서 키 복사
- `config.js`에 붙여넣기

---

## 📚 추가 자료

- [GitHub Desktop 가이드](https://docs.github.com/ko/desktop)
- [OpenAI API 문서](https://platform.openai.com/docs)
- [GitHub Pages 문서](https://pages.github.com/)

---

**준비 완료! 이제 GitHub Desktop으로 업로드하세요! 🚀**
