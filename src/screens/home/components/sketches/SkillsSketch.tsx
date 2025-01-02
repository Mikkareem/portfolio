import {P5CanvasInstance, SketchProps, ReactP5Wrapper} from "@p5-wrapper/react";
import { AndroidSkills, DatabaseSkills } from '../../../../data/Skills.ts'

let width = 500
let height = 500

let capsules = [];
let tree;

type SkillsSketchProps = SketchProps & {
    width: number,
    height: number,
    skills: string[]
}

class Capsule {
    constructor(p5, x, y, skill) {
        this.p5 = p5;
        this.position = this.p5.createVector(x, y);
        this.skill = skill;
        this.padding = 8.0;

        this.velocity = this.p5.createVector(0, 0);

        this.xFactor = 60; //random(3, 15);
        this.yFactor = 60; //random(3, 15);

        this.p5.textSize(16);
        const textW = this.p5.textWidth(this.skill);
        const textH = this.p5.textAscent();

        this.w = textW + 2 * this.padding;
        this.h = textH + 2 * this.padding;
    }

    update() {
        this.velocity = this.p5.createVector(this.p5.sin(this.p5.frameCount / this.xFactor) * this.p5.random(0.08, 0.3), this.p5.cos(this.p5.frameCount / this.yFactor) * this.p5.random(0.08, 0.3));
        this.position.add(this.velocity);
    }

    show() {
        this.p5.textSize(16);
        this.edges();
        this.update();

        const textW = this.p5.textWidth(this.skill);
        const textH = this.p5.textAscent();

        this.p5.noStroke();
        this.p5.fill(255, 0, 120);
        this.p5.rect(this.position.x, this.position.y, this.w, this.h, 20);
        this.p5.fill(255);
        this.p5.text(this.skill, this.position.x + this.padding, this.position.y + textH * 0.82 + this.padding);
    }

    collide(other) {
        const topEdge = this.position.y;
        const bottomEdge = this.position.y + this.h;
        const leftEdge = this.position.x;
        const rightEdge = this.position.x + this.w;


        const otherTopEdge = other.position.y;
        const otherBottomEdge = other.position.y + other.h;
        const otherLeftEdge = other.position.x;
        const otherRightEdge = other.position.x + other.w;

        if (rightEdge >= this.p5.width || otherRightEdge >= this.p5.width) {
            return false;
        }

        return rightEdge >= otherLeftEdge && leftEdge <= otherRightEdge && topEdge <= otherBottomEdge && bottomEdge >= otherTopEdge;
    }

    edges() {
        if (this.position.x < 0) {
            this.position.x = 0;
            this.velocity.x *= -1;
        } else if (this.position.x > this.p5.width - this.w) {
            this.position.x = this.p5.width - this.w;
            this.velocity.x *= -1;
        }
        if (this.position.y < 0) {
            this.position.y = 0;
            this.velocity.y *= -1;
        } else if (this.position.y > this.p5.height - this.h) {
            this.position.y = this.p5.height - this.h;
            this.velocity.y *= -1;
        }
    }
}

class Tree {
    constructor(p5, capsules) {
        this.p5 = p5;
        this.capsules = capsules;
    }

    show() {
        const startPoint = this.p5.createVector(this.p5.width / 2, this.p5.height - 20);

        for (let capsule of this.capsules) {
            const endPoint = this.p5.createVector(
                capsule.position.x + 20,
                capsule.position.y + 20,
            );

            this.p5.strokeWeight(3);
            this.p5.stroke('pink')
            this.p5.line(startPoint.x, startPoint.y, endPoint.x, endPoint.y);

            this.p5.fill('pink')
            this.p5.circle(startPoint.x, startPoint.y, 20)
        }
    }
}

function manualSetup(p5: P5CanvasInstance<SkillsSketchProps>, skills: string[]) {
    let index = 0;
    capsules = [];
    while (index < skills.length) {
        const capsule = new Capsule(
            p5,
            p5.random(p5.width),
            p5.random(p5.height - p5.height / 3),
            skills[index]
        );

        let overlapped = false;
        for (let other of capsules) {
            if (capsule.collide(other)) {
                overlapped = true
            }
        }

        if (!overlapped) {
            capsules.push(capsule);
            index++;
        }
    }

    tree = new Tree(p5, capsules);
}

function setup(p5: P5CanvasInstance<SkillsSketchProps>) {
    p5.createCanvas(width, height);
}

function draw(p5: P5CanvasInstance<SkillsSketchProps>, skills: string[], invalidated: boolean, onInvalidationCompleted: () => void) {
    if(invalidated) {
        onInvalidationCompleted();
        manualSetup(p5, skills);
    }
    p5.background(0);
    p5.fill(0);

    tree.show();

    for (let capsule of capsules) {
        capsule.show();
    }
}

function skillsSketch(p5: P5CanvasInstance<SkillsSketchProps>) {
    let skills, invalidated = true;
    p5.updateWithProps = (props) => {
        if(props.width != p5.width || props.height != p5.height) {
            width = props.width;
            height = props.height;
            p5.resizeCanvas(width, height);
        }
        skills = props.skills;
        invalidated = true;
    }

    p5.setup = () => setup(p5)

    p5.draw = () => {
        if(skills) {
            draw(p5, skills, invalidated, () => { invalidated = false; });
        }
    }
}

const SkillsSection = ({
    width, height
}: { width: number, height: number }) => {
    return (
        <>
            <ReactP5Wrapper sketch={skillsSketch} width={width} height={height} skills={AndroidSkills} />
            {/*<ReactP5Wrapper sketch={skillsSketch} width={width} height={height} skills={DatabaseSkills} />*/}
        </>
    )
}

export default SkillsSection;