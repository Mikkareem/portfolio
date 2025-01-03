import {P5CanvasInstance, SketchProps, ReactP5Wrapper} from "@p5-wrapper/react";
import { AndroidSkills, DatabaseSkills, WebAndBackEndSkills, LanguageSkills } from '../../../../data/Skills.ts'

type SkillsSketchProps = SketchProps & {
    width: number,
    height: number,
    skills: string[]
}

class Capsule {
    constructor(p, x, y, skill) {
        this.p = p;
        this.position = this.p.createVector(x, y);
        this.skill = skill;

        this.velocity = this.p.createVector(0, 0);

        this.xFactor = 60; //random(3, 15);
        this.yFactor = 60; //random(3, 15);

        this.p.textSize(p.ts);
        this.p.textStyle(this.p.BOLD);
        this.padding = p.ts / 2.0;
        const textW = this.p.textWidth(this.skill);
        const textH = this.p.textAscent();

        this.w = textW + 2 * this.padding;
        this.h = textH + 2 * this.padding;
    }

    update() {
        this.velocity = this.p.createVector(this.p.sin(this.p.frameCount / this.xFactor) * this.p.random(0.08, 0.3), this.p.cos(this.p.frameCount / this.yFactor) * this.p.random(0.08, 0.3));
        this.position.add(this.velocity);
    }

    show() {
        this.p.textSize(this.p.ts);
        this.p.textStyle(this.p.BOLD);
        this.edges();
        this.update();

        const textW = this.p.textWidth(this.skill);
        const textH = this.p.textAscent();

        this.p.noStroke();
        this.p.fill(255, 212, 0);
        this.p.rect(this.position.x, this.position.y, this.w, this.h, 20);
        this.p.fill(0);
        this.p.text(this.skill, this.position.x + this.padding, this.position.y + textH * 0.82 + this.padding);
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

        if (rightEdge >= this.p.width || otherRightEdge >= this.p.width) {
            return false;
        }

        return rightEdge >= otherLeftEdge && leftEdge <= otherRightEdge && topEdge <= otherBottomEdge && bottomEdge >= otherTopEdge;
    }

    edges() {
        if (this.position.x < 0) {
            this.position.x = 0;
            this.velocity.x *= -1;
        } else if (this.position.x > this.p.width - this.w) {
            this.position.x = this.p.width - this.w;
            this.velocity.x *= -1;
        }
        if (this.position.y < 0) {
            this.position.y = 0;
            this.velocity.y *= -1;
        } else if (this.position.y > this.p.height - this.h) {
            this.position.y = this.p.height - this.h;
            this.velocity.y *= -1;
        }
    }
}

class Tree {
    constructor(p, capsules) {
        this.p = p;
        this.capsules = capsules;
    }

    show() {
        const startPoint = this.p.createVector(this.p.width / 2, this.p.height - 20);

        for (let capsule of this.capsules) {
            const endPoint = this.p.createVector(
                capsule.position.x + capsule.padding,
                capsule.position.y + capsule.padding,
            );

            let strokeWidth = Math.min(this.p.width/90.0, 1)
            this.p.strokeWeight(strokeWidth);
            this.p.stroke('pink')
            this.p.line(startPoint.x, startPoint.y, endPoint.x, endPoint.y);

            this.p.fill('pink')
            this.p.circle(startPoint.x, startPoint.y, 20)
        }
    }
}

function manualSetup(p: P5CanvasInstance<SkillsSketchProps>) {
    let index = 0;
    p.capsules = []

    p.resizeCanvas(p.width, p.h);

    let temp = p.shuffle((p.skills as string[]).map((_, i) => i))

    while (index < p.skills.length) {
        const totalHeightEach = p.eachHeightNeeded + p.verticalPadding

        const capsule = new Capsule(
            p,
            p.random(p.width),
            p.random(totalHeightEach*index, totalHeightEach*(index+1)),
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

function setup(p: P5CanvasInstance<SkillsSketchProps>) {
    p.createCanvas(p.w, p.h);
    p.ts = Math.min(p.width/77.5, 16);
}

function draw(p: P5CanvasInstance<SkillsSketchProps>) {
    if(p.invalidated) {
        p.invalidated = false;
        manualSetup(p);
    }
    p.background(0);
    p.fill(0);

    p.tree.show();

    for (let capsule of p.capsules) {
        capsule.show();
    }
}

function skillsSketch(p: P5CanvasInstance<SkillsSketchProps>) {
    p.skills = []
    p.invalidated = true;
    p.capsules = []
    p.tree;
    p.ts = 16;

    p.eachHeightNeeded = 20;
    p.verticalPadding = 2*5;
    p.startNeededForTree = 250;
    p.w = 500;
    p.h = (p.skills.length * (p.eachHeightNeeded + p.verticalPadding)) + p.startNeededForTree;

    p.updateWithProps = (props) => {
        if(props.width != p.width) {
            p.w = props.width;
            p.resizeCanvas(p.w, p.h);
            p.ts = Math.min(p.width/77.5, 16);
        }
        p.skills = props.skills;
        p.h = (p.skills.length * (p.eachHeightNeeded + p.verticalPadding)) + p.startNeededForTree;
        p.invalidated = true;
    }

    p.setup = () => setup(p)

    p.draw = () => {
        if(p.skills) {
            draw(p);
        }
    }
}

const SkillsSection = ({
    width, height
}: { width: number, height: number }) => {
    return (
        <>
            <ReactP5Wrapper sketch={skillsSketch} width={width} height={height} skills={AndroidSkills} />
            <ReactP5Wrapper sketch={skillsSketch} width={width} height={height} skills={DatabaseSkills} />
            <ReactP5Wrapper sketch={skillsSketch} width={width} height={height} skills={WebAndBackEndSkills} />
            <ReactP5Wrapper sketch={skillsSketch} width={width} height={height} skills={LanguageSkills} />
        </>
    )
}

export default SkillsSection;