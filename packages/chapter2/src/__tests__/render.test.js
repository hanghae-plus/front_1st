import { describe, expect, test } from "vitest";
import { jsx, render } from "../render";

describe("render > ", () => {
  describe("첫 번째 렌더링 테스트", () => {
    test("한 개의 태그를 렌더링할 수 있다.", () => {
      const App = jsx("div", null, "div의 children 입니다.");

      const $root = document.createElement("div");
      render($root, App);

      expect($root.innerHTML).toBe(`<div>div의 children 입니다.</div>`);
    });

    test("props를 추가할 수 있다.", () => {
      const App = jsx(
        "div",
        { id: "test-id", class: "test-class" },
        "div의 children 입니다."
      );

      const $root = document.createElement("div");
      render($root, App);

      expect($root.innerHTML).toBe(
        `<div id="test-id" class="test-class">div의 children 입니다.</div>`
      );
    });

    test("자식 노드를 표현할 수 있다.", () => {
      const App = jsx(
        "div",
        { id: "test-id", class: "test-class" },
        jsx("p", null, "첫 번째 문단"),
        jsx("p", null, "두 번째 문단")
      );

      const $root = document.createElement("div");
      render($root, App);

      expect($root.innerHTML).toBe(
        `<div id="test-id" class="test-class"><p>첫 번째 문단</p><p>두 번째 문단</p></div>`
      );
    });
  });

  describe("리렌더링 테스트 - 변경된 내용만 반영되도록 한다.", () => {
    test("하위 노드 추가", () => {
      const $root = document.createElement("div");

      const App = jsx(
        "div",
        { id: "test-id", class: "test-class" },
        jsx("p", null, "첫 번째 문단"),
        jsx("p", null, "두 번째 문단")
      );

      render($root, App);

      expect($root.innerHTML).toBe(
        `<div id="test-id" class="test-class"><p>첫 번째 문단</p><p>두 번째 문단</p></div>`
      );

      const children = [...$root.querySelectorAll("p")];

      render(
        $root,
        jsx(
          "div",
          { id: "test-id", class: "test-class" },
          jsx("p", null, "첫 번째 문단"),
          jsx("p", null, "두 번째 문단"),
          jsx("p", null, "세 번째 문단")
        ),
        App
      );

      expect($root.innerHTML).toBe(
        `<div id="test-id" class="test-class"><p>첫 번째 문단</p><p>두 번째 문단</p><p>세 번째 문단</p></div>`
      );

      const newChildren = [...$root.querySelectorAll("p")];

      expect(children[0]).toBe(newChildren[0]);
      expect(children[1]).toBe(newChildren[1]);
      expect(children[2]).not.toBe(newChildren[2]);
    });

    test("props 수정", () => {
      const $root = document.createElement("div");
      const App = jsx(
        "div",
        { id: "test-id", class: "test-class" },
        jsx("p", null, "첫 번째 문단"),
        jsx("p", null, "두 번째 문단")
      );

      render($root, App);

      expect($root.innerHTML).toBe(
        `<div id="test-id" class="test-class"><p>첫 번째 문단</p><p>두 번째 문단</p></div>`
      );

      const children = [...$root.querySelectorAll("p")];

      render(
        $root,
        jsx(
          "div",
          null,
          jsx("p", null, "첫 번째 문단"),
          jsx("p", null, "두 번째 문단")
        ),
        App
      );

      expect($root.innerHTML).toBe(
        `<div><p>첫 번째 문단</p><p>두 번째 문단</p></div>`
      );

      const newChildren = [...$root.querySelectorAll("p")];

      expect(children[0]).toBe(newChildren[0]);
      expect(children[1]).toBe(newChildren[1]);
    });

    test("App이 2개 이상의 자식을 가지는 경우", () => {
      const $root = document.createElement("div");

      // ! 자식 노드 수가 2개인 경우
      const App = jsx(
        "div",
        { id: "test-id", class: "test-class" },
        jsx(
          "p",
          null,
          jsx("div", null, "test 1-1"),
          jsx("div", null, "test 1-2"),
          jsx("div", null, "test 1-3"),
          jsx("div", null, "test 1-4")
        ),
        jsx(
          "p",
          null,
          jsx("div", null, "test 2-1"),
          jsx("div", null, "test 2-2"),
          jsx("div", null, "test 2-3"),
          jsx("div", null, "test 2-4")
        )
      );

      const newApp = jsx(
        "div",
        { id: "test-id", class: "test-class" },
        jsx(
          "p",
          null,
          jsx("div", null, "test 1-1"),
          jsx("div", null, "test 1-2"),
          jsx("div", null, "test 1-3"),
          jsx("div", null, "test 1-4")
        ),
        jsx(
          "div",
          null,
          jsx("div", null, "test 2-1"),
          jsx("div", null, "test 2-2"),
          jsx("div", null, "test 2-3"),
          jsx("div", null, "test 2-4")
        )
      );

      render($root, App);

      expect($root.innerHTML).toBe(
        `<div id="test-id" class="test-class"><p><div>test 1-1</div><div>test 1-2</div><div>test 1-3</div><div>test 1-4</div></p><p><div>test 2-1</div><div>test 2-2</div><div>test 2-3</div><div>test 2-4</div></p></div>`
      );

      render($root, newApp, App);

      expect($root.innerHTML).toBe(
        `<div id="test-id" class="test-class"><p><div>test 1-1</div><div>test 1-2</div><div>test 1-3</div><div>test 1-4</div></p><div><div>test 2-1</div><div>test 2-2</div><div>test 2-3</div><div>test 2-4</div></div></div>`
      );

      // ! 자식 노드 수가 3개인 경우
      const newApp2 = jsx(
        "div",
        { id: "test-id", class: "test-class" },
        jsx(
          "p",
          null,
          jsx("div", null, "test 1-1"),
          jsx("div", null, "test 1-2"),
          jsx("div", null, "test 1-3"),
          jsx("div", null, "test 1-4")
        ),
        jsx(
          "div",
          null,
          jsx("div", null, "test 2-1"),
          jsx("div", null, "test 2-2"),
          jsx("div", null, "test 2-3"),
          jsx("div", null, "test 2-4")
        ),
        jsx(
          "div",
          null,
          jsx("div", null, "test 2-1"),
          jsx("div", null, "test 2-2"),
          jsx("div", null, "test 2-3"),
          jsx("div", null, "test 2-4")
        )
      );

      render($root, newApp2, newApp);

      expect($root.innerHTML).toBe(
        `<div id="test-id" class="test-class"><p><div>test 1-1</div><div>test 1-2</div><div>test 1-3</div><div>test 1-4</div></p><div><div>test 2-1</div><div>test 2-2</div><div>test 2-3</div><div>test 2-4</div></div><div><div>test 2-1</div><div>test 2-2</div><div>test 2-3</div><div>test 2-4</div></div></div>`
      );
    });
  });
});
