# SHINWA｜株式会社芯和精工

![SHINWA コーポレートサイト](assets/images/ogp-shinwa.jpg)

架空の精密加工会社「株式会社芯和精工」を題材に制作した、ポートフォリオ用コーポレートサイトです。

「図面完成後に発注先を探す」のではなく、材質・形状・工程が固まる前から加工技術者へ相談できる会社として設計しました。

> このサイトに登場する企業、加工実績、人物、設備情報はポートフォリオ用の架空設定です。実在する企業や実績を示すものではありません。

## Live Site

[https://coconattsu0723.github.io/shinwa-seiko-corporate-site/](https://coconattsu0723.github.io/shinwa-seiko-corporate-site/)

## Concept

**精度の中心に、対話がある。**

加工設備の技術力だけでなく、設計者と加工技術者が早い段階から相談し、条件を整理していく姿勢をブランドの中心に置きました。Primary CTAは全ページで「加工について相談する」に統一しています。

## Pages

- HOME
- 技術・設備
- 加工実績
- 実績詳細
- 会社案内
- お問い合わせ
- プライバシーポリシー
- 404エラーページ

## Key Features

- 1440px Desktopから375px Mobileまで対応するレスポンシブ設計
- Semantic Custom Propertiesによるカラー、文字、余白、寸法の一元管理
- 全面写真と40%ネイビーカバーを共通化したページHero
- URLと履歴に同期する加工実績の材料フィルターとEmpty State
- 一時停止操作とReduced Motionに対応した設備ギャラリー
- Fine Pointer環境だけで動作する素材画像・加工実績画像のHover表現
- Input／Error／Confirm／Completeを確認できるお問い合わせデモ
- Keyboard操作、Visible Focus、Skip Link、見出し構造を考慮した実装
- `prefers-reduced-motion`へ対応したアニメーション制御

## Contact Demo

お問い合わせページはポートフォリオ用の画面遷移デモです。入力内容や添付ファイルの送信、保存、受付は行いません。

## Technologies

- HTML5
- CSS3
- Vanilla JavaScript
- Pencil
- SVG / WebP / JPEG

FrameworkやUI Libraryを使わず、ページ構造、Component、状態管理、Responsive対応をHTML・CSS・JavaScriptで実装しています。

## Project Structure

```text
shinwa-seiko-corporate-site/
├── index.html
├── 404.html
├── pages/
│   ├── technology.html
│   ├── works.html
│   ├── work-detail.html
│   ├── company.html
│   ├── contact.html
│   └── privacy.html
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
├── .gitignore
└── README.md
```

Pencilの正本、生成元画像、検討資料、内部制作記録はローカルで管理し、公開リポジトリには含めていません。

## Local Preview

プロジェクトルートでローカルサーバーを起動します。

```bash
python3 -m http.server 4173
```

ブラウザで `http://127.0.0.1:4173/` を開いて確認できます。

## Design and Implementation Notes

- ブランドカラーは Shinwa Navy `#102A43`
- 日本語書体は `Noto Sans JP`
- ロゴ、写真、コピーは本作品用に制作
- 写真・加工品ビジュアルには生成画像を含む
- 加工実績は構成確認用の架空事例であり、実在企業の加工性能を示すものではない
- 会社所在地は愛知県豊田市までの架空設定。地図は豊田市の代表地点であり、会社所在地ではない

## Quality Assurance

以下の幅で全ページのレイアウト、画像、主要操作、横方向のはみ出しを確認しています。

`375 / 390 / 768 / 1024 / 1366 / 1440 px`

公開後はGitHub Pages上でリンク、404、OGP、外部地図、主要ブラウザを再確認します。
