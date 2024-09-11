# 고시원 관리 프로그램

TODO List

1. Container 나누기
   header - buildingInfos - layerInfos - roomInfos container

2. 건물 - 층 - 방정보 순으로 layer 정렬

(1) buildingInfos 표시
(2) XX 건물 클릭 > buildingInfos hidden, layerInfos 표시
(3) XX 층 클릭 > layerInfos 유지, layerInfos 아래 해당 층의 roomInfos 출력

3. roomInfos 정리

roomInfos(전체 방정보)는 각각의 roomInfo(XX호)로 이루어짐

roomInfo는 호수, 세입자 정보, 입실, 퇴실, 입급 날짜 정보를 가짐

기본적으로 호수, 입실, 퇴실, 입금날짜 표시

roomInfo 클릭 시 세입자 정보 표시, 수정버튼 표시

수정버튼 클릭 시 > roomInfo 수정 창 발생(addRoomInfo와 동일한 팝업 창)

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json', './tsconfig.app.json'],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
