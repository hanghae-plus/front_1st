import { 발행기관 } from "./pubsub.js";
export class Store {
  constructor({ state, mutations, actions }) {
    this.state = 발행기관(state);
    this.mutations = mutations;
    this.actions = actions;
  }

  inputA = () => `<input id="stateA" value="${this.state.a}" size="5" />`;
  inputB = () => `<input id="stateB" value="${this.state.b}" size="5" />`;
  calculator = () => `<p>a + b = ${this.state.a + this.state.b}</p>`;

  commit(action, payload) {
    this.mutations[action](this.state, payload);
  }

}