import { 발행기관 } from "./pubsub";

export class Store {
  constructor({ state, mutations, actions }) {
    this.state = 발행기관(state);
    this.mutations = mutations;
    this.actions = actions;
  }

  commit(action, payload) {
    const mutation = this.mutations[action];

    if (!mutation || typeof mutation !== "function") return;

    mutation(this.state, payload);
  }
}
