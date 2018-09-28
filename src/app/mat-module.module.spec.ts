import { MatModuleModule } from './mat-module.module';

describe('MatModuleModule', () => {
  let matModuleModule: MatModuleModule;

  beforeEach(() => {
    matModuleModule = new MatModuleModule();
  });

  it('should create an instance', () => {
    expect(matModuleModule).toBeTruthy();
  });
});
