// 答え合わせの機能（汎用版）
// answerWord: 正解のキーワード
// nextUrl: 正解した時に飛ぶページのURL
function checkAnswer(answerWord, nextUrl) {
    
    // 1. 入力された文字を取得する
    const input = document.getElementById("user-password").value;

    // 2. 判定する（入力と正解が同じなら）
    if (input === answerWord) {
        // 正解の場合
        alert("正解！次のステージへ進みます！");
        // 指定された次のページへ移動
        window.location.href = nextUrl; 
    } else {
        // 不正解の場合
        alert("不正解です…もう一度！");
    }
}


/* --- ギャラリー拡大表示＆スライドショー機能 --- */

let currentIndex = 0; // 今何番目の画像を見ているか覚える変数

// 画像をクリックした時に動く
function openModal(element) {
    const modal = document.getElementById("imageModal");
    const expandedImg = document.getElementById("expandedImg");
    const thumbnails = document.querySelectorAll('.thumbnail'); // 全部のサムネイルを取得
    
    // クリックされた画像が、全体の何番目かを探す
    // （Array.fromを使ってリスト配列に変換してから探しています）
    currentIndex = Array.from(thumbnails).indexOf(element);

    // 隠していた画面を表示する
    modal.style.display = "block";
    
    // 画像を表示する
    showImage();
}

// 閉じるボタンを押した時に動く
function closeModal() {
    document.getElementById("imageModal").style.display = "none";
}

// 次へ・前へボタンを押した時に動く
function changeImage(n) {
    // 番号を進めたり戻したりする
    currentIndex += n;
    showImage();
}

// 画像を実際に表示する処理（名前表示機能つき）
function showImage() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const expandedImg = document.getElementById("expandedImg");
    const captionText = document.getElementById("caption"); // ★名前を表示する場所を取得

    // もし最後の画像の次に行こうとしたら、最初に戻る
    if (currentIndex >= thumbnails.length) {
        currentIndex = 0;
    }
    // もし最初の画像の前に戻ろうとしたら、最後に行く
    if (currentIndex < 0) {
        currentIndex = thumbnails.length - 1;
    }

    // 1. 画像のURLをセットする
    expandedImg.src = thumbnails[currentIndex].src;
    
    // 2. ★埋め込んでおいた「作者名」をセットする
    captionText.innerHTML = thumbnails[currentIndex].dataset.author;
}

/* --- SNSシェア機能 --- */

// ★公開したら、ここを「あなたのサイトのURL」に書き換えてください！
const siteUrl = "https://example.com"; 

// ★シェアされた時の文章（ハッシュタグもここに書く）
const shareText = "クロスワードを解いて、1周年記念プレゼントを救出しました！🗝️✨ #解問ハテナ1周年 #ミンナノ1stAnniversary";

// 1. X（Twitter）にポストする機能
function shareToX() {
    // Xの投稿画面のURLを作る
    const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(siteUrl)}`;
    
    // 新しいタブで開く
    window.open(xUrl, '_blank');
}

// 2. リンクと文章をクリップボードにコピーする機能
function copyLink() {
    // コピーする文字を作る（文章 + URL）
    const copyText = `${shareText} ${siteUrl}`;
    
    // クリップボードに書き込む
    navigator.clipboard.writeText(copyText).then(() => {
        alert("リンクをコピーしました！");
    }).catch(err => {
        alert("コピーに失敗しました…");
    });
}