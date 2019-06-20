import * as uuid from 'uuid';

export class VirtualMachine {
  id: string;

  hostName: string;

  ip?: string;

  owner?: string;

  status?: string;

  description?: string;

  constructor() {
    this.id = uuid.v4();

    this.status = 'FREE';
  }
}
