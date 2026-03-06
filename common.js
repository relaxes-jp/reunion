/**
 * 共通JS 
 * 「登録・更新」、「検索」、「ダウンロード」用HTMLでインポートする
 */

const GAS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbwGgEqEC8lclUn6OBid-snBEPxkgwJr7vzgPOhuPzoHBdV7jj3bt1o80p8hR5sSxEd1uQ/exec';

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
