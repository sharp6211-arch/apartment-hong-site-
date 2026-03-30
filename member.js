(async function () {
    if (typeof ApartmentAuth === 'undefined' || !ApartmentAuth.init) {
        window.location.replace('index.html');
        return;
    }
    await ApartmentAuth.init();
    if (!ApartmentAuth.isLoggedIn()) {
        window.location.replace('index.html');
        return;
    }

    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    const logoutBtn = document.getElementById('logoutBtn');
    const memberEmailDisplay = document.getElementById('memberEmailDisplay');
    const memberGreetingName = document.getElementById('memberGreetingName');

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            themeToggle.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggle.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        }
    });

    const session = ApartmentAuth.getSession();
    if (session && session.email) {
        memberEmailDisplay.textContent = session.email;
        var local = session.email.split('@')[0];
        memberGreetingName.textContent = local.length > 20 ? local.slice(0, 17) + '…' : local;
    }

    logoutBtn.addEventListener('click', async () => {
        await ApartmentAuth.signOut();
        window.location.href = 'index.html';
    });

    const loadingEl = document.getElementById('consultationsLoading');
    const emptyEl = document.getElementById('consultationsEmpty');
    const listEl = document.getElementById('memberConsultationsList');
    const errEl = document.getElementById('consultationsError');

    const sb = ApartmentAuth.getSupabaseClient && ApartmentAuth.getSupabaseClient();
    if (!sb) {
        if (loadingEl) loadingEl.hidden = true;
        if (emptyEl) {
            emptyEl.hidden = false;
            emptyEl.textContent = 'Supabase가 설정되지 않았습니다. config.js를 확인해 주세요.';
        }
    } else {
        const { data: userWrap, error: userErr } = await sb.auth.getUser();
        const user = userWrap && userWrap.user ? userWrap.user : null;
        if (userErr || !user || !user.id) {
            if (loadingEl) loadingEl.hidden = true;
            if (emptyEl) emptyEl.hidden = false;
        } else {
            const uid = user.id;
            const loginEmail = (user.email || '').trim();

            const qUser = await sb
                .from('consultation_requests')
                .select('id, created_at, apartment, message, name, phone, email, user_id')
                .eq('user_id', uid)
                .order('created_at', { ascending: false });

            const qEmail = loginEmail
                ? await sb
                      .from('consultation_requests')
                      .select('id, created_at, apartment, message, name, phone, email, user_id')
                      .is('user_id', null)
                      .ilike('email', loginEmail)
                      .order('created_at', { ascending: false })
                : { data: [], error: null };

            if (loadingEl) loadingEl.hidden = true;

            const err = qUser.error || qEmail.error;
            if (err) {
                if (errEl) {
                    errEl.textContent =
                        '신청 내역을 불러오지 못했습니다. sql/consultation_requests_select_form_email.sql 을 Supabase에 적용했는지 확인해 주세요. (' +
                        err.message +
                        ')';
                    errEl.style.display = 'block';
                }
            } else {
                const byId = new Map();
                (qUser.data || []).forEach(function (row) {
                    byId.set(row.id, row);
                });
                (qEmail.data || []).forEach(function (row) {
                    byId.set(row.id, row);
                });
                const data = Array.from(byId.values()).sort(function (a, b) {
                    var ta = a.created_at ? new Date(a.created_at).getTime() : 0;
                    var tb = b.created_at ? new Date(b.created_at).getTime() : 0;
                    return tb - ta;
                });

                if (!data.length) {
                    if (emptyEl) emptyEl.hidden = false;
                } else {
                    data.forEach(function (row) {
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

                    const r1 = document.createElement('p');
                    r1.className = 'member-consult-item__row';
                    r1.textContent = '이름: ' + (row.name || '');
                    const r2 = document.createElement('p');
                    r2.className = 'member-consult-item__row';
                    r2.textContent =
                        '연락처: ' + (row.phone || '') + ' · ' + (row.email || '');
                    const r3 = document.createElement('p');
                    r3.className = 'member-consult-item__row';
                    r3.textContent = row.message ? '문의: ' + row.message : '문의: (내용 없음)';

                    li.appendChild(meta);
                    li.appendChild(title);
                    li.appendChild(r1);
                    li.appendChild(r2);
                    li.appendChild(r3);
                    listEl.appendChild(li);
                });
                }
            }
        }
    }
})();
