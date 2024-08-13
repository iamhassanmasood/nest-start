import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  firstCheck(): string {
    return 'Test 1';
  }

  secondCheck(): string {
    return 'Test 2';
  }
}
