
import { P5CanvasInstance, ReactP5Wrapper, SketchProps } from '@p5-wrapper/react'

type FirstSketchProps = SketchProps & {
    width: number,
    height: number,
}

function sketch(p5: P5CanvasInstance<FirstSketchProps>) {
    let width = p5.width
    let height = p5.height

    let skills = ['Android', 'Web Development', 'React', 'Redux']

    p5.updateWithProps = (props) => {
        if(width != props.width || height != props.height) {
            width = props.width
            height = props.height
            p5.resizeCanvas(width, height);
        }
    }

    p5.setup = () => {
        p5.createCanvas(width, height);
        p5.textAlign(p5.CENTER);
        p5.textSize(32);
    }

    p5.draw = () => {
        p5.background(0);

        p5.fill(255);
        skills.forEach((skill, i) => {
            p5.text(skill, p5.random(width), p5.random(height));
        })
    }
}

const FirstSketch = ({
    width, height
}: { width: number, height: number }) => <ReactP5Wrapper sketch={sketch} width={width} height={height} />

export default FirstSketch;