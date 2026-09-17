# Testscope 先生向けモック

テスト結果を先生が確認するための画面モックです。テスト事業者用と共通のデザインを使用しています。

## 起動方法

Node.js 22.13.0以上が必要です。

```sh
git clone https://github.com/NaokiTakahashi19/testscope-teacher.git
cd testscope-teacher
npm ci
npm run dev -- --port 5181
```

ブラウザで http://localhost:5181 を開きます。

## 確認コマンド

```sh
npx tsc --noEmit
npm run build
```

## 主な画面

- 分析サマリー：集団の比較、指導の着眼点、解答を確認したい生徒
- 生徒別：得点・推定学力・設問別正誤の一覧、絞り込み
- 生徒詳細：留意点、クラス内の位置、領域・単元別結果、推定正答確率と実際の正誤
- 問題別：出題構成・難易度分布、正答率比較、問題・答案の確認
- 結果の推移：得点の箱ひげ図、学習段階の分布、共通生徒・特定生徒の比較
- AI相談：画面の条件を引き継ぐ回答例

## データと機能の範囲

生徒・得点・答案・学校／全受験者の集計は架空のサンプルです。IRTは仮の2PL問題パラメータとサンプル正誤からEAP学力値・信用区間・正答確率を計算しています。実データによる較正は行っていません。学習段階はサンプルであり、各回の共通尺度は未検証です。

AI・OCR・LRTの本番処理、認証・権限管理、データ保存、外部APIとの接続は実装していません。学校全体・全受験者の箱ひげ図は表示確認用の集計値です。

## 公開画面と関連リポジトリ

- 先生用画面：https://testscope-teacher-sep11.naoki-takahashi.chatgpt.site/
- テスト事業者用：https://github.com/NaokiTakahashi19/testscope

GitHubへのpushと画面の公開更新は別の操作です。このリポジトリには自動公開の設定はありません。
`.openai/hosting.json` は既存画面の公開先を識別する設定です。
