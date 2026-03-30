(function () {
    const form = document.getElementById('guestLookupForm');
    const submitBtn = document.getElementById('guestLookupSubmit');
    const emailEl = document.getElementById('guestLookupEmail');
    const phoneEl = document.getElementById('guestLookupPhone');
    const msgEl = document.getElementById('guestLookupMessage');
    const resultsSection = document.getElementById('guestResults');
    const loadingEl = document.getElementById('guestConsultLoading');
    const emptyEl = document.getElementById('guestConsultEmpty');
    const listEl = document.getElementById('guestConsultationsList');
    const errEl = document.getElementById('guestConsultError');

    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        if (themeToggle) themeToggle.textContent = '☀️';
    }
    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            body.classList.toggle('dark-mode');
            if (body.classList.contains('dark-mode')) {
                themeToggle.textContent = '☀️';
                localStorage.setItem('theme', 'dark');
            } else {
                themeToggle.textContent = '🌙';
                localStorage.setItem('theme', 'light');
            }
        });
    }

    function setFormMessage(text, type) {
        if (!msgEl) return;
        msgEl.textContent = text || '';
        msgEl.classList.remove('is-error', 'is-success');
        if (type === 'error') msgEl.classList.add('is-error');
        if (type === 'success') msgEl.classList.add('is-success');
    }

    function renderRows(rows) {
        if (!listEl) return;
        listEl.innerHTML = '';
        rows.forEach(function (row) {
            const li = document.createElement('li');
            li.className = 'member-consult-item';
            const dateStr = row.created_at
                ? new Date(row.created_at).toLocaleString('ko-KR')
                : '';

            const meta = document.createElement('p');
            meta.className = 'member-consult-item__meta';
            meta.textContent = dateStr;

            const title = document.createElement('p');
            title.className = 'member-consult-item__title';
            title.textContent = row.apartment || '상담 신청';

            const refP = document.createElement('p');
            refP.className = 'member-consult-item__row member-consult-item__ref';
            refP.textContent = '접수 ID: ' + (row.id || '(없음)');

            const r1 = document.createElement('p');
            r1.className = 'member-consult-item__row';
            r1.textContent = '이름: ' + (row.name || '');
            const r2 = document.createElement('p');
            r2.className = 'member-consult-item__row';
            r2.textContent =
                '연락처: ' + (row.phone || '') + ' · ' + (row.email || '');
            const r3 = document.createElement('p');
            r3.className = 'member-consult-item__row';
            r3.textContent = row.message
                ? '문의: ' + row.message
                : '문의: (내용 없음)';

            li.appendChild(meta);
            li.appendChild(title);
            li.appendChild(refP);
            li.appendChild(r1);
            li.appendChild(r2);
            li.appendChild(r3);
            listEl.appendChild(li);
        });
    }

    if (!form || !submitBtn) return;

    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        setFormMessage('');
        if (errEl) {
            errEl.style.display = 'none';
            errEl.textContent = '';
        }

        if (
            typeof ApartmentAuth === 'undefined' ||
            !ApartmentAuth.init ||
            !ApartmentAuth.getSupabaseClient
        ) {
            setFormMessage('인증 모듈을 불러오지 못했습니다.', 'error');
            return;
        }
        await ApartmentAuth.init();
        if (!ApartmentAuth.isSupabaseConfigured || !ApartmentAuth.isSupabaseConfigured()) {
            setFormMessage('config.js에 Supabase URL·Anon 키를 설정해 주세요.', 'error');
            return;
        }

        const sb = ApartmentAuth.getSupabaseClient();
        if (!sb) {
            setFormMessage('Supabase 연결을 만들 수 없습니다.', 'error');
            return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = '조회 중…';

        if (resultsSection) resultsSection.hidden = false;
        if (loadingEl) {
            loadingEl.hidden = false;
            loadingEl.style.display = '';
        }
        if (emptyEl) emptyEl.hidden = true;
        if (listEl) listEl.innerHTML = '';

        const email = emailEl.value.trim();
        const phone = phoneEl.value.trim();

        const { data, error } = await sb.rpc('guest_consultations_list', {
            p_email: email,
            p_phone: phone
        });

        if (loadingEl) loadingEl.hidden = true;

        if (error) {
            if (errEl) {
                errEl.textContent =
                    '조회에 실패했습니다. Supabase에 sql/guest_consultations_lookup.sql을 적용했는지 확인해 주세요. (' +
                    error.message +
                    ')';
                errEl.style.display = 'block';
            }
            submitBtn.disabled = false;
            submitBtn.textContent = '내역 조회';
            return;
        }

        const rows = Array.isArray(data) ? data : [];
        if (rows.length === 0) {
            if (emptyEl) emptyEl.hidden = false;
        } else {
            if (emptyEl) emptyEl.hidden = true;
            renderRows(rows);
        }

        submitBtn.disabled = false;
        submitBtn.textContent = '내역 조회';

        if (resultsSection) {
            resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
})();
