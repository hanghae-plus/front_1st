import { 발행기관 } from "./pubsub";

export class Store {
  constructor({ state, mutations, actions }) {
    this.state = 발행기관(state);
    this.mutations = mutations;
    this.action = actions;
  }

  commit(action, payload) {
    const mutations = this.mutations[action];
    mutations(this.state, payload);
  }
}
