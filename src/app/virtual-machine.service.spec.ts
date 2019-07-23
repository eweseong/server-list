import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { MessageService } from './message.service';
import { VirtualMachineService } from './virtual-machine.service';

describe('VirtualMachineService', () => {
  const mockVMs = [
    { id: '1', hostName: 'aaa' },
    { id: '2', hostName: 'bbb' },
  ];

  let vmService: VirtualMachineService;
  let httpMock: HttpTestingController;
  let messageServiceSpy: jasmine.SpyObj<MessageService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('MessageService', ['add', 'prompt']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule],
      providers: [VirtualMachineService, { provide: MessageService, useValue: spy }],
    });
    vmService = TestBed.get(VirtualMachineService);
    httpMock = TestBed.get(HttpTestingController);
    messageServiceSpy = TestBed.get(MessageService);
  });

  it('should be created', () => {
    expect(vmService).toBeTruthy();
  });

  describe('#getServers', () => {
    it('should return an Observable<VirtualMachine[]>', () => {
      vmService.getServers().subscribe((vms) => {
        expect(vms.length).toBe(2);
        expect(vms).toEqual(mockVMs);
      });

      const req = httpMock.expectOne(vmService.serverURI);
      expect(req.request.method).toBe('GET');
      req.flush(mockVMs);
    });

    it('should handle error response when target server is down', () => {
      expect(messageServiceSpy.add.calls.count()).toBe(0);
      vmService.getServers().subscribe(() => {
        expect(messageServiceSpy.add.calls.count()).toBe(1);
        expect(messageServiceSpy.add).toHaveBeenCalledWith('No response from server, please contact system admin to investigate the issue');
      });

      httpMock.expectOne(vmService.serverURI).error(new ErrorEvent('network error'));
    });
  });

  describe('#getControllers', () => {
    it('should return an Observable<VirtualMachine[]>', () => {
      vmService.getControllers().subscribe((vms) => {
        expect(vms.length).toBe(2);
        expect(vms).toEqual(mockVMs);
      });

      const req = httpMock.expectOne(vmService.controllerURI);
      expect(req.request.method).toBe('GET');
      req.flush(mockVMs);
    });

    it('should handle error response when target server is down', () => {
      expect(messageServiceSpy.add.calls.count()).toBe(0);
      vmService.getControllers().subscribe(() => {
        expect(messageServiceSpy.add.calls.count()).toBe(1);
        expect(messageServiceSpy.add).toHaveBeenCalledWith('No response from server, please contact system admin to investigate the issue');
      });

      httpMock.expectOne(vmService.controllerURI).error(new ErrorEvent('network error'));
    });
  });

  describe('#exportServers', () => {
    it('should prompt message when exported successfully', () => {
      expect(messageServiceSpy.prompt.calls.count()).toBe(0);
      vmService.exportServers(mockVMs).subscribe(() => {
        expect(messageServiceSpy.prompt.calls.count()).toBe(1);
        expect(messageServiceSpy.prompt).toHaveBeenCalledWith('exported successfully');
      });

      const req = httpMock.expectOne(`${vmService.serverURI}export`);
      expect(req.request.method).toBe('POST');
      req.flush('exported successfully');
    });
  });

  describe('#exportControllers', () => {
    it('should prompt message when exported successfully', () => {
      expect(messageServiceSpy.prompt.calls.count()).toBe(0);
      vmService.exportControllers(mockVMs).subscribe(() => {
        expect(messageServiceSpy.prompt.calls.count()).toBe(1);
        expect(messageServiceSpy.prompt).toHaveBeenCalledWith('exported successfully');
      });

      const req = httpMock.expectOne(`${vmService.controllerURI}export`);
      expect(req.request.method).toBe('POST');
      req.flush('exported successfully');
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
