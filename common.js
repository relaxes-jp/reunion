/**
 * 共通JS 
 * 「登録・更新」、「検索」、「ダウンロード」用HTMLでインポートする
 */

const GAS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbwGgEqEC8lclUn6OBid-snBEPxkgwJr7vzgPOhuPzoHBdV7jj3bt1o80p8hR5sSxEd1uQ/exec';

/**
 * LIFF初期化とグループアクセス権限のチェックを行う共通関数
 * @returns {Promise<{profile: Object, context: Object} | null>}
 */
async function initializeAndValidateAccess(myLiffId) {
    try {
        console.log("initializeAndValidateAccess:", myLiffId);
        // 1. LIFF初期化
        await liff.init({ liffId: myLiffId });

        const receivedKey = getAccessKey();
        
        console.log("URLから取得したID:", receivedKey);

        if (!liff.isLoggedIn()) { liff.login(); return null; }

        const profile = await liff.getProfile();

        // 2. GASから許可されたグループIDを取得（サイレント同期含む）
        const result = await postToGas({ 
            reqType: 'checkAuth', 
            userId: profile.userId, 
            accessToken: receivedKey
        });

        const isAccepted = result.isAccepted === 'true';
        console.log("isAccepted:", isAccepted);

        // 3. 権限チェック
        if (!isAccepted) {
            console.warn("Access Denied: Don't Acceped");
            showErrorPage();
            return null;
        }

        // 4. OKならコンテンツ表示
        showMainContent();
        return { profile, context, receivedKey };

    } catch (error) {
        console.error("Initialization failed:", error);
        showErrorPage();
        return null;
    }
}

/**
 * URLパラメータ取得
 */
function getAccessKey() {
    const params = new URLSearchParams(window.location.search);
    return params.get('key');
}

/**
 * メインコンテンツ表示関数
 */
function showMainContent() {
    const app = document.getElementById('app-content');
    const err = document.getElementById('error-message');
    if (app) app.style.display = 'block';
    if (err) err.style.display = 'none';
}

/**
 * エラーメッセージ表示関数
 */
function showErrorPage() {
    const app = document.getElementById('app-content');
    const err = document.getElementById('error-message');
    if (app) app.style.display = 'none';
    if (err) err.style.display = 'block';
}

/**
 * GASへ通信する共通関数
 */
async function postToGas(data) {
    const response = await fetch(GAS_WEB_APP_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
}

/**
 * LIFF終了処理（外部ブラウザ配慮）
 */
function closeLiff(successMsg) {
    alert(successMsg);
    if (liff.isInClient()) {
        liff.closeWindow();
    } else {
        alert('外部ブラウザのため、手動でタブを閉じてください。');
    }
}
