import * as P5 from 'p5';
import {SketchProps, ReactP5Wrapper, Sketch, P5CanvasInstance} from "@p5-wrapper/react";
import { AndroidSkills, DatabaseSkills, WebAndBackEndSkills, LanguageSkills } from '../../../../data/Skills.ts'

type SkillsSketchProps = SketchProps & {
    width: number,
    height: number,
    skills: string[]
}

type SkillSketch = {
    skills: string[];
    invalidated: boolean;
    capsules: Capsule[];
    tree?: Tree;
    ts: number;

    eachHeightNeeded: number;
    verticalPadding: number;
    startNeededForTree: number;
    w: number;
    h: number;
    _canvas: P5CanvasInstance<SkillsSketchProps>;
    sketch: Sketch<SkillsSketchProps>;
}

class Capsule {
    public position: P5.Vector;
    private velocity: P5.Vector;
    public padding: number;


    private xFactor = 30; //random(3, 15);
    private yFactor = 30; //random(3, 15);
    public w: number;
    public h: number;


    constructor(private sketch: SkillSketch, x: number, y: number, private skill: string) {
        this.position = this.sketch._canvas.createVector(x, y);

        this.velocity = this.sketch._canvas.createVector(0, 0);

        this.sketch._canvas.textSize(this.sketch.ts);
        this.sketch._canvas.textStyle(this.sketch._canvas.BOLD);
        this.padding = this.sketch.ts / 2.0;
        const textW = this.sketch._canvas.textWidth(this.skill);
        const textH = this.sketch._canvas.textAscent();

        this.w = textW + 2 * this.padding;
        this.h = textH + 2 * this.padding;
    }

    private update() {
        this.velocity = this.sketch._canvas.createVector(this.sketch._canvas.sin(this.sketch._canvas.frameCount / this.xFactor) * this.sketch._canvas.random(0.2, 0.53), this.sketch._canvas.cos(this.sketch._canvas.frameCount / this.yFactor) * this.sketch._canvas.random(0.2, 0.53));
        this.position.add(this.velocity);
    }

    public show() {
        this.sketch._canvas.textSize(this.sketch.ts);
        this.sketch._canvas.textStyle(this.sketch._canvas.BOLD);
        this.edges();
        this.update();

        const textH = this.sketch._canvas.textAscent();

        this.sketch._canvas.noStroke();
        this.sketch._canvas.fill(255, 212, 0);
        this.sketch._canvas.rect(this.position.x, this.position.y, this.w, this.h, 20);
        this.sketch._canvas.fill(0);
        this.sketch._canvas.text(this.skill, this.position.x + this.padding, this.position.y + textH * 0.82 + this.padding);
    }

    collide(other: Capsule) {
        const topEdge = this.position.y;
        const bottomEdge = this.position.y + this.h;
        const leftEdge = this.position.x;
        const rightEdge = this.position.x + this.w;


        const otherTopEdge = other.position.y;
        const otherBottomEdge = other.position.y + other.h;
        const otherLeftEdge = other.position.x;
        const otherRightEdge = other.position.x + other.w;

        if (rightEdge >= this.sketch._canvas.width || otherRightEdge >= this.sketch._canvas.width) {
            return false;
        }

        return rightEdge >= otherLeftEdge && leftEdge <= otherRightEdge && topEdge <= otherBottomEdge && bottomEdge >= otherTopEdge;
    }

    edges() {
        if (this.position.x < 0) {
            this.position.x = 0;
            this.velocity.x *= -1;
        } else if (this.position.x > this.sketch._canvas.width - this.w) {
            this.position.x = this.sketch._canvas.width - this.w;
            this.velocity.x *= -1;
        }
        if (this.position.y < 0) {
            this.position.y = 0;
            this.velocity.y *= -1;
        } else if (this.position.y > this.sketch._canvas.height - this.h) {
            this.position.y = this.sketch._canvas.height - this.h;
            this.velocity.y *= -1;
        }
    }
}

