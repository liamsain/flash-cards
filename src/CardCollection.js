export default class CardCollection {
  constructor(config) {
    const d = new Date();
    this.id = config.id || d.getTime() + Math.random();
    this.name = config.name || '';
    this.cards = config.cards || [];
  }
}