import { Injectable } from '@nestjs/common';

export interface RootResponse {
  ok: boolean;
}

@Injectable()
export class AppService {
  getRoot(): RootResponse {
    return { ok: true };
  }
}
