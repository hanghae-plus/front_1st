export class Store {
  constructor({ state, mutations, actions }) {
    console.log({ state: state });
  }

  commit(action, payload) {}
}
