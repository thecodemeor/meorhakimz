import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
    selector: 'app-safari-puzzle',
    templateUrl: './safari-puzzle.component.html',
    styleUrl: './safari-puzzle.component.scss',
    standalone: false
})
export class SafariPuzzleComponent implements OnInit {

    ngOnInit() {
        
    }

    circles = [
        {
            label: 'A', arrow: 'a',
            pos: 0,
            loads: [
                { ball: 'a', static: 2 },
                { ball: 'a', static: 3 },
                { ball: 'a', static: 4 },
                { ball: '', static: 5 },
                { ball: 'a', static: 0 },
                { ball: 'a', static: 1 },
            ]
        },
        {
            label: 'B', arrow: 'b',
            pos: 0,
            loads: [
                { ball: 'b', static: 0 },
                { ball: 'b', static: 1 },
                { ball: 'b', static: 2 },
                { ball: 'b', static: 3 },
                { ball: '', static: 4 },
                { ball: 'b', static: 5 },
            ]
        },
        {
            label: 'C', arrow: 'c',
            pos: 0,
            loads: [
                { ball: '', static: 5 },
                { ball: 'c', static: 0 },
                { ball: 'c', static: 1 },
                { ball: 'c', static: 2 },
                { ball: 'c', static: 3 },
                { ball: 'c', static: 4 },
            ]
        },
        {
            label: 'D', arrow: 'd',
            pos: 0,
            loads: [
                { ball: 'd', static: 3 },
                { ball: '', static: 4 },
                { ball: 'd', static: 5 },
                { ball: 'd', static: 0 },
                { ball: 'd', static: 1 },
                { ball: 'd', static: 2 },
            ]
        }
    ]

    clickAllowed: boolean = true
    arrowClick( i: number, target: string, direction: string, force = false ) {
        if ( !this.clickAllowed && !force ) { return }
        if ( !force ) {
            this.clickAllowed = false;
            setTimeout(() => this.clickAllowed = true, 1000);
        }
        if ( direction === 'left' ) {
            this.circles[ i ].pos++
            for ( const load of this.circles[ i ].loads ) {
                load.static = ( load.static - 1 + 6 ) % 6
            }
        } else {
            this.circles[ i ].pos--
            for ( const load of this.circles[ i ].loads ) {
                load.static = ( load.static + 1 ) % 6
            }
        }
        this.rotatingCircle( i )
        this.clockwiseUpCheck()
    }

    rotatingCircle( i: number ) {
        const rotate = this.circles[ i ].pos
        return `${ -60 * rotate }deg`
    }

    clockwiseUpCheck() {
        setTimeout(() => {
            this.checkTransfer( 0, 5, 1, 0 );
            this.checkTransfer( 1, 4, 2, 0 );
            this.checkTransfer( 2, 5, 3, 0 );
            this.checkTransfer( 3, 4, 0, 0 );
            this.checkTransfer( 1, 5, 3, 5 );
            this.checkSolution();
        }, 800);
    }

    checkTransfer( froLet: number, froStatic: number, towLet: number, towStatic: number ) {
        const froEle = this.circles[ froLet ].loads.find( (x) => x.static === froStatic )
        const towEle = this.circles[ towLet ].loads.find( (x) => x.static === towStatic )
        if ( froEle && towEle ) {
            if ( froEle.ball !== '' && towEle.ball === '' ) {
                towEle.ball = froEle.ball;
                froEle.ball = '';
            }
        }
    }

    solution: string = 'SOLVED'
    checkSolution() {
        this.solution = 'SOLVED'
        for ( const circle of this.circles ) {
            for ( const load of circle.loads ) {
                if ( load.ball !== '' && circle.label.toLowerCase() !== load.ball ) {
                    this.solution = 'UNSOLVED'
                }
            }
        }
    }

    shuffle( times = 10, delay = 10 ) {
        let count = 0;
        const interval = setInterval( () => {
            const randomIndex = Math.floor( Math.random() * this.circles.length);
            const randomDir = Math.random() > 0.5 ? 'left' : 'right';
            this.arrowClick( randomIndex, '', randomDir, true );
            count++;
            if ( count >= times ) {
                clearInterval( interval );
            }
        }, delay );
    }
}

    // const shuffleBtn = document.querySelector('.shuffle');
    // shuffleBtn.addEventListener('click', () => shuffle( 800 ) );

    
// }