import { Component, Input, OnInit, ElementRef, Renderer2 } from '@angular/core';

// External Service
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { curveLinearClosed } from 'd3-shape';

@Component({
    selector: 'app-set-skills',
    standalone: false,
    templateUrl: './set-skills.component.html',
    styleUrl: './set-skills.component.scss'
})
export class SetSkillsComponent implements OnInit {
    
    view: [number, number] = [700, 400];
    ngOnInit() {}

    // === Programming Chart === //
    programming = [
        { name: 'HTML5', value: 98 },
        { name: 'CSS3', value: 93 },
        { name: 'JavaScript', value: 46 },
        { name: 'Typescript', value: 73 },
        { name: 'Angular', value: 55 },
        { name: 'SCSS', value: 88 },
        { name: 'Bootstrap', value: 95 },
        { name: 'Material', value: 52 }
    ];
    // programmingScheme: Color = {
    //     name: 'programmingScheme',
    //     selectable: true,
    //     group: ScaleType.Ordinal,
    //     domain: ['#e34c26', '#0277bd', '#e4a126', '#007acc', '#dd0031', '#d56ea3', '#7811f7', '#d538e1']
    // };
    programmingScheme: string = 'vivid'

    // === Creative Chart === //
    // creative = [
    //     { name: 'Photoshop', value: 98 },
    //     { name: 'Illustrator', value: 93 },
    //     { name: 'Premiere Pro', value: 46 },
    //     { name: 'After Effect', value: 73 },
    //     { name: 'Figma', value: 55 },
    //     { name: 'Blender', value: 88 }
    // ];
    creative = [
        { 
            name: 'A',
            series: [
                { name: 'Photoshop', value: 98 },
                { name: 'Illustrator', value: 93 },
                { name: 'Premiere Pro', value: 46 },
                { name: 'Figma', value: 89 },
                { name: 'Blender', value: 58 }
            ] 
        }
    ];
    curve: any = curveLinearClosed;
    creativeScheme: Color = {
        name: 'programmingScheme',
        selectable: true,
        group: ScaleType.Ordinal,
        domain: ['#0099ffff']
    };
    formatXAxisTick(val: any): string {
        const maxLength = 100;
        if (typeof val === 'string' && val.length > maxLength) {
        return val.substring(0, maxLength) + '...';
        }
        return val;
    }
}