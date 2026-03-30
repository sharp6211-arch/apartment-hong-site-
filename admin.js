(function () {
    function isAdminEmail(email) {
        if (!email || typeof CONFIG === 'undefined' || !CONFIG.ADMIN_EMAILS) return false;
        var list = CONFIG.ADMIN_EMAILS;
        if (!list.length) return false;
        var e = String(email).trim().toLowerCase();
        return list.some(function (a) {
            return a && String(a).trim().toLowerCase() === e;
        });
    }

    /** Supabase JWT의 app_metadata / user_metadata.role === 'admin' 이면 관리자 */
    function isAdminByMetadata(user) {
        if (!user) return false;
        var am = user.app_metadata && user.app_metadata.role;
        var um = user.user_metadata && user.user_metadata.role;
        return am === 'admin' || um === 'admin';
    }

    function isAdminUser(user) {
        if (!user) return false;
        if (isAdminByMetadata(user)) return true;
        return isAdminEmail(user.email || '');
    }

    var loadingEl = document.getElementById('adminLoading');
    var forbiddenEl = document.getElementById('adminForbidden');
    var emptyEl = document.getElementById('adminEmpty');
    var tableWrap = document.getElementById('adminTableWrap');
    var tableBody = document.getElementById('adminTableBody');
    var errEl = document.getElementById('adminError');
    var sessionEmailEl = document.getElementById('adminSessionEmail');
    var leadEl = document.getElementById('adminLead');

    var body = document.body;
    var themeToggle = document.getElementById('themeToggle');
    var savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        if (themeToggle) themeToggle.textContent = '☀️';
    }
    var logoutBtn = document.getElementById('adminLogoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async function () {
            if (typeof ApartmentAuth !== 'undefined' && ApartmentAuth.signOut) {
                await ApartmentAuth.signOut();
            }
            window.location.href = 'index.html';
        });
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

    function showForbidden(msg) {
        if (loadingEl) loadingEl.hidden = true;
        if (forbiddenEl) {
            forbiddenEl.hidden = false;
            forbiddenEl.style.display = 'block';
            forbiddenEl.textContent = msg;
        }
        if (leadEl) leadEl.textContent = '';
    }

    (async function () {
        if (typeof ApartmentAuth === 'undefined' || !ApartmentAuth.init) {
            window.location.replace('index.html');
            return;
        }
        await ApartmentAuth.init();

        if (!ApartmentAuth.isSupabaseConfigured || !ApartmentAuth.isSupabaseConfigured()) {
            showForbidden('config.js에 Supabase 설정이 없습니다.');
            return;
        }

        var sb = ApartmentAuth.getSupabaseClient && ApartmentAuth.getSupabaseClient();
        if (!sb) {
            showForbidden('Supabase 클라이언트를 만들 수 없습니다.');
            return;
        }

        var gu = await sb.auth.getUser();
        if (gu.error || !gu.data || !gu.data.user) {
            window.location.replace('index.html');
            return;
        }
        var user = gu.data.user;

        var email = user.email || '';
        if (sessionEmailEl) sessionEmailEl.textContent = email;

        if (!isAdminUser(user)) {
            showForbidden(
                '이 페이지는 관리자만 이용할 수 있습니다.\n\n' +
                    '현재 로그인 이메일: ' +
                    (email || '(없음)') +
                    '\n\n' +
                    '해결 방법(택1):\n' +
                    '1) Supabase → Authentication → Users → 본인 계정 → App Metadata 에 JSON: {"role":"admin"} 추가 후, sql/admin_consultation_select.sql 최신본을 SQL Editor에서 실행\n' +
                    '2) config.js의 ADMIN_EMAILS에 위 이메일을 넣고, 같은 이메일이 sql/admin_consultation_select.sql 의 IN (...) 안에도 있게 하기\n\n' +
                    'App Metadata를 쓴 경우 저장 후 로그아웃했다가 다시 로그인하면 반영됩니다.'
            );
            return;
        }

        var q = await sb
            .from('consultation_requests')
            .select('id, created_at, name, phone, email, apartment, message, user_id')
            .order('created_at', { ascending: false });

        if (loadingEl) loadingEl.hidden = true;

        if (q.error) {
            if (errEl) {
                errEl.style.display = 'block';
                errEl.textContent =
                    '목록을 불러오지 못했습니다. sql/admin_consultation_select.sql 을 적용했는지 확인하세요. (' +
                    q.error.message +
                    ')';
            }
            return;
        }

        var rows = q.data || [];
        if (rows.length === 0) {
            if (emptyEl) emptyEl.hidden = false;
            return;
        }

        if (tableWrap) tableWrap.hidden = false;
        if (!tableBody) return;

        rows.forEach(function (row) {
            var tr = document.createElement('tr');
            var tdDate = document.createElement('td');
            tdDate.textContent = row.created_at
                ? new Date(row.created_at).toLocaleString('ko-KR')
                : '';
            var tdKind = document.createElement('td');
            tdKind.textContent = row.user_id ? '회원' : '비회원';
            var tdName = document.createElement('td');
            tdName.textContent = row.name || '';
            var tdPhone = document.createElement('td');
            tdPhone.textContent = row.phone || '';
            var tdEmail = document.createElement('td');
            tdEmail.textContent = row.email || '';
            var tdApt = document.createElement('td');
            tdApt.textContent = row.apartment || '';
            var tdMsg = document.createElement('td');
            tdMsg.className = 'admin-table__msg';
            tdMsg.textContent = row.message || '(없음)';

            tr.appendChild(tdDate);
            tr.appendChild(tdKind);
            tr.appendChild(tdName);
            tr.appendChild(tdPhone);
            tr.appendChild(tdEmail);
            tr.appendChild(tdApt);
            tr.appendChild(tdMsg);
            tableBody.appendChild(tr);
        });
    })();
})();
