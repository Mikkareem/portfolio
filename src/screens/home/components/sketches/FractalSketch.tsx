
import { Shader } from 'p5'
import { ReactP5Wrapper, Sketch, SketchProps} from '@p5-wrapper/react'
import {FRACTALS_FRAGMENT_SHADER, FRACTALS_VERTEX_SHADER} from "./shaders/Fractals.ts";

type FractalSketchProps = SketchProps & {
    width: number;
    height: number;
}

const sketch: Sketch<FractalSketchProps> = (p5) => {
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
        fractalShader = p5.createShader(FRACTALS_VERTEX_SHADER, FRACTALS_FRAGMENT_SHADER)
    }

    p5.draw = () => {
        p5.background(0);
        p5.shader(fractalShader);
        fractalShader.setUniform('iTime', (Date.now() - startTime) / 1000.0)
        p5.rectMode(p5.CENTER)
        p5.plane(p5.width, p5.height);
    }
}

const FractalSketch = ({
    width, height
}: { width: number, height: number }) => <ReactP5Wrapper sketch={sketch} width={width} height={height} />

export default FractalSketch;