class Tree {
    sketch: SkillSketch;
    capsules: Capsule[];

    constructor(p: SkillSketch, capsules: Capsule[]) {
        this.sketch = p;
        this.capsules = capsules;
    }

    show() {
        const startPoint = this.sketch._canvas.createVector(this.sketch._canvas.width / 2, this.sketch._canvas.height - 20);

        for (let capsule of this.capsules) {
            const endPoint = this.sketch._canvas.createVector(
                capsule.position.x + capsule.padding,
                capsule.position.y + capsule.padding,
            );

            let strokeWidth = Math.min(this.sketch._canvas.width/90.0, 1)
            this.sketch._canvas.strokeWeight(strokeWidth);
            this.sketch._canvas.stroke('pink')
            this.sketch._canvas.line(startPoint.x, startPoint.y, endPoint.x, endPoint.y);

            this.sketch._canvas.fill('pink')
            this.sketch._canvas.circle(startPoint.x, startPoint.y, 20)
        }
    }
}

function manualSetup(p: SkillSketch) {
    let index = 0;
    p.capsules = []

    p._canvas.resizeCanvas(p._canvas.width, p.h);

    // let temp = p.canvas.shuffle((p.skills as string[]).map((_, i) => i))

    while (index < p.skills.length) {
        const totalHeightEach = p.eachHeightNeeded + p.verticalPadding

        const capsule = new Capsule(
            p,
            p._canvas.random(p._canvas.width),
            p._canvas.random(totalHeightEach*index, totalHeightEach*(index+1)),
            p.skills[index]
        );

        let overlapped = false;
        for (let other of p.capsules) {
            if (capsule.collide(other)) {
                overlapped = true
            }
        }

        if (!overlapped) {
            p.capsules.push(capsule);
            index++;
        }
    }

    p.tree = new Tree(p, p.capsules);
}

function setup(p: SkillSketch) {
    p._canvas.createCanvas(p.w, p.h);
    p._canvas.frameRate(30)
    p.ts = Math.min(p._canvas.width/77.5, 32);
}

function draw(p: SkillSketch) {
    if(p.invalidated) {
        p.invalidated = false;
        manualSetup(p);
    }
    p._canvas.background(0);
    p._canvas.fill(0);

    p.tree!.show();

    for (let capsule of p.capsules) {
        capsule.show();
    }
}


const skillsSketch : () => SkillSketch = () => ({
    skills: [],
    invalidated: true,
    capsules: [],
    ts: 16,

    eachHeightNeeded: 20,
    verticalPadding: 2*5,
    startNeededForTree: 100,
    w: 500,
    h: 500,
    _canvas: {} as P5CanvasInstance<SkillsSketchProps>,
    sketch(p){
        this._canvas = p;
        p.updateWithProps = (props) => {
            if (props.width != p.width) {
                this.w = props.width;
                p.resizeCanvas(this.w, this.h);
                this.ts = Math.min(p.width / 77.5, 32);
            }
            this.skills = props.skills;
            this.h = (this.skills.length * (this.eachHeightNeeded + this.verticalPadding)) + this.startNeededForTree;
            this.invalidated = true;
        }

        p.setup = () => setup(this)

        p.draw = () => draw(this)
    }
})

const SkillsSection = ({
    width, height
}: { width: number, height: number }) => {
    return (
        <>
            <ReactP5Wrapper sketch={(p) => skillsSketch().sketch(p)} width={width} height={height} skills={AndroidSkills} />
            <ReactP5Wrapper sketch={(p) => skillsSketch().sketch(p)} width={width} height={height} skills={DatabaseSkills} />
            <ReactP5Wrapper sketch={(p) => skillsSketch().sketch(p)} width={width} height={height} skills={WebAndBackEndSkills} />
            <ReactP5Wrapper sketch={(p) => skillsSketch().sketch(p)} width={width} height={height} skills={LanguageSkills} />
        </>
    )
}

export default SkillsSection;