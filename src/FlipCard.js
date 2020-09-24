export default class FlipCard {
  constructor(config = {}) {
    const d = new Date();
    this.id = config.id || d.getTime() + Math.random();
    this.question = config.question || 'This is the question';
    this.answer = config.answer || 'This is the answer';
  }
}