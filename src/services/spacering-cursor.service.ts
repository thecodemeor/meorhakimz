// src/app/services/canvas-cursor.service.ts
import { Injectable, NgZone } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class SpaceringCursorService {
    private ctx!: CanvasRenderingContext2D;
    private f: any;
    private e: number = 0;
    private pos: { x: number; y: number } = { x: 0, y: 0 };
    private lines: any[] = [];
    private E = {
        debug: true,
        friction: 0.5,
        trails: 20,
        size: 50,
        dampening: 0.25,
        tension: 0.98,
    };

    constructor( private ngZone: NgZone ) {} 

    private classN = class {
        phase: number = 0;
        offset: number = 0;
        frequency: number = 0;
        amplitude: number = 0;
        value_e: number = 0;
        constructor(e: any) {
            this.init( e || {} );
        }

        init( e: any ): void {
            this.phase = e.phase || 0;
            this.offset = e.offset || 0;
            this.frequency = e.frequency || 0.001;
            this.amplitude = e.amplitude || 1;
        }

        update(): number {
            this.phase += this.frequency;
            this.value_e = this.offset + Math.sin( this.phase ) * this.amplitude;
            return this.value_e;
        }

        value(): number {
            return this.value_e;
        }
    };

    private Line = class {
        spring: number = 0;
        friction: number = 0;
        nodes: any[] = [];
        private E_ref: any;

        constructor( e: any, E_ref: any, pos_ref: any ) {
            this.E_ref = E_ref;
            this.init( e || {}, pos_ref );
        }

        init( e: any, pos_ref: any ): void {
            this.spring = e.spring + 0.1 * Math.random() - 0.02;
            this.friction = this.E_ref.friction + 0.01 * Math.random() - 0.002;
            this.nodes = [];
            for ( let t, n = 0; n < this.E_ref.size; n++ ) {
                t = new Node();
                t.x = pos_ref.x;
                t.y = pos_ref.y;
                this.nodes.push( t );
            }
        }

        update( pos_ref: any ): void {
            let e = this.spring;
            let t = this.nodes[0];
            t.vx += ( pos_ref.x - t.x ) * e;
            t.vy += ( pos_ref.y - t.y ) * e;
            for ( let n, i = 0, a = this.nodes.length; i < a; i++ ) {
                (( t = this.nodes[ i ]),
                0 < i &&
                    (( n = this.nodes[ i - 1 ]),
                    ( t.vx += ( n.x - t.x ) * e ),
                    ( t.vy += ( n.y - t.y ) * e ),
                    ( t.vx += n.vx * this.E_ref.dampening ),
                    ( t.vy += n.vy * this.E_ref.dampening )),
                ( t.vx *= this.friction ),
                ( t.vy *= this.friction ),
                ( t.x += t.vx ),
                ( t.y += t.vy ),
                ( e *= this.E_ref.tension ));
            }
        }

        draw( ctx: CanvasRenderingContext2D ): void {
            let e,
                t,
                n = this.nodes[ 0 ].x,
                i = this.nodes[ 0 ].y;
            ctx.beginPath();
            ctx.moveTo( n, i );
            for ( var a = 1, o = this.nodes.length - 2; a < o; a++ ) {
                e = this.nodes[ a ];
                t = this.nodes[ a + 1 ];
                n = 0.5 * ( e.x + t.x );
                i = 0.5 * ( e.y + t.y );
                ctx.quadraticCurveTo( e.x, e.y, n, i );
            }
            e = this.nodes[ a ];
            t = this.nodes[ a + 1 ];
            ctx.quadraticCurveTo( e.x, e.y, t.x, t.y );
            ctx.stroke();
            ctx.closePath();
        }
    };

    private Node = class {
        x: number = 0;
        y: number = 0;
        vy: number = 0;
        vx: number = 0;
    };

  private onMousemoveHandler = ( event: MouseEvent | TouchEvent ) => {

        if ( 'touches' in event ) {
            this.pos.x = event.touches[ 0 ].pageX;
            this.pos.y = event.touches[ 0 ].pageY;
        } else {
            this.pos.x = event.clientX;
            this.pos.y = event.clientY;
        }
        event.preventDefault();

        if ( this.lines.length === 0 ) {
            this.initializeLines();
            this.ngZone.runOutsideAngular( () => this.render() );
        }
    };

    private initializeLines(): void {
        this.lines = [];
        for ( let i = 0; i < this.E.trails; i++ ) {
            this.lines.push(
                new this.Line({ spring: 0.4 + ( i / this.E.trails ) * 0.025 }, this.E, this.pos )
            );
        }
    }

    // Animation loop
    private render = () => {
        if (( this.ctx as any ).running ) {
            this.ctx.globalCompositeOperation = 'source-over';
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            this.ctx.globalCompositeOperation = 'lighter';
            this.ctx.strokeStyle = `hsla( ${Math.round(
                this.f.update()
            )},50%,50%,0.2 )`;
            this.ctx.lineWidth = 1;
            for ( let i = 0; i < this.E.trails; i++ ) {
                const line = this.lines[ i ];
                line.update( this.pos );
                line.draw( this.ctx );
            }
            ( this.ctx as any ).frame++;
            window.requestAnimationFrame( this.render );
        }
    };

    // Resize canvas handler
    private resizeCanvas = () => {
        if ( this.ctx && this.ctx.canvas ) {
        this.ctx.canvas.width = window.innerWidth - 20;
        this.ctx.canvas.height = window.innerHeight;
        }
    };

    // Method to initialize the canvas and start animations
    public initializeCanvas( canvasElement: HTMLCanvasElement ): void {
        this.ctx = canvasElement.getContext( '2d' ) as CanvasRenderingContext2D;
        ( this.ctx as any ).running = true;
        ( this.ctx as any ).frame = 1;

        this.f = new this.classN({
            phase: Math.random() * 2 * Math.PI,
            amplitude: 85,
            frequency: 0.0015,
            offset: 285,
        });

        // Add event listeners
        document.addEventListener( 'mousemove', this.onMousemoveHandler );
        document.addEventListener( 'touchstart', this.onMousemoveHandler );
        document.body.addEventListener( 'orientationchange', this.resizeCanvas );
        window.addEventListener( 'resize', this.resizeCanvas );

        // Handle focus and blur
        window.addEventListener( 'focus', this.onFocus );
        window.addEventListener( 'blur', this.onBlur );

        this.resizeCanvas(); // Initial resize
    }

    private onFocus = () => {
        if ( !( this.ctx as any ).running ) {
            ( this.ctx as any ).running = true;
            this.ngZone.runOutsideAngular(() => this.render());
        }
    };

    private onBlur = () => {
        ( this.ctx as any ).running = true;
    };


    // Method to clean up event listeners and stop animation
    public destroyCanvas(): void {
        if ( this.ctx ) {
            ( this.ctx as any ).running = false;
        }

        document.removeEventListener( 'mousemove', this.onMousemoveHandler );
        document.removeEventListener( 'touchstart', this.onMousemoveHandler );
        document.body.removeEventListener( 'orientationchange', this.resizeCanvas );
        window.removeEventListener( 'resize', this.resizeCanvas );
        window.removeEventListener( 'focus', this.onFocus );
        window.removeEventListener( 'blur', this.onBlur );
    }
}

// Helper Node class (can be nested or in a separate file if complex)
class Node {
    x: number = 0;
    y: number = 0;
    vy: number = 0;
    vx: number = 0;
}