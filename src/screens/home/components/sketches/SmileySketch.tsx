
import { Shader } from 'p5'
import { ReactP5Wrapper, Sketch, SketchProps} from '@p5-wrapper/react'
import {SMILEY_FRAGMENT_SHADER, SMILEY_VERTEX_SHADER} from "./shaders/Smiley.ts";

type SmileySketchProps = SketchProps & {
    width: number;
    height: number;
}

const sketch: Sketch<SmileySketchProps> = (p5) => {
    let w = p5.width
    let h = p5.height

    let startTime = Date.now()

    let fractalShader: Shader;

    p5.updateWithProps = (props) => {
        w = props.width
        h = props.height
        p5.resizeCanvas(w, h);
    }

    p5.setup = () => {
        p5.createCanvas(w, h, p5.WEBGL)
        p5.frameRate(30)
        fractalShader = p5.createShader(SMILEY_VERTEX_SHADER, SMILEY_FRAGMENT_SHADER)
    }

    p5.draw = () => {
        p5.background(0, 0);
        p5.shader(fractalShader);
        fractalShader.setUniform('iTime', (Date.now() - startTime) / 1000.0)
        p5.rectMode(p5.CENTER)
        // p5.plane(p5.width, p5.height);
        p5.stroke(0)
        p5.rect(0, 0, p5.width, p5.height);
    }
}

const SmileySketch = ({
    width, height
}: { width: number, height: number }) => <ReactP5Wrapper sketch={sketch} width={width} height={height} />

export default SmileySketch;