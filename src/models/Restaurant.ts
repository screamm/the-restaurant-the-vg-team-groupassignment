export class Restaurant {
    constructor(
        public name: string,
        public address: {
            street: string,
            zip: string,
            city: string
        }
    ){}
  }