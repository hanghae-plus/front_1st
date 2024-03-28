import { 발행기관 } from './pubsub';

export class Store {
  nowState;
  mutations;
  actions;
  state = {};

  constructor({ state, mutations, actions }) {
    this.nowState = 발행기관(state);
    this.mutations = mutations;
    this.actions = actions;

    Object.keys(state).forEach((key) => {
      Object.defineProperty(this.state, key, {
        get: () => this.nowState[key],
      });
    });
  }

  commit(action, payload) {
    this.mutations[action](this.nowState, payload);
  }
}
