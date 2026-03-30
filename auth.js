(function (global) {
    var LEGACY_KEY = 'apartment_auth_session';

    var supabaseClient = null;
    var cachedSession = null;
    var initPromise = null;

    function getConfig() {
        if (typeof CONFIG === 'undefined') return null;
        return {
            url: CONFIG.SUPABASE_URL,
            key: CONFIG.SUPABASE_ANON_KEY
        };
    }

    function isPlaceholder(s) {
        if (!s || typeof s !== 'string') return true;
        return /^YOUR_/i.test(s) || /^placeholder$/i.test(s.trim());
    }

    function isConfigured() {
        var c = getConfig();
        if (!c || !c.url || !c.key) return false;
        if (isPlaceholder(c.url) || isPlaceholder(c.key)) return false;
        return true;
    }

    function createSupabaseClient() {
        var lib = global.supabase;
        if (!lib || !lib.createClient) return null;
        var c = getConfig();
        if (!c) return null;
        return lib.createClient(c.url, c.key, {
            auth: {
                persistSession: true,
                autoRefreshToken: true,
                detectSessionInUrl: true,
                storage: global.localStorage
            }
        });
    }

    function init() {
        if (initPromise) return initPromise;
        initPromise = (async function () {
            if (!isConfigured()) {
                supabaseClient = null;
                cachedSession = null;
                return;
            }
            supabaseClient = createSupabaseClient();
            if (!supabaseClient) return;
            var result = await supabaseClient.auth.getSession();
            cachedSession = result.data.session;
            supabaseClient.auth.onAuthStateChange(function (_event, session) {
                cachedSession = session;
            });
        })();
        return initPromise;
    }

    function getSession() {
        if (cachedSession && cachedSession.user) {
            return { email: cachedSession.user.email, at: Date.now() };
        }
        try {
            var raw = global.localStorage.getItem(LEGACY_KEY) || global.sessionStorage.getItem(LEGACY_KEY);
            if (!raw) return null;
            return JSON.parse(raw);
        } catch (e) {
            return null;
        }
    }

    function isLoggedIn() {
        if (cachedSession && cachedSession.user) return true;
        if (isConfigured()) return false;
        var s = getSession();
        return !!(s && s.email);
    }

    async function signInWithPassword(email, password) {
        await init();
        if (!supabaseClient) {
            throw new Error('Supabase URL·Anon 키를 config.js에 설정해 주세요.');
        }
        var result = await supabaseClient.auth.signInWithPassword({
            email: email.trim(),
            password: password
        });
        if (result.error) throw result.error;
        cachedSession = result.data.session;
        global.localStorage.removeItem(LEGACY_KEY);
        global.sessionStorage.removeItem(LEGACY_KEY);
        return result.data;
    }

    async function signUpWithPassword(email, password) {
        await init();
        if (!supabaseClient) {
            throw new Error('Supabase URL·Anon 키를 config.js에 설정해 주세요.');
        }
        var origin = global.location.origin || '';
        var result = await supabaseClient.auth.signUp({
            email: email.trim(),
            password: password,
            options: {
                emailRedirectTo: origin + '/'
            }
        });
        if (result.error) throw result.error;
        if (result.data.session) {
            cachedSession = result.data.session;
        }
        global.localStorage.removeItem(LEGACY_KEY);
        global.sessionStorage.removeItem(LEGACY_KEY);
        return result.data;
    }

    async function signOut() {
        await init();
        if (supabaseClient) {
            await supabaseClient.auth.signOut();
        }
        cachedSession = null;
        global.localStorage.removeItem(LEGACY_KEY);
        global.sessionStorage.removeItem(LEGACY_KEY);
    }

    async function clearSession() {
        await signOut();
    }

    async function resetPasswordForEmail(email) {
        await init();
        if (!supabaseClient) {
            throw new Error('Supabase URL·Anon 키를 config.js에 설정해 주세요.');
        }
        var redirectTo = global.location.origin + global.location.pathname;
        return supabaseClient.auth.resetPasswordForEmail(email.trim(), { redirectTo: redirectTo });
    }

    function getSupabaseClient() {
        return supabaseClient;
    }

    global.ApartmentAuth = {
        init: init,
        getSession: getSession,
        isLoggedIn: isLoggedIn,
        getSupabaseClient: getSupabaseClient,
        signInWithPassword: signInWithPassword,
        signUpWithPassword: signUpWithPassword,
        signOut: signOut,
        clearSession: clearSession,
        resetPasswordForEmail: resetPasswordForEmail,
        isSupabaseConfigured: isConfigured
    };
})(window);
