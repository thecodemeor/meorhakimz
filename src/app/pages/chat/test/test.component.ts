import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { animate } from 'animejs';

import { catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs'; // For re-throwing errors after handling

interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}

@Component({
    selector: 'app-test',
    standalone: false,
    templateUrl: './test.component.html',
    styleUrl: './test.component.scss'
})
export class TestComponent {
    
